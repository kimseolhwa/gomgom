package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import bitcamp.java77.dao.WishDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Wish;

@Controller("ajax.WishController")
@RequestMapping("/wish/ajax/*")
public class WishController { 
  
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired WishDao wishDao;
  @Autowired ServletContext servletContext;
  
 
  @RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Wish wish/*, MultipartFile file*/) throws Exception {
    /*
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      wish.setAttachFile(newFileName);
    }
    */
    wishDao.insert(wish);
    return new AjaxResult("success", null);
  }
  

  @RequestMapping("list")
  public Object list() throws Exception {
   
    List<Wish> wishs = wishDao.selectList();
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", wishs);

    return resultMap;
  }

  @RequestMapping("delete.do")
  public AjaxResult delete(int no) throws Exception {
    if (wishDao.delete(no) <= 0) {
      return new AjaxResult("failure", null);
    } 

    return new AjaxResult("success", null);
  }
  
  @RequestMapping(value="update", method=RequestMethod.POST)
  public AjaxResult update(Wish wish/*, MultipartFile file*/) throws Exception {
    /*
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      wish.setAttachFile(newFileName);
    } else if (wish.getAttachFile().length() == 0) {
      wish.setAttachFile(null);
    }
    */
    
    if (wishDao.update(wish) <= 0) {
      return new AjaxResult("failure", null);
    } 
    
    return new AjaxResult("success", null);
  }
}
