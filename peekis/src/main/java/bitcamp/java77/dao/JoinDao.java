package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Join;

public interface JoinDao {
  int insert(Join Join);
  
  List<Join> selectList();

  int memberJoin(Join Join);
  
}







