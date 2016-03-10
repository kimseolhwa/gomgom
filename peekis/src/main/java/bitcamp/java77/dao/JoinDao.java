package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Board;

public interface JoinDao {
  int insert(Board board);
  
  List<Board> selectList();

  int memberJoin(Board board);
  
}







