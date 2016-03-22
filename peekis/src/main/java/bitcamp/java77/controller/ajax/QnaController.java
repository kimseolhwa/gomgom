package bitcamp.java77.controller.ajax;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import bitcamp.java77.dao.QnaDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Qna;
import bitcamp.java77.service.QnaService;

@Controller
@RequestMapping("/auth/qna/ajax/*")
public class QnaController {
	
	@Autowired
	QnaService service;
	@Autowired
	QnaDao qnaDao;
	
	public static final String SAVED_DIR = "/attachfile"; 
	
	//QNA 등록 
	@RequestMapping(value="/qnaRegist", method=RequestMethod.POST)
	public AjaxResult qnaRegist(Qna qna, HttpServletRequest req){
		Join join = (Join) req.getSession().getAttribute("loginUser");
		
		System.out.println("loginUser : " + join.getuNo());
		
		qna.setuNo(join.getuNo());
		
		System.out.println("넘어오는지 테스트중");
		
		service.qnaRegist(qna);
		
		//html페이지에서 값 넘어오는지 확인 
		System.out.println("유형 -" + qna.getType());
		System.out.println("제목 -" + qna.getTitle());
		System.out.println("내용 -" + qna.getContent());
		System.out.println("작성자 -" + qna.getName());
		
		return new AjaxResult("success",qna);
	}
	
	//QNA 목록
	@RequestMapping(value="/qnaList", method=RequestMethod.GET)
	public Object qnaList(HttpServletRequest req){
		Join loginUser = (Join)req.getSession().getAttribute("loginUser"); //로그인한 유저번호 가져오기
		
		List<Qna> qnaList = service.listQna(loginUser.getuNo());
		
		return new AjaxResult("success", qnaList);
	}

	//QNA 상세
	@RequestMapping(value="/qnaDetail", method=RequestMethod.GET)
	public Object qnaDetail(Qna qna){
		System.out.println(qna.getBno());
		Qna board = service.qnaDetail(qna);
		return new AjaxResult("success", board);
	}
	
}
