package bitcamp.java77.dao;

import java.util.HashMap;
import java.util.List;

import bitcamp.java77.domain.Category;
import bitcamp.java77.domain.Wish;

public interface CategoryDao
{
	public int addCategory(Category category);
	
	public List<Wish> categoryList(HashMap<String,Object> paramMap);
	
	public List<Wish> categoryWishList(HashMap<String,Object> paramMap);
	
	public int deleteCategory(int cno);

	public Category updateCategory(int cno);

}