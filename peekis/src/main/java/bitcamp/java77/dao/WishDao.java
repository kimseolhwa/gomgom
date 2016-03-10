package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Wish;

public interface WishDao {
  int insert(Wish wish);
  
  List<Wish> selectList();
  
  int delete(int no);
  
  int update(Wish wish);

}







