package bitcamp.java77.dao;

import java.util.HashMap;
import java.util.List;

import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Qna;

public interface QnaDao {
	int insertQna(Qna qna);

	List<Qna> listQna(HashMap<String, Object> option);
	
	int selectQnaCount(Join user);

	Qna detailQna(Qna qna);

	void deleteQna(int bno);

	void ComRegist(Qna qna);

	Qna ComDetail(Qna qna);
}
