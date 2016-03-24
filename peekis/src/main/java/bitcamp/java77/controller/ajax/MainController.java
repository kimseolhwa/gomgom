package bitcamp.java77.controller.ajax;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import bitcamp.java77.dao.MainDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Comment;
import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Wish;

@Controller("ajax.MainController")
@RequestMapping("/main/ajax/*")
public class MainController
{
	@Autowired
	MainDao MainDao;
	@Autowired
	ServletContext servletContext;

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
	
	@RequestMapping("selectUserList")
	public Object selectUserList(@RequestParam(defaultValue="1") int modalPageNo, HttpServletRequest req) throws Exception {
		Join join = (Join) req.getSession().getAttribute("loginUser");
		
		int pageSize = 10;
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("startIndex", (modalPageNo - 1) * pageSize);
		paramMap.put("length", pageSize);
		System.out.println("modalPageNo : " + modalPageNo);
		List<Wish> wishs = MainDao.selectUserList(paramMap);
		List<Integer> likeList = MainDao.selectlikeList(join.getuNo());
		
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", wishs);
		resultMap.put("loginUser", join);
		resultMap.put("like", likeList);
		return resultMap;
	}
	
	@RequestMapping("detail")
	public Object detail(int no, int uno) throws Exception
	{
		Wish wish = MainDao.selectOne(no);
		
		// 코멘트 리스트 		
		List<Comment> comment = MainDao.selectComentList(no);
		
//		Iterator<Comment> it = comment.iterator();
//		while(it.hasNext()){
//			System.out.println(it.next().getCont());
//		}
		
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("uno", uno);
		paramMap.put("wishUserNo", wish.getUno());
		int followerCheck = MainDao.followerCheck(paramMap);
		
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", wish);
		resultMap.put("followerCheck", followerCheck);
		resultMap.put("commentList", comment);
		
		
		return resultMap;
	}
	
	// 좋아요
	@RequestMapping("addLike")
	public AjaxResult addLike(int wno, int uno) throws Exception {
		System.out.println("[좋아요 추가] 위시번호 : " + wno + ", 유저번호 : " + uno);
		HashMap<String,Integer> paramMap = new HashMap<>();
	    paramMap.put("wno", wno);
	    paramMap.put("uno", uno);
	    MainDao.addLike(paramMap);
		return new AjaxResult("success", null);
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
		return new AjaxResult("success", null);
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
		
		HashMap<String,Object> paramCom = new HashMap<>();
		
		paramCom.put("join", join);
		paramCom.put("comment", comment);
		
			
		return new AjaxResult("success", paramCom);
	}
	
	  @RequestMapping("searchList")
	  public Object searchList(@RequestParam(defaultValue="1") int pageNo, String tag, HttpServletRequest req) throws Exception {
		  tag = "#"+ tag;
		  String tags[] = tag.replaceAll(" ", "@#").split("@");
		  for(String str : tags){
			  System.out.println(str);
		  }
		  Join join = (Join) req.getSession().getAttribute("loginUser");
		  
		  int pageSize = 10;
		  HashMap<String,Object> paramMap = new HashMap<>();
		  paramMap.put("startIndex", (pageNo - 1) * pageSize);
		  paramMap.put("length", pageSize);
		  paramMap.put("tag", "%" + tags[0] + "%");
		  System.out.println("pageNo : " + pageNo);
		  List<Wish> wishs = MainDao.selectSearchList(paramMap);
		  List<Wish> list = new ArrayList<>();
		  
		  for(int i = 1; i < tags.length; i++){
			  if(i%2 == 1){
				  for(Wish wish : wishs){
					  if(wish.getTag().contains(tags[i])){
						  list.add(wish);
					  }
				  }
				  wishs.clear();
			  }
			  else if(i%2 == 0){
				  for(Wish wish : list){
					  if(wish.getTag().contains(tags[i])){
						  wishs.add(wish);
					  }
				  }
				  list.clear();
			  }
			  
		  }
		  
		  List<Integer> likeList = MainDao.selectlikeList(join.getuNo());
		  List<Integer> sendList = MainDao.selectsendList(join.getuNo());
		  HashMap<String,Object> resultMap = new HashMap<>();
		  resultMap.put("status", "success");
		  resultMap.put("data", wishs);
		  if(tags.length % 2 == 0)	  resultMap.put("data", list);
		  resultMap.put("loginUser", join);
		  resultMap.put("like", likeList);
		  resultMap.put("send", sendList);
		  
		  return resultMap;
	  }
}
