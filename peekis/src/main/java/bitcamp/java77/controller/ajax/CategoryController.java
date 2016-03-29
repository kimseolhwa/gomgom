package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
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
	
	@RequestMapping("categoryWishList")
	public Object list(@RequestParam(defaultValue = "1") int pageNo, HttpServletRequest req) throws Exception
	{
		Join join = (Join) req.getSession().getAttribute("loginUser");
		System.out.println("loginUser : " + join.getuNo());

		int pageSize = 10;
		HashMap<String, Object> paramMap = new HashMap<>();
		paramMap.put("startIndex", (pageNo - 1) * pageSize);
		paramMap.put("length", pageSize);
		paramMap.put("uno", join.getuNo());
		System.out.println("pageNo : " + pageNo);
		List<Wish> wishs = CategoryDao.categoryWishList(paramMap);

		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", wishs);
		resultMap.put("loginUser", join);

		return resultMap;
	}
}
