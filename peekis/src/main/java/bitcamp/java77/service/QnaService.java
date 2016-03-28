package bitcamp.java77.service;

import java.util.List;

import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Qna;

public interface QnaService {
	void qnaRegist(Qna qna); //regist니까 void

	List<Qna> listQna(Join user);

	Qna qnaDetail(Qna qna);

	void delete(int bno);

	void ComRegist(Qna qna);

	Qna ComDetail(Qna qna);

}
