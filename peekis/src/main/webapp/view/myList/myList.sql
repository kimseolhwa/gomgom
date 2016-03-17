-- 위시리스트
CREATE TABLE `WISH` (
	`WNO`   INTEGER      NOT NULL auto_increment primary key COMMENT '위시번호', -- 위시번호
	`FPATH` VARCHAR(255) NOT NULL COMMENT '위시사진경로', -- 위시사진경로
	`TPATH` VARCHAR(255) NULL COMMENT '썸네일사진경로', -- 썸네일사진경로
	`TITLE` VARCHAR(255) NOT NULL COMMENT '위시제목', -- 위시제목
	`CONT`  VARCHAR(255) NULL     COMMENT '위시내용', -- 위시내용
	`PRICE` INTEGER      NULL     COMMENT '위시가격', -- 위시가격
	`URL`   VARCHAR(255) NULL     COMMENT '위시URL', -- 위시URL
	`BUY`   CHAR(1)      NOT NULL DEFAULT 'N' COMMENT '구매여부', -- 구매여부
	`DATE`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성시간', -- 작성시간
	`CNO`   INTEGER      NULL COMMENT '카테고리번호', -- 카테고리번호
	`TAG`   VARCHAR(255) NULL COMMENT '태그' -- 태그
)
COMMENT '위시리스트';
insert into wish(fpath,title,cont,price,url,buy,tag,cno,uno) select w1.fpath, w1.title, w1.cont, w1.price, w1.url, w1.buy, w1.tag, w1.cno, w1.uno from wish w1;
insert into category (name, uno) values ('(default)', 4); 
select * from wish;
select * from category;
select * from user;
select * from `LIKE`;
select min(cno) from category where uno='2'
delete from wish where cno='1';
delete from `LIKE` where lno<='22';