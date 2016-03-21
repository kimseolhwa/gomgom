package bitcamp.java77.domain;

import java.io.Serializable;

public class Join implements Serializable {
	private static final long serialVersionUID = 1L;
	
	// user
	protected int uNo;
	protected String name;
	protected String pwd;
	protected String email;
	protected String tPho;  // 유저 썸네일 포토
	protected String pho;   // 유저  포토
	protected String newPwd;  // 변경할 패스워드
	
	// loginuser
	protected int loginCheckCnt;

	// tag
	protected String selList;

	// user_tag
	protected int utNo;
	protected int tNo;
	
	
	//헤더에서 로그인 체큽막스
	protected String ckBox;
	
	
	//====================================================
	//카테고리
	protected String cName;
	protected int cNo;
	
		
	public String getcName() {
		return cName;
	}

	public void setcName(String cName) {
		this.cName = cName;
	}

	public int getcNo() {
		return cNo;
	}

	public void setcNo(int cNo) {
		this.cNo = cNo;
	}
	//====================================================

	
	// 생성자
	public Join() {	}

	
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

	public String gettPho() {
		return tPho;
	}

	public void settPho(String tPho) {
		this.tPho = tPho;
	}

	public String getPho() {
		return pho;
	}

	public void setPho(String pho) {
		this.pho = pho;
	}

	public String getNewPwd() {
		return newPwd;
	}

	public void setNewPwd(String newPwd) {
		this.newPwd = newPwd;
	}

	public int getLoginCheckCnt() {
		return loginCheckCnt;
	}

	public void setLoginCheckCnt(int loginCheckCnt) {
		this.loginCheckCnt = loginCheckCnt;
	}

	public String getSelList() {
		return selList;
	}

	public void setSelList(String selList) {
		this.selList = selList;
	}

	public int getUtNo() {
		return utNo;
	}

	public void setUtNo(int utNo) {
		this.utNo = utNo;
	}

	public int gettNo() {
		return tNo;
	}

	public void settNo(int tNo) {
		this.tNo = tNo;
	}

	public String getCkBox() {
		return ckBox;
	}

	public void setCkBox(String ckBox) {
		this.ckBox = ckBox;
	}

	@Override
	public String toString() {
		return "Join [name=" + name + ", pwd=" + pwd + ", email=" + email + "]";
	}
	

}
