package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import bitcamp.java77.dao.CategoryDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Category;
import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Wish;

@Controller("ajax.CategoryController")
@RequestMapping("/category/ajax/*")
public class CategoryController
{
	@Autowired
	CategoryDao CategoryDao;
	@Autowired
	ServletContext servletContext;
    
	@RequestMapping("addCategory")
	public AjaxResult addCategory(Category category, HttpSession session) throws Exception {
		
		System.out.println("category.getName() : " + category.getName());
		Join join = (Join)session.getAttribute("loginUser");
		System.out.println("join.getuNo() : "  + join.getuNo());
		category.setuNo(join.getuNo());
		// DAO 호출 
		CategoryDao.addCategory(category);
		return new AjaxResult("success", category);
	}
	
	@RequestMapping("categoryList")
	public Object categoryList(HttpServletRequest req) throws Exception
	{
		Join join = (Join) req.getSession().getAttribute("loginUser");
		System.out.println("loginUser : " + join.getuNo());

		HashMap<String, Object> paramMap = new HashMap<>();
		paramMap.put("uno", join.getuNo());
		List<Wish> categorys = CategoryDao.categoryList(paramMap);

		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", categorys);
		resultMap.put("loginUser", join);

		return resultMap;
	}
	
	@RequestMapping("deleteCategory")
	public AjaxResult deleteCategory(int cno) throws Exception {
		if (CategoryDao.deleteCategory(cno) <= 0) {
			return new AjaxResult("failure", null);
		} 
		return new AjaxResult("success", null);
	}
	
	@RequestMapping("updateCategory")
	public AjaxResult updateCategory(Category category) throws Exception
	{
		CategoryDao.updateCategory(category);
		return new AjaxResult("success", category);
	}
	
}
