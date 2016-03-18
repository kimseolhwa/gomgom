package bitcamp.java77.domain;

import java.io.Serializable;

public class Join implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int no;
	protected String title;
	protected String content;
	protected int price;
	protected String url;
	protected String attachFile; // 컬럼명 = afile

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

	

	
	
	public String getCkBox() {
		return ckBox;
	}


	public void setCkBox(String ckBox) {
		this.ckBox = ckBox;
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
	
	public int getLoginCheckCnt() {
		return loginCheckCnt;
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

	public void setLoginCheckCnt(int loginCheckCnt) {
		this.loginCheckCnt = loginCheckCnt;
	}

	public String getSelList() {
		return selList;
	}

	public void setSelList(String selList) {
		this.selList = selList;
	}

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

	// 생성자
	public Join() {
	}

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

	// override
	@Override
	public String toString() {
		return "Board [no=" + no + ", title=" + title + ", content=" + content + ", price=" + price + ", url=" + url
				+ ", attachFile=" + attachFile + "]";
	}

}
