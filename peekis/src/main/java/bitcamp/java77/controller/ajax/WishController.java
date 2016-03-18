package bitcamp.java77.controller.ajax;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java77.dao.WishDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Join;
import bitcamp.java77.domain.Wish;

@Controller("ajax.WishController")
@RequestMapping("/wish/ajax/*")
public class WishController { 
  static Logger logger = Logger.getLogger(FileuploadController.class);
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired WishDao wishDao;
  @Autowired ServletContext servletContext;
  
 
  @RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Wish wish, @RequestParam(value="file", required=false) MultipartFile mFile) throws Exception {
	  	System.out.println("유저번호 : " + wish.getUno());
	  	String oriFileName = mFile.getOriginalFilename();
	  	
		if(oriFileName != null && !oriFileName.equals("")){
			String realPath = servletContext.getRealPath("/attachfile/");
			String sdfPath = new SimpleDateFormat("yyyy/MM/dd/").format(new Date());
			String filePath = realPath + sdfPath;
			File file = new File(filePath);
			file.mkdirs();
			
			String ext = oriFileName.substring(oriFileName.lastIndexOf("."));
			String realFileName = UUID.randomUUID().toString()+ext;
			String saveFullFileName = filePath+"/"+realFileName;
			mFile.transferTo(new File(saveFullFileName));
			wish.setPath(sdfPath+realFileName);
		}
		wish.setTag(wish.getTag().replaceAll(",", "#"));
		wish.setCno(wishDao.selectcNo(wish.getUno()));
		wishDao.insert(wish);
		wish.setNo(wishDao.selectNo());
    return new AjaxResult("success", wish);
  }

  @RequestMapping("list")
  public Object list(@RequestParam(defaultValue="1") int pageNo, HttpServletRequest req) throws Exception {
	
	Join join = (Join) req.getSession().getAttribute("loginUser");
	System.out.println("loginUser : " + join.getuNo());
	
	int pageSize = 10;
	HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("startIndex", (pageNo - 1) * pageSize);
    paramMap.put("length", pageSize);
    paramMap.put("uno", join.getuNo());
    System.out.println("pageNo : " + pageNo);
    List<Wish> wishs = wishDao.selectList(paramMap);
    
    
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", wishs);
    resultMap.put("loginUser", join);
    
    return resultMap;
  }

  @RequestMapping("delete")
  public AjaxResult delete(int no) throws Exception {
    if (wishDao.delete(no) <= 0) {
      return new AjaxResult("failure", null);
    } 

    return new AjaxResult("success", null);
  }
  
  @RequestMapping(value="update", method=RequestMethod.GET)
  public AjaxResult updateForm(int no) throws Exception {
	Wish wish =  wishDao.selectOne(no);
    return new AjaxResult("success", wish);
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
  
   @RequestMapping("buyCheck")
  public AjaxResult buyCheck(int no) throws Exception {
    Wish wish =  wishDao.selectOne(no);
    
    if( wish.getBuy() == 'Y' ){
    	wish.setBuy('N');
    }else if( wish.getBuy() == 'N' ) {
    	wish.setBuy('Y');
    }else {
    	return new AjaxResult("fail", null);
    }
    wishDao.updateBuy(wish);
    return new AjaxResult("success", wish.getNo());
  }
   
}
