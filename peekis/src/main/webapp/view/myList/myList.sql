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
select * from wish where uno='7';
select * from category;
select * from user;
select * from `LIKE` where uno='2';
select * from SEND;
select * from follower;
select * from comment;
select * from tag;
select ut.tno, t.name from user_tag ut, tag t where uno='7' and ut.tno=t.tno;


select DISTINCT wish.*, 
			 	user.name as userName, 
			 	user.pho as userPho, 
			 	(select name from category c where c.cno=wish.cno) as categoryName
		  from wish, user, category
		 where wish.uno=user.uno=category.uno and wish.uno='7'


select name from category c where c.cno=wish.cno


select w.*,
		u.name as userName, 
		u.pho as userPho, 
		c.name as categoryName,
		(select count(*) from `like` where `like`.wno = w.wno ) as numOflNo,
		(select count(*) from `like` where `like`.wno = w.wno and `like`.uno='7') as likeSts,
		(select count(*) from send s where s.wno = w.wno and s.uno='7') as sendSts
  from wish w, user u, category c
 where
 	w.uno=u.uno=c.uno 
 	and
 	(w.tag like '%#여행%' or w.tag like '%#IT%' or w.tag like '%#여성%' or w.tag like '%#남성%')
 group by w.wno
 limit #{startIndex}, #{length}







select u.*, (select count(*) from follower f2 where f2.uno='2' and f2.uno2=f.uno) as sts
from follower f, user u
where f.uno2='3' and u.uno=f.uno
order by u.uno desc
		
select u.uno, u.name, u.pho
from user  as u
inner join follower as f
	on 	u.uno=f.uno2
	where f.uno='2'
		order by u.uno asc


select u.*, (select count(*) from follower f2 where f2.uno='2' and f2.uno2=u.uno) as fSts
from follower f, user u
where f.uno='3' and u.uno=f.uno2
order by u.uno desc		

select user.*, 
	  (select COUNT(*) from wish where uno='2') wishCnt,
	  (select COUNT(*) from `like` where uno='2') likeCnt,
	  (select COUNT(*) from follower where uno2='2') fCnt,
	  (select COUNT(*) from follower where uno='2') fCnt2
from user
where uno='2'


select w.*, 
	  u.name as userName,
	  u.pho as userPho, 
	  c.name as categoryName,
	  (select count(*) from `like` l2 where l.wno=l2.wno) as numOflNo,
	  (select count(*) from send s where w.wno=s.wno and s.uno='2') as sendSts
  from wish w, `like` l, user u, category c
  where  w.wno=l.wno and l.uno='3' and u.uno=w.uno=c.uno
order by w.wno desc





select u.*, (select count(*) from follower f2 where f2.uno='2' and f2.uno2=f.uno) as fSts
		from follower f, user u
		where f.uno='3' and u.uno=f.uno2
		order by u.uno desc
		
		
		


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
		 