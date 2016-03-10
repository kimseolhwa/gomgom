package bitcamp.java77.domain;

import java.io.Serializable;
import java.util.Date;

public class Wish  implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int       no;
  protected String    path;
  protected String    title;
  protected String    content;
  protected int       price;
  protected String    url;
  protected char	  buy;
  protected Date	  date;
  
  
   
  	public Wish() {}

	public int getNo() {
		return no;
	}
	
	
	
	public void setNo(int no) {
		this.no = no;
	}
	
	
	
	public String getPath() {
		return path;
	}
	
	
	
	public void setPath(String path) {
		this.path = path;
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
	
	
	
	public char getBuy() {
		return buy;
	}
	
	
	
	public void setBuy(char buy) {
		this.buy = buy;
	}
	
	
	
	public Date getDate() {
		return date;
	}
	
	
	
	public void setDate(Date date) {
		this.date = date;
	}
	
	@Override
	public String toString() {
		return "Wish [no=" + no + ", path=" + path + ", title=" + title + ", content=" + content + ", price=" + price
				+ ", url=" + url + ", buy=" + buy + ", date=" + date + "]";
	}


  
}
