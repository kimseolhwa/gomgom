package bitcamp.java77.domain;

import java.io.Serializable;

public class Category implements Serializable {
	private static final long serialVersionUID = 1L;
	
	protected int cNo; // 카테고리 번호 
	protected String name;  // 카테고리 명 
	protected int uNo; // 유저 번호 
	
	
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
	
	
	
	

}
