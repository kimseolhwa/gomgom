package bitcamp.java77.domain;

import java.io.Serializable;

public class Join  implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int       no;
  protected String    title;
  protected String    content;
  protected int       price;
  protected String    url;
  protected String    attachFile; // 컬럼명 = afile
  
// user 
  protected int uNo;
  protected String name;
  protected String pwd;
  protected String email;
  
  // loginuser
  protected int loginCheckCnt;
  
  
// user table getter ,setter
  



public int getuNo() {
	return uNo;
}


public void setuNo(int uNo) {
	this.uNo = uNo;
}


public String getName() {
	return name;
}


public void setName(String name) {
	this.name = name;
}


public String getPwd() {
	return pwd;
}


public void setPwd(String pwd) {
	this.pwd = pwd;
}


public String getEmail() {
	return email;
}


public void setEmail(String email) {
	this.email = email;
}


//  생성자
  public Join() {}

 
// getter, setter  
  public int getNo() {
    return no;
  }

  public void setNo(int no) {
    this.no = no;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }


public int getPrice() {
	return price;
}


public void setPrice(int price) {
	this.price = price;
}


public String getUrl() {
	return url;
}


public void setUrl(String url) {
	this.url = url;
}


public String getAttachFile() {
	return attachFile;
}


public void setAttachFile(String attachFile) {
	this.attachFile = attachFile;
}



//  override
@Override
public String toString() {
	return "Board [no=" + no + ", title=" + title + ", content=" + content + ", price=" + price + ", url=" + url
			+ ", attachFile=" + attachFile + "]";
}



  
  
}
