package bitcamp.java77.dao;

import java.util.List;
import java.util.Map;

import bitcamp.java77.domain.Wish;

public interface MainDao
{
	public int selectNo();

	public List<Wish> selectList();
	
	public Wish selectOne(int no);
}