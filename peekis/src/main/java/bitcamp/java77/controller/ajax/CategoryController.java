package bitcamp.java77.controller.ajax;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import bitcamp.java77.dao.MainDao;
import bitcamp.java77.domain.Category;

@Controller("ajax.CategoryController")
@RequestMapping("/category/ajax/*")
public class CategoryController
{
	@Autowired
	MainDao MainDao;
	@Autowired
	ServletContext servletContext;
    
	@RequestMapping("addCategory")
	public void addCategory(Category category, HttpSession session) throws Exception {
		
		System.out.println("category.getName() : " + category.getName());
		
		
	}
	
}
