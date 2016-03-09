package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Board;

public interface BoardDao {
  int insert(Board board);
  
  List<Board> selectList();
  

}







