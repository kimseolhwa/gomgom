package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import bitcamp.java77.dao.BoardDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Board;

@Controller("ajax.BoardController")
@RequestMapping("/board/ajax/*")
public class BoardController { 
  
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired BoardDao boardDao;
  @Autowired ServletContext servletContext;
  
 
  @RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Board board/*, MultipartFile file*/) throws Exception {
    /*
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      board.setAttachFile(newFileName);
    }
    */
    boardDao.insert(board);
    return new AjaxResult("success", null);
  }
  

  @RequestMapping("list")
  public Object list() throws Exception {
   
    List<Board> boards = boardDao.selectList();
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", boards);
    
    for(int i=0; i < boards.size(); i++){
    	System.out.println(boards.get(i).getTitle());
    }
    return resultMap;
  }

  
}
