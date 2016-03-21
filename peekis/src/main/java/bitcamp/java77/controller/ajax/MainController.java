package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bitcamp.java77.dao.MainDao;
import bitcamp.java77.domain.AjaxResult;
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

		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", wishs);
		resultMap.put("loginUser", join);
		resultMap.put("like", likeList);
		return resultMap;
	}
	
	@RequestMapping("selectUserList")
	public Object selectUserList(@RequestParam(defaultValue="1") int pageNo, HttpServletRequest req) throws Exception {
		Join join = (Join) req.getSession().getAttribute("loginUser");
		
		int pageSize = 10;
		HashMap<String,Object> paramMap = new HashMap<>();
		paramMap.put("startIndex", (pageNo - 1) * pageSize);
		paramMap.put("length", pageSize);
		System.out.println("pageNo : " + pageNo);
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
	public AjaxResult detail(int no) throws Exception
	{
		Wish wish = MainDao.selectOne(no);
		return new AjaxResult("success", wish);
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
	
	@RequestMapping("follower")
	public AjaxResult follower(int wishUserNo, int uno) throws Exception {
		System.out.println("[팔로워] toUser : " + uno + ", fromUser : " + wishUserNo);
		HashMap<String,Integer> paramMap = new HashMap<>();
		paramMap.put("toUser", uno);
		paramMap.put("fromUser", wishUserNo);
		MainDao.follower(paramMap);
		return new AjaxResult("success", null);
	}
}
