package bitcamp.java77.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import bitcamp.java77.domain.Join;
import bitcamp.java77.filter.AuthFilter;

public class AuthInterceptor extends HandlerInterceptorAdapter {
	  private static final Logger log = Logger.getLogger(AuthFilter.class);
	  
	  @Override
	  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
	    
	    log.debug("로그인 인터셉터 실행!");
	    Join loginUser = (Join)request.getSession().getAttribute("loginUser");
	    
	   if (!request.getServletPath().startsWith("/auth") && loginUser == null) {
	    	System.out.println("인터셉터 return false");
	    	return false; // 다음으로 가는 것을 멈춰라!
	    }
	    
	    return true; // 다음 인터셉터나 페이지 컨트롤러로 가라.
	  }
	}
