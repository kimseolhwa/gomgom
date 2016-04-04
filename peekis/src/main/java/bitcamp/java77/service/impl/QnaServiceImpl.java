package bitcamp.java77.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.QnaDao;
import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Qna;
import bitcamp.java77.service.QnaService;

@Service
public class QnaServiceImpl implements QnaService{
	
	@Autowired //객체생성을 새로 안해도됨 new뭐시기
	QnaDao dao; 

	@Override
	public void qnaRegist(Qna qna) {
		// TODO Auto-generated method stub
		dao.insertQna(qna);
	}

	@Override
	public HashMap<String, Object> listQna(Join user, int page) {
		// TODO Auto-generated method stub
		
		int maxCnt = dao.selectQnaCount(user);
		
		HashMap<String, Object> option = new HashMap<String, Object>();
		option.put("user", user);
		option.put("start", (page-1)*10);
		List<Qna> qnaList = dao.listQna(option);
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("currentPage", page);
		result.put("maxCnt", maxCnt);
		result.put("qnaList", qnaList);
		return result;
	}
	
	@Override
	public Qna qnaDetail(Qna qna) {
		// TODO Auto-generated method stub
		return dao.detailQna(qna);
	}

	@Override
	public void delete(int bno) {
		// TODO Auto-generated method stub
		dao.deleteQna(bno);
	}

	@Override
	public void ComRegist(Qna qna) {  //답변(댓글)등록
		// TODO Auto-generated method stub
		dao.ComRegist(qna);
	}

	@Override
	public Qna ComDetail(Qna qna) {
		// TODO Auto-generated method stub
		return dao.ComDetail(qna);
	}


}
