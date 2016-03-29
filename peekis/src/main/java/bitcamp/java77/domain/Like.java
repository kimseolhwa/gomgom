package bitcamp.java77.domain;

import java.io.Serializable;

public class Like implements Serializable {
	private static final long serialVersionUID = 1L;
	
	protected int lNo;
	protected int uNo;
	protected int wNo;
	
//	상세페이지 도메인
	protected String pho; 
	protected String name;
	protected int numOfLno;
	
	
	
	public Like() {

	}
	
	public String getPho() {
		return pho;
	}

	public void setPho(String pho) {
		this.pho = pho;
	}

	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public int getNumOfLno() {
		return numOfLno;
	}

	public void setNumOfLno(int numOfLno) {
		this.numOfLno = numOfLno;
	}

	public int getlNo() {
		return lNo;
	}
	public void setlNo(int lNo) {
		this.lNo = lNo;
	}
	public int getuNo() {
		return uNo;
	}
	public void setuNo(int uNo) {
		this.uNo = uNo;
	}
	public int getwNo() {
		return wNo;
	}
	public void setwNo(int wNo) {
		this.wNo = wNo;
	}

}
