package bitcamp.java77.dao;

import java.util.HashMap;
import java.util.List;

import bitcamp.java77.domain.Wish;

public interface WishDao {
  int insert(Wish wish);
  
  int selectNo();
  
  int selectcNo(int uno);
  
  List<Wish> selectList(HashMap<String,Object> paramMap);
  
  int delete(int no);
  
  Wish selectOne(int no);
  
  int update(Wish wish);

  int updateBuy(Wish wish);
}







