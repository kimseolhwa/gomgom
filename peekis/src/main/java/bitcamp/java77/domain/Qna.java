package bitcamp.java77.domain;

import java.io.Serializable;
import java.util.Date;

public class Qna implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private int bno;
	private String title;
	private String content;
	private int type;
	private String date;
	private char ansFlag;
	private int uNo;
	private String name;
	private String comCont;
	
	
	
	public String getComCont() {
		return comCont;
	}
	public void setComCont(String comCont) {
		this.comCont = comCont;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	//목록 답변결과
	public char getAnsFlag() {
		return ansFlag;
	}
	public void setAnsFlag(char ansFlag) {
		this.ansFlag = ansFlag;
	}

	//qna table set,get
	public int getBno() {
		return bno;
	}
	public void setBno(int bno) {
		this.bno = bno;
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
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getuNo() {
		return uNo;
	}
	public void setuNo(int uNo) {
		this.uNo = uNo;
	}
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	@Override
	public String toString() {
		return "Qna [no=" + bno + ", title=" + title + ", content=" + content + ", type=" + type + ", uNo=" + uNo
				+ ", date=" + date + "]";
	}
	
	//qna댓글
	
	
}
