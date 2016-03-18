package bitcamp.java77.dao;

import java.util.List;

import bitcamp.java77.domain.Join;

public interface JoinDao {
  int insert(Join join);
  
  List<Join> selectList();

  int memberJoin(Join join);

  int loginCheck(Join join);

  int selectNo();

  int registTag(Join join);

  int EmailPwCheck(Join join);

  int addCategory(Join join);
  
  Join selectUser(Join join);

  int CurPwdCheck(Join join);

  int updateUserInfo(Join join);
}







