package bitcamp.java77.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import bitcamp.java77.dao.QnaDao;
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
	public List<Qna> listQna(int uno) {
		// TODO Auto-generated method stub
		return dao.listQna(uno);
	}
	
	@Override
	public Qna qnaDetail(Qna qna) {
		// TODO Auto-generated method stub
		return dao.detailQna(qna);
	}


}
