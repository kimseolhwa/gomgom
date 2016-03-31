package bitcamp.java77.controller.ajax;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import bitcamp.java77.dao.MainDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Comment;
import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Like;
import bitcamp.java77.domain.Wish;

@Controller("ajax.MainController")
@RequestMapping("/main/ajax/*")
public class MainController
{
	@Autowired
	MainDao MainDao;
	@Autowired
	ServletContext servletContext;

	@RequestMapping("loginCheck")
	public AjaxResult loginCheck(HttpServletRequest req) throws Exception {
		Join join = (Join) req.getSession().getAttribute("loginUser");
		return new AjaxResult("success", join);
	}
	
	@RequestMapping("list")
	public Object list(@RequestParam(defaultValue="1") int pageNo, HttpServletRequest req) throws Exception {
		Join join = (Join) req.getSession().getAttribute("loginUser");
		
		int pageSize = 10;
		HashMap<String,Object> paramMap = new HashMap<>();
	    paramMap.put("startIndex", (pageNo - 1) * pageSize);
	    paramMap.put("length", pageSize);
	    System.out.println("pageNo : " + pageNo);
	    List<Wish> wishs = MainDao.selectList(paramMap);
	    List<Integer> likeList = MainDao.selectlikeList(join.getuNo());
	    List<Integer> sendList = MainDao.selectsendList(join.getuNo());
	    
	    HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", wishs);
		resultMap.put("loginUser", join);
		resultMap.put("like", likeList);
		resultMap.put("send", sendList);
		return resultMap;
	}
	
	@RequestMapping("friendList")
	public Object friendList(@RequestParam(defaultValue="1") int pageNo, int fNo, HttpServletRequest req) throws Exception {
		Join join = (Join) req.getSession().getAttribute("loginUser");
		System.out.println("friendList");
		int pageSize = 10;
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("startIndex", (pageNo - 1) * pageSize);
		paramMap.put("length", pageSize);
		paramMap.put("fNo", fNo);
		System.out.println("pageNo : " + pageNo);
		List<Wish> wishs = MainDao.selectFriendList(paramMap);
		List<Integer> likeList = MainDao.selectlikeList(join.getuNo());
		List<Integer> sendList = MainDao.selectsendList(join.getuNo());
		
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", wishs);
		resultMap.put("loginUser", join);
		resultMap.put("like", likeList);
		resultMap.put("send", sendList);
		return resultMap;
	}
	
	/*
	@RequestMapping("selectUserList")
	public Object selectUserList(@RequestParam(defaultValue="1") int modalPageNo, HttpServletRequest req, int uno) throws Exception {
		Join join = (Join) req.getSession().getAttribute("loginUser");
		
		int pageSize = 10;
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("startIndex", (modalPageNo - 1) * pageSize);
		paramMap.put("length", pageSize);
		paramMap.put("uno", uno);
		System.out.println("modalPageNo : " + modalPageNo);
		List<Wish> modalWishs = MainDao.selectUserList(paramMap);
		List<Integer> likeList = MainDao.selectlikeList(join.getuNo());
		
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", modalWishs);
		resultMap.put("loginUser", join);
		resultMap.put("like", likeList);
		return resultMap;
	}
	*/
	
	@RequestMapping("detail")
	public Object detail(int no, int uno) throws Exception
	{	
		
		Wish wish = MainDao.selectOne(no);
		// 코멘트 리스트 		
		List<Comment> comment = MainDao.selectComentList(no);
		//세션 유저 정보 조회 
		Join join = MainDao.selectSessionUserInfo(uno);
		// 좋아요 정보 
		Like like = MainDao.selectLikeOne(no);
		// 좋아요 누른 유저 리스트 
		List<Like> likeList = MainDao.selectLikeList(no);
		// 담아가기 한 유저 리스트 
		List<Like> sendList = MainDao.selectSendList(no);
		
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("uno", uno);
		paramMap.put("wishUserNo", wish.getUno());
		int followerCheck = MainDao.followerCheck(paramMap);
		
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", wish);
		resultMap.put("followerCheck", followerCheck);
		resultMap.put("commentList", comment);
		resultMap.put("sessionUser", join);
		resultMap.put("like", like);
		resultMap.put("likeList", likeList);
		resultMap.put("sendList", sendList);
		
		return resultMap;
	}
	
	// 좋아요
	@RequestMapping("addLike")
	public AjaxResult addLike(int wno, int uno) throws Exception {
		System.out.println("[좋아요 추가] 위시번호 : " + wno + ", 유저번호 : " + uno);
		HashMap<String,Integer> paramMap = new HashMap<>();
	    paramMap.put("wno", wno);
	    paramMap.put("uno", uno);
	    int numOflNo =  MainDao.addLike(paramMap);
		return new AjaxResult("success", numOflNo);
	}
	
	// 좋아요 취소
	@RequestMapping("deleteLike")
	public AjaxResult deleteLike(int wno, int uno) throws Exception {
		System.out.println("[좋아요 삭제] 위시번호 : " + wno + ", 유저번호 : " + uno);
		HashMap<String,Integer> paramMap = new HashMap<>();
		paramMap.put("wno", wno);
		paramMap.put("uno", uno);
		MainDao.deleteLike(paramMap);
		return new AjaxResult("success", null);
	}
	
	// 담아가기
	@RequestMapping("send")
	public AjaxResult send(int wno, int uno) throws Exception {
		System.out.println("[담아가기] 위시번호 : " + wno + ", 유저번호 : " + uno);
		HashMap<String,Integer> paramMap = new HashMap<>();
		paramMap.put("wno", wno);
		paramMap.put("uno", uno);
		MainDao.send(paramMap);
		MainDao.copyItem(paramMap);
		//세션 유저 정보 조회 
		Join join = MainDao.selectSessionUserInfo(uno);
		return new AjaxResult("success", join);
	}
	
	//팔로우
	@RequestMapping("follower")
	public AjaxResult follower(int wishUserNo, int uno) throws Exception {
		System.out.println("[팔로워] toUser : " + uno + ", fromUser : " + wishUserNo);
		HashMap<String,Integer> paramMap = new HashMap<>();
		paramMap.put("toUser", uno);
		paramMap.put("fromUser", wishUserNo);
		MainDao.follower(paramMap);
		return new AjaxResult("success", null);
	}
	
	//언팔로우
	@RequestMapping("unfollower")
	public AjaxResult unfollower(int wishUserNo, int uno) throws Exception {
		System.out.println("[언팔로워] toUser : " + uno + ", fromUser : " + wishUserNo);
		HashMap<String,Integer> paramMap = new HashMap<>();
		paramMap.put("toUser", uno);
		paramMap.put("fromUser", wishUserNo);
		MainDao.unfollower(paramMap);
		return new AjaxResult("success", null);
	}
	
	// 코멘트 등록
	@RequestMapping(value = "addComment", method = RequestMethod.POST)
	public AjaxResult addComment(Comment comment,HttpServletRequest req) throws Exception {
		
//			CREATE TABLE `COMMENT` (
//				`CONO` INTEGER      NOT NULL, -- 댓글번호 오토
//				`WNO`  INTEGER      NOT NULL, -- 위시번호
//				`UNO`  INTEGER      NOT NULL, -- 유저번호
//				`CONT` VARCHAR(255) NOT NULL, -- 댓글내용
//				`DATE` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP on update current_timestamp  -- 댓글작성시간
//			);

		Join join = (Join) req.getSession().getAttribute("loginUser");
		comment.setuNo(join.getuNo());
		MainDao.insertComment(comment);
		System.out.println("comment.getCoNo() : "  + comment.getCoNo());
		
		
		HashMap<String,Object> paramCom = new HashMap<>();
		
		paramCom.put("join", join);
		paramCom.put("comment", comment);
		
			
		return new AjaxResult("success", paramCom);
	}
	
	// 코멘트 삭제
	@RequestMapping(value = "delComment", method = RequestMethod.POST)
	public AjaxResult delComment(Comment comment) throws Exception {
		
		System.out.println(comment.getCoNo());
		
		MainDao.delComment(comment);
		
		return new AjaxResult("success", null);
	}
	
	// 태그검색
	@RequestMapping("searchList")
	public Object searchList(@RequestParam(defaultValue="1") int pageNo, String tag, HttpServletRequest req) throws Exception {
		tag = "#"+ tag;
		String tags[] = tag.replaceAll(" ", "@#").split("@");
		/*for(String str : tags){
			System.out.println(str);
		}*/
		Join join = (Join) req.getSession().getAttribute("loginUser");
		HashMap<String,Object> paramMap = new HashMap<>();
	    paramMap.put("tag", "%" + tags[0] + "%");
		List<Wish> wishs = MainDao.selectSearchList(paramMap);
		List<Wish> list = new ArrayList<>();
		
		
		// 두번째 ,세번째...태그 필터
		for(int i = 1; i < tags.length; i++){
			if(i%2 == 1){
				for(Wish wish : wishs){
					if(wish.getTag().contains(tags[i]))		list.add(wish);
				}
				wishs.clear();
			}
			else if(i%2 == 0){
				for(Wish wish : list){
					if(wish.getTag().contains(tags[i]))		wishs.add(wish);
				}
				list.clear();
			}
		}
		  
		  List<Integer> likeList = MainDao.selectlikeList(join.getuNo());
		  List<Integer> sendList = MainDao.selectsendList(join.getuNo());
		  HashMap<String,Object> resultMap = new HashMap<>();
		  resultMap.put("status", "success");
		  resultMap.put("data", searchPage(pageNo, tags.length % 2 == 0 ? list : wishs));
		  resultMap.put("loginUser", join);
		  resultMap.put("like", likeList);
		  resultMap.put("send", sendList);
		  
		  return resultMap;
	  }
	  
	// 태그검색 페이징
	private List<Wish> searchPage(int pageNo, List<Wish> list){
		int startIndex = (pageNo - 1) * 10;
		int endIndex = startIndex + 10;
		endIndex = (list.size() <= endIndex  ? list.size() : endIndex);
		System.out.println("[list size] : " + list.size());
		System.out.println("[pageNo = " + pageNo + "][startIndex = " + startIndex + "][endIndex = " + endIndex + "]");
		List<Wish> wishs = new ArrayList<>();
		for(int i=startIndex; i < endIndex; i++){
			wishs.add(list.get(i));
		}
		return wishs;
	}
}
