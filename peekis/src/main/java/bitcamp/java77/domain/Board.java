package bitcamp.java77.domain;

import java.io.Serializable;

public class Board  implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int       no;
  protected String    title;
  protected String    content;
  protected int       price;
  protected String    url;
  protected String    attachFile; // 컬럼명 = afile
  
   
  public Board() {}

  
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


@Override
public String toString() {
	return "Board [no=" + no + ", title=" + title + ", content=" + content + ", price=" + price + ", url=" + url
			+ ", attachFile=" + attachFile + "]";
}



  
  
}
