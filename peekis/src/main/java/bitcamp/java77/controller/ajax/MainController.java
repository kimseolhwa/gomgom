package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import bitcamp.java77.dao.MainDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Wish;

@Controller("ajax.MainController")
@RequestMapping("/main/ajax/*")
public class MainController
{
	@Autowired
	MainDao MainDao;
	@Autowired
	ServletContext servletContext;

	@RequestMapping("list")
	public Object list(@RequestParam(defaultValue="1") int pageNo) throws Exception {
		 
		int pageSize = 5;
		HashMap<String,Object> paramMap = new HashMap<>();
	    paramMap.put("startIndex", (pageNo - 1) * pageSize);
	    paramMap.put("length", pageSize);
	    System.out.println("pageNo : " + pageNo);
	    List<Wish> wishs = MainDao.selectList(paramMap);
	    
		HashMap<String, Object> resultMap = new HashMap<>();
		resultMap.put("status", "success");
		resultMap.put("data", wishs);

		return resultMap;
	}
	
	@RequestMapping("detail")
	public Object detail(int no) throws Exception
	{
		Wish wish = MainDao.selectOne(no);
		return new AjaxResult("success", wish);
	}
}
