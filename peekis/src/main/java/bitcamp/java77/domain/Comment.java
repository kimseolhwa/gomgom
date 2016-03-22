package bitcamp.java77.domain;

import java.io.Serializable;

public class Comment implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
//	-- 댓글
//	CREATE TABLE `COMMENT` (
//		`CONO` INTEGER      NOT NULL, -- 댓글번호
//		`WNO`  INTEGER      NOT NULL, -- 위시번호
//		`UNO`  INTEGER      NOT NULL, -- 유저번호
//		`CONT` VARCHAR(255) NOT NULL, -- 댓글내용
//		`DATE` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP on update current_timestamp  -- 댓글작성시간
//	);
	
	// comment
	protected int coNo;
	protected int wNo;
	protected int uNo;
	protected String cont;
	
	//get,set
	
	public int getCoNo() {
		return coNo;
	}
	public void setCoNo(int coNo) {
		this.coNo = coNo;
	}
	public int getwNo() {
		return wNo;
	}
	public void setwNo(int wNo) {
		this.wNo = wNo;
	}
	public int getuNo() {
		return uNo;
	}
	public void setuNo(int uNo) {
		this.uNo = uNo;
	}
	public String getCont() {
		return cont;
	}
	public void setCont(String cont) {
		this.cont = cont;
	}
	

}
