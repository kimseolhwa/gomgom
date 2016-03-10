package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import bitcamp.java77.dao.JoinDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Join;

@Controller("ajax.JoinController")
@RequestMapping("/join/ajax/*")
public class JoinController { 
  
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired JoinDao JoinDao;
  @Autowired ServletContext servletContext;
  
 
//  회원가입
  @RequestMapping(value="join")
  public AjaxResult join(Join Join) throws Exception {
	  
	  System.out.println("컨트롤러 호출" +  Join.getName());
	  JoinDao.memberJoin(Join);
	  
	return new AjaxResult("success", null);
  }
  
  
  @RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Join Join/*, MultipartFile file*/) throws Exception {
    /*
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      Join.setAttachFile(newFileName);
    }
    */
    JoinDao.insert(Join);
    return new AjaxResult("success", null);
  }
  

  @RequestMapping("list")
  public Object list() throws Exception {
   
    List<Join> Joins = JoinDao.selectList();
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", Joins);
    
    for(int i=0; i < Joins.size(); i++){
    	System.out.println(Joins.get(i).getTitle());
    }
    return resultMap;
  }

  
}
