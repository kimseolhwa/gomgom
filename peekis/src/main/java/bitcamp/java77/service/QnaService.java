package bitcamp.java77.service;

import java.util.List;

import bitcamp.java77.domain.Qna;

public interface QnaService {
	void qnaRegist(Qna qna); //regist니까 void

	List<Qna> listQna(int uNo);

	Qna qnaDetail(Qna qna);

}
