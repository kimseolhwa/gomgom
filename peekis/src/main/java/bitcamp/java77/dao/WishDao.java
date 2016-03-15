package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Wish;

public interface WishDao {
  int insert(Wish wish);
  
  int selectNo();
  
  List<Wish> selectList();
  
  int delete(int no);
  
  Wish selectOne(int no);
  
  int update(Wish wish);

  int updateBuy(Wish wish);
}







