package bitcamp.java77.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import bitcamp.java77.domain.Comment;
import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Like;
import bitcamp.java77.domain.Wish;

public interface MainDao
{
	public int selectNo();

	public List<Wish> selectList(HashMap<String,Object> paramMap);
	
	public List<Wish> selectFriendList(HashMap<String,Object> paramMap);
	
	public List<Wish> selectUserList(HashMap<String,Object> paramMap);
	
	public List<Integer> selectlikeList(int uno);
	
	public List<Integer> selectsendList(int uno);
	
	public Wish selectOne(int no);

	public int followerCheck(HashMap<String,Object> paramMap);
	
	public int addLike(HashMap<String,Integer> paramMap);
	
	public int deleteLike(HashMap<String,Integer> paramMap);
	
	public int send(HashMap<String,Integer> paramMap);
	
	public int copyItem(HashMap<String,Integer> paramMap);
	
	public int follower(HashMap<String,Integer> paramMap);

	public int unfollower(HashMap<String, Integer> paramMap);

	public int insertComment(Comment comment);
	
	public void delComment(Comment comment);

	public List<Comment> selectComentList(int no);

	public List<Wish> selectSearchList(HashMap<String, Object> paramMap);

	public Join selectSessionUserInfo(int uno);

	public Like selectLikeOne(int no);
}