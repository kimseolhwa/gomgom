package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

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
  @RequestMapping(value="join", method=RequestMethod.POST)
  public AjaxResult join(Join Join,HttpSession session) throws Exception {
	  
	  System.out.println("컨트롤러 호출 : " +  Join.getSelList());
	  
	  
	  // user table 에 등록 
	  JoinDao.memberJoin(Join);
	  
	  // 등록된 유저의 번호를 가져옴
	  int joinUserNo = JoinDao.selectNo();
	  
	  System.out.println("등록된 유저의 유저번호  : " + joinUserNo);
	  
	  
	  //Join.getSelList를 # 구분자로 파싱해서 유저엔태그 테이블에 등록된 유저번호와 함께 등록하
	  
	  String tagStr =  Join.getSelList().replaceFirst("#", "");
	  tagStr = tagStr.trim();
	  
	  String[] tagList =  tagStr.split("#");
	   
	   //넘어온 태그번호 확인
	  for(int i = 0 ; i< tagList.length;i++){
		  System.out.print((i+1)+" 번째 태그번호 : " + tagList[i] + "\n");
	  }
	  
	  Join.setUtNo(joinUserNo);
	  
	  
	  for(int i = 0 ; i< tagList.length;i++){
		Join.settNo(Integer.parseInt(tagList[i]));  
		JoinDao.registTag(Join);
	  }  
	  
	  
	  
	  // 등록된 유저의 이메일을 세션에 등록
	  session.setAttribute("admin", Join.getEmail());
	  
	  
	return new AjaxResult("success", null);
  }

  
  @RequestMapping(value="loginCk", method=RequestMethod.POST)
  public AjaxResult join(Join Join) throws Exception {
	  
	  System.out.println("로그인 체크 컨트롤러 호출, 이메일값 : " +  Join.getEmail());
	  
	  // db에서 조회
	    
	  int checkedEmailCnt  =  JoinDao.loginCheck(Join);
	  System.out.println(" 로긴체크하면서 다오에서 넘어온 값 : " +  checkedEmailCnt);

	
	  if(checkedEmailCnt>0){
		  // 이메일 중복될 때 
		  return new AjaxResult("중복이메일있음", checkedEmailCnt);
	  }else{
		  // 이메징 중복 없을 때 
		  return new AjaxResult("ok", checkedEmailCnt);
	  }
	  
  }
  
  
  
  @RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Join Join) throws Exception {
	  
	  
	  
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
