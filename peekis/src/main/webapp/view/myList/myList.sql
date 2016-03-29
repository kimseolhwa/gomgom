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
insert into wish(fpath,title,cont,price,url,buy,tag,cno,uno) select w1.fpath, w1.title, w1.cont, w1.price, w1.url, w1.buy, w1.tag, w1.cno, w1.uno from wish w1;
insert into category (name, uno) values ('(default)', 4); 
select * from wish;
select * from category;
select * from user;
select * from `LIKE` where uno='2';
select * from SEND;
select * from follower;

select u.*
from follower f, user u
where f.uno2='2' and u.uno=f.uno
order by u.uno desc
		
select u.uno, u.name, u.pho
from user  as u
inner join follower as f
	on 	u.uno=f.uno2
	where f.uno='2'
		order by u.uno asc



select w.*, u.name as userName, u.pho as userPho, c.name as categoryName
from wish w, `like` l, user u, category c
where  w.wno=l.wno and l.uno='2' and u.uno=w.uno=c.uno
order by w.wno desc

select DISTINCT wish.*, user.name as userName, user.pho as userPho, category.name as categoryName, 
			(select count(*) from `like` where `like`.wno = wish.wno ) as like_cnt
from wish, user, category, `like`
where wish.uno=user.uno=category.uno=
group by wno

-----------------------------------------------------------	1	 
ALTER TABLE  `WISH` DROP FOREIGN KEY  `FK_CATEGORY_TO_WISH` ;
ALTER TABLE  `WISH` ADD CONSTRAINT `FK_CATEGORY_TO_WISH` FOREIGN KEY (  `CNO` ) REFERENCES  `CATEGORY` (
`CNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
2----------------------------------------------------------- 2
ALTER TABLE  `BOARD` DROP FOREIGN KEY  `FK_USER_TO_BOARD` ;
ALTER TABLE  `BOARD` ADD CONSTRAINT `FK_USER_TO_BOARD` FOREIGN KEY (  `UNO` ) REFERENCES  `USER` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
3----------------------------------------------------------- 3
ALTER TABLE  `FOLLOWER` DROP FOREIGN KEY  `FK_USER_TO_FOLLOWER` ;
ALTER TABLE  `FOLLOWER` ADD CONSTRAINT `FK_USER_TO_FOLLOWER` FOREIGN KEY (  `UNO` ) REFERENCES  `USER` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 4
ALTER TABLE  `FOLLOWER` DROP FOREIGN KEY  `FK_USER_TO_FOLLOWER2` ;
ALTER TABLE  `FOLLOWER` ADD CONSTRAINT `FK_USER_TO_FOLLOWER2` FOREIGN KEY (  `UNO2` ) REFERENCES  `USER` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 5
ALTER TABLE  `LIKE` DROP FOREIGN KEY  `FK_WISH_TO_LIKE` ;
ALTER TABLE  `LIKE` ADD CONSTRAINT `FK_WISH_TO_LIKE` FOREIGN KEY (  `WNO` ) REFERENCES  `WISH` (
`WNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 6
ALTER TABLE  `LIKE` DROP FOREIGN KEY  `FK_USER_TO_LIKE` ;
ALTER TABLE  `LIKE` ADD CONSTRAINT `FK_USER_TO_LIKE` FOREIGN KEY (  `UNO` ) REFERENCES  `USER` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 7
ALTER TABLE  `COMMENT` DROP FOREIGN KEY  `FK_WISH_TO_COMMENT` ;
ALTER TABLE  `COMMENT` ADD CONSTRAINT `FK_WISH_TO_COMMENT` FOREIGN KEY (  `WNO` ) REFERENCES  `WISH` (
`WNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 8
ALTER TABLE  `COMMENT` DROP FOREIGN KEY  `FK_USER_TO_COMMENT` ;
ALTER TABLE  `COMMENT` ADD CONSTRAINT `FK_USER_TO_COMMENT` FOREIGN KEY (  `UNO` ) REFERENCES  `USER` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 9
ALTER TABLE  `CATEGORY` DROP FOREIGN KEY  `FK_USER_TO_CATEGORY` ;
ALTER TABLE  `CATEGORY` ADD CONSTRAINT `FK_USER_TO_CATEGORY` FOREIGN KEY (  `UNO` ) REFERENCES  `USER` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 10
ALTER TABLE  `SEND` DROP FOREIGN KEY  `FK_WISH_TO_SEND` ;
ALTER TABLE  `SEND` ADD CONSTRAINT `FK_WISH_TO_SEND` FOREIGN KEY (  `WNO` ) REFERENCES  `WISH` (
`WNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 11
ALTER TABLE  `SEND` DROP FOREIGN KEY  `FK_USER_TO_SEND` ;
ALTER TABLE  `SEND` ADD CONSTRAINT `FK_USER_TO_SEND` FOREIGN KEY (  `UNO` ) REFERENCES  `USER` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 12
ALTER TABLE  `USER_TAG` DROP FOREIGN KEY  `FK_USER_TO_USER_TAG` ;
ALTER TABLE  `USER_TAG` ADD CONSTRAINT `FK_USER_TO_USER_TAG` FOREIGN KEY (  `UNO` ) REFERENCES  `USER_TAG` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 13
ALTER TABLE  `USER_TAG` DROP FOREIGN KEY  `FK_TAG_TO_USER_TAG` ;
ALTER TABLE  `USER_TAG` ADD CONSTRAINT `FK_TAG_TO_USER_TAG` FOREIGN KEY (  `TNO` ) REFERENCES  `TAG` (
`TNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
----------------------------------------------------------- 14
ALTER TABLE  `WISH` DROP FOREIGN KEY  `FK_USER_TO_WISH` ;
ALTER TABLE  `WISH` ADD CONSTRAINT `FK_USER_TO_WISH` FOREIGN KEY (  `UNO` ) REFERENCES  `USER` (
`UNO`
) ON DELETE CASCADE ON UPDATE CASCADE;
		 