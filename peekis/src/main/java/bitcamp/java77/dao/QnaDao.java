package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Qna;

public interface QnaDao {
	int insertQna(Qna qna);

	List<Qna> listQna(int uno);

	Qna detailQna(Qna qna);

}
