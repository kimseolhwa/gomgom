package bitcamp.java77.controller.ajax;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import bitcamp.java77.dao.CategoryDao;
import bitcamp.java77.domain.Category;
import bitcamp.java77.domain.Join;

@Controller("ajax.CategoryController")
@RequestMapping("/category/ajax/*")
public class CategoryController
{
	@Autowired
	CategoryDao CategoryDao;
	@Autowired
	ServletContext servletContext;
    
	@RequestMapping("addCategory")
	public void addCategory(Category category, HttpSession session) throws Exception {
		
		System.out.println("category.getName() : " + category.getName());
		Join join = (Join)session.getAttribute("loginUser");
		System.out.println("join.getuNo() : "  + join.getuNo());
		category.setuNo(join.getuNo());
		// DAO 호출 
		CategoryDao.addCategory(category);
		
	}
	
}
