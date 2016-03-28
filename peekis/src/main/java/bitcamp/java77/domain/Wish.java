package bitcamp.java77.domain;

import java.io.Serializable;
import java.util.Date;

public class Wish implements Serializable
{
	private static final long serialVersionUID = 1L;

	protected int no; // 게시글 번호
	protected String path;
	protected String title;
	protected String content;
	protected int price;
	protected String url;
	protected char buy;
	protected Date date;
	protected String tag;
	protected int cno; // 카테고리번호
	protected int uno; // 유저번호
	protected String userName;
	protected String userPho;
	protected String categoryName;

	
	//좋아요 
	protected int numOflNo; // 좋아요개수
	
	public Wish()
	{
	}

	public int getNumOflNo() {
		return numOflNo;
	}

	public void setNumOflNo(int numOflNo) {
		this.numOflNo = numOflNo;
	}

	public String getUserName()
	{
		return userName;
	}

	public void setUserName(String userName)
	{
		this.userName = userName;
	}

	public String getUserPho()
	{
		return userPho;
	}

	public void setUserPho(String userPho)
	{
		this.userPho = userPho;
	}
	
	public String getCategoryName()
	{
		return categoryName;
	}

	public void setCategoryName(String categoryName)
	{
		this.categoryName = categoryName;
	}

	public int getNo()
	{
		return no;
	}

	public void setNo(int no)
	{
		this.no = no;
	}

	public String getPath()
	{
		return path;
	}

	public void setPath(String path)
	{
		this.path = path;
	}

	public String getTitle()
	{
		return title;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}

	public String getContent()
	{
		return content;
	}

	public void setContent(String content)
	{
		this.content = content;
	}

	public int getPrice()
	{
		return price;
	}

	public void setPrice(int price)
	{
		this.price = price;
	}

	public String getUrl()
	{
		return url;
	}

	public void setUrl(String url)
	{
		this.url = url;
	}

	public char getBuy()
	{
		return buy;
	}

	public void setBuy(char buy)
	{
		this.buy = buy;
	}

	public Date getDate()
	{
		return date;
	}

	public void setDate(Date date)
	{
		this.date = date;
	}

	public String getTag()
	{
		return tag;
	}

	public void setTag(String tag)
	{
		this.tag = tag;
	}

	public int getCno()
	{
		return cno;
	}

	public void setCno(int cno)
	{
		this.cno = cno;
	}

	public int getUno()
	{
		return uno;
	}

	public void setUno(int uno)
	{
		this.uno = uno;
	}


	@Override
	public String toString()
	{
		return "Wish [no=" + no + ", path=" + path + ", title=" + title + ", content=" + content + ", price=" + price
				+ ", url=" + url + ", buy=" + buy + ", date=" + date + ", tag=" + tag + "]";
	}

}
