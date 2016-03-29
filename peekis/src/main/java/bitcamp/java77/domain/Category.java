package bitcamp.java77.domain;

import java.io.Serializable;

public class Category implements Serializable {
	private static final long serialVersionUID = 1L;
	
	protected int cNo; // 카테고리 번호 
	protected String name;  // 카테고리 명 
	protected int uNo; // 유저 번호 
	protected String path1; // 카테고리에 나올 사진
	protected String path2; // 카테고리에 나올 사진
	protected String path3; // 카테고리에 나올 사진
	protected String path4; // 카테고리에 나올 사진
	

	//getter,setter
	public int getcNo() {
		return cNo;
	}
	public void setcNo(int cNo) {
		this.cNo = cNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getuNo() {
		return uNo;
	}
	public void setuNo(int uNo) {
		this.uNo = uNo;
	}
	public String getPath1()
	{
		return path1;
	}
	public void setPath1(String path1)
	{
		this.path1 = path1;
	}
	public String getPath2()
	{
		return path2;
	}
	public void setPath2(String path2)
	{
		this.path2 = path2;
	}
	public String getPath3()
	{
		return path3;
	}
	public void setPath3(String path3)
	{
		this.path3 = path3;
	}
	public String getPath4()
	{
		return path4;
	}
	public void setPath4(String path4)
	{
		this.path4 = path4;
	}
	

}
