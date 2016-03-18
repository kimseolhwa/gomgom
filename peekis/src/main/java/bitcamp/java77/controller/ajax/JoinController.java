package bitcamp.java77.controller.ajax;

import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import bitcamp.java77.dao.JoinDao;
import bitcamp.java77.domain.AjaxResult;
import bitcamp.java77.domain.Join;

@Controller("ajax.JoinController")
@RequestMapping("/auth/ajax/*")
public class JoinController { 
  static Logger logger = Logger.getLogger(FileuploadController.class);
  public static final String SAVED_DIR = "/attachfile";
  
  @Autowired JoinDao joinDao;
  @Autowired ServletContext servletContext;
  
 
//  회원가입
  @RequestMapping(value="join", method=RequestMethod.POST)
  public AjaxResult join(Join join,HttpSession session) throws Exception {
	  
	  
	  // 유저테이블에서 UNO 컬럼을 자동증가로 수정하고 

	  System.out.println("컨트롤러 호출 : " +  join.getSelList());
	  
	  
	  // user table 에 등록 
	  joinDao.memberJoin(join);
	  
	  // 등록된 유저의 번호를 가져옴
	  int joinUserNo = joinDao.selectNo();
	  join.setuNo(joinUserNo);
	  System.out.println("등록된 유저의 유저번호  : " + joinUserNo);
	  
	  
	  //Join.getSelList를 # 구분자로 파싱해서 유저엔태그 테이블에 등록된 유저번호와 함께 등록하
	  
	  String tagStr =  join.getSelList().replaceFirst("#", "");
	  tagStr = tagStr.trim();
	  
	  String[] tagList =  tagStr.split("#");
	   
	   //넘어온 태그번호 확인
	  for(int i = 0 ; i< tagList.length;i++){
		  System.out.print((i+1)+" 번째 태그번호 : " + tagList[i] + "\n");
	  }
	  
	  join.setUtNo(joinUserNo);
	  
	  
	  for(int i = 0 ; i< tagList.length;i++){
		  join.settNo(Integer.parseInt(tagList[i]));  
		  joinDao.registTag(join);
	  }  
	  
	  join.setcName("(default)");
	  joinDao.addCategory(join);
	  //join.setcNo(cNo);
	  
	  // 등록된 유저의 이메일을 세션에 등록
	  session.setAttribute("loginUser", join);
	  
	  
	return new AjaxResult("success", null);
  }

  
  @RequestMapping(value="loginCk", method=RequestMethod.POST)
  public AjaxResult join(Join join) throws Exception {
	  
	  System.out.println("로그인 체크 컨트롤러 호출, 이메일값 : " +  join.getEmail());
	  
	  // db에서 조회
	  int checkedEmailCnt  =  joinDao.loginCheck(join);
	  System.out.println(" 로긴체크하면서 다오에서 넘어온 값 : " +  checkedEmailCnt);

	
	  if(checkedEmailCnt>0){
		  // 이메일 중복될 때 
		  return new AjaxResult("중복이메일있음", checkedEmailCnt);
	  }else{
		  // 이메일 중복 없을 때 
		  return new AjaxResult("ok", checkedEmailCnt);
	  }
	  
  }

  @RequestMapping(value="login", method=RequestMethod.POST)
  public AjaxResult login(Join join, HttpSession session) throws Exception {
	  
	  	System.out.println("로그인 컨트롤러 호출 : " + join.getEmail());
	  	
	  	//이메일을 먼저 체크 
	  	int checkedEmailCnt  =  joinDao.loginCheck(join);
	  	System.out.println(" 이메일체크하면서 다오에서 넘어온 값 : " +  checkedEmailCnt);
	  	
	  	
		  if(checkedEmailCnt>0){
			  // 체크된 이메일이 있을 때 이메일을 가지고 패스워드와 동시에 일치하는지  
			  int checkedLoginCnt = joinDao.EmailPwCheck(join);	
			  System.out.println("이메일과 패스워드가 일치하는 값 : " + checkedLoginCnt);
			  
			  if(checkedLoginCnt>0){
				  // 이메일과 패스워드가 둘다 일치한다.
				  
				  // 등록된 유저의 이메일을 세션에 등록
				  join = joinDao.selectUser(join);
				  session.setAttribute("loginUser", join);

				  
				  return new AjaxResult("로그인되면 된다.", checkedLoginCnt);
				  
			  }else{
				  // 패스워드가 일치하지 않는다.
				  return new AjaxResult("패스워드가 일치하지 않습니다.", checkedLoginCnt);
			  }
			  
		  }else{
			  // 체크된 이메일이 없을때 
			  return new AjaxResult("가입된 이메일이 아닙니다.", checkedEmailCnt);
		  }
	  
  }
  
  
  
  @RequestMapping(value="add", method=RequestMethod.POST)
  public AjaxResult add(Join join) throws Exception {
	  
	  
	  
    /*
    if (file.getSize() > 0) {
      String newFileName = MultipartHelper.generateFilename(file.getOriginalFilename());  
      File attachfile = new File(servletContext.getRealPath(SAVED_DIR) 
                                  + "/" + newFileName);
      file.transferTo(attachfile);
      Join.setAttachFile(newFileName);
    }
    */
	  joinDao.insert(join);
    return new AjaxResult("success", null);
  }
  

  @RequestMapping("list")
  public Object list() throws Exception {
   
    List<Join> joins = joinDao.selectList();
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("data", joins);
    
    for(int i=0; i < joins.size(); i++){
    	System.out.println(joins.get(i).getTitle());
    }
    return resultMap;
  }
  
  @RequestMapping("userInfo")
  public AjaxResult userInfo(HttpSession session) throws Exception {
	  
	 System.out.println("userInfo 콘트롤러 호출");
	 
	  Join join = (Join) session.getAttribute("loginUser");
	 
	  System.out.println("세션 이메일 확인 : "+join.getEmail());
	  System.out.println("세션 이름 확인 : " +join.getName());
	 
	  return new AjaxResult("success", join);
  }

  @RequestMapping(value="userInfoUpdate", method=RequestMethod.POST)
  @ResponseBody
  public AjaxResult userInfoUpdate(Join join, @RequestParam(value="file", required=false) MultipartFile mFile) throws Exception {
	  
	  
	  System.out.println("userInfoUpdate 콘트롤러 호출");
	  
	  System.out.println("넘어온유저넘너 : " + join.getuNo());
	  System.out.println("넘어온이름 : " + join.getName());
	  System.out.println("넘어온이메일 : " + join.getEmail());
	  System.out.println("넘어온 현재 패스워드 : " + join.getPwd());
	  System.out.println("넘어온 새 패스워드 : " + join.getNewPwd());
	  
	  
	  String oriFileName = mFile.getOriginalFilename();
	  System.out.println("oriFileName : "+ oriFileName);
	  
	  return new AjaxResult("success", null);
  }
  
  
  
  
  
}
