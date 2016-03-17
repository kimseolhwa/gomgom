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
select * from wish;
insert into wish(fpath,title,cont,price,url,tag) select w1.FPATH, w1.TITLE, w1.CONT, w1.PRICE, w1.URL, w1.tag from wish w1;