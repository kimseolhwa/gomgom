package bitcamp.java77.dao;

import java.util.HashMap;
import java.util.List;

import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Wish;

public interface WishDao {
  
  // Create
  int insert(Wish wish);
  
  int selectNo();
  
  int selectcNo(int uno);
  
  // Read
  List<Wish> selectList(HashMap<String,Object> paramMap);
  
  List<Wish> selectLikeList(HashMap<String, Object> paramMap);
  
  int selectWishCnt(int uno);
  
  int selectLikeCnt(int uno);
  
  int selectFollowerCnt(int uno);
  
  int selectFollowCnt(int uno);
  
  Join selectUserInfo(int fNo);
  
  List<Join> selectFollowList(int uno);
  
  List<Join> selectFollowerList(int uno);
  
  // Delete
  int delete(int no);
  
  int deleteLike(int no);
  
  int deleteSend(int no);

  int followDelete(HashMap<String, Integer> paramMap);

  
  // Update
  int update(Wish wish);
  
  Wish selectOne(int no);

  int updateBuy(Wish wish);









}







