

-- 유저
CREATE TABLE `USER` (
	`UNO`   INTEGER     NOT NULL, -- 유저번호
	`NAME`  VARCHAR(50) NOT NULL, -- 유저이름
	`PWD`   VARCHAR(20) NOT NULL, -- 유저암호
	`EMAIL` VARCHAR(40) NOT NULL, -- 유저이메일
	`TPHO`  VARCHAR(255)   NULL,     -- 유저썸네일
	`PHO`   VARCHAR(255)   NULL      -- 유저사진
);

-- 유저
ALTER TABLE `USER`
	ADD CONSTRAINT `PK_USER` -- 유저 기본키
		PRIMARY KEY (
			`UNO` -- 유저번호
		);

-- 유저 유니크 인덱스
CREATE UNIQUE INDEX `UIX_USER`
	ON `USER` ( -- 유저
		`EMAIL` ASC -- 유저이메일
	);

ALTER TABLE `USER`
	MODIFY COLUMN `UNO` INTEGER NOT NULL AUTO_INCREMENT;

-- 위시리스트
CREATE TABLE `WISH` (
	`WNO`   INTEGER      NOT NULL, -- 위시번호
	`FPATH` VARCHAR(255) NOT NULL, -- 위시사진경로
	`TPATH` VARCHAR(255) NOT NULL, -- 썸네일사진경로
	`TITLE` VARCHAR(255) NOT NULL, -- 위시제목
	`CONT`  VARCHAR(255) NULL,     -- 위시내용
	`PRICE` INTEGER      NULL,     -- 위시가격
	`URL`   VARCHAR(255) NULL,     -- 위시URL
	`BUY`   CHAR(1)      NOT NULL, -- 구매여부
	`TAG`   VARCHAR(255) NULL,     -- 태그
	`DATE`  DATE         NOT NULL, -- 작성시간
	`CNO`   INTEGER      NOT NULL  -- 카테고리번호
);

-- 위시리스트
ALTER TABLE `WISH`
	ADD CONSTRAINT `PK_WISH` -- 위시리스트 기본키
		PRIMARY KEY (
			`WNO` -- 위시번호
		);

ALTER TABLE `WISH`
	MODIFY COLUMN `WNO` INTEGER NOT NULL AUTO_INCREMENT;

-- 게시판
CREATE TABLE `BOARD` (
	`BNO`   INTEGER      NOT NULL, -- 게시글번호
	`TITLE` VARCHAR(255) NOT NULL, -- 게시글 제목
	`CONT`  VARCHAR(255) NOT NULL, -- 게시글 내용
	`DATE`  DATE         NOT NULL, -- 게시글 작성시간
	`UNO`   INTEGER      NOT NULL  -- 유저번호
);

-- 게시판
ALTER TABLE `BOARD`
	ADD CONSTRAINT `PK_BOARD` -- 게시판 기본키
		PRIMARY KEY (
			`BNO` -- 게시글번호
		);

ALTER TABLE `BOARD`
	MODIFY COLUMN `BNO` INTEGER NOT NULL AUTO_INCREMENT;

-- 팔로워팔로잉
CREATE TABLE `FOLLOWER` (
	`UNO`  INTEGER NOT NULL, -- toUser
	`UNO2` INTEGER NOT NULL  -- fromUser
);

-- 팔로워팔로잉
ALTER TABLE `FOLLOWER`
	ADD CONSTRAINT `PK_FOLLOWER` -- 팔로워팔로잉 기본키
		PRIMARY KEY (
			`UNO`,  -- toUser
			`UNO2`  -- fromUser
		);

-- 좋아요
CREATE TABLE `LIKE` (
	`LNO` INTEGER NOT NULL, -- 좋아요번호
	`WNO` INTEGER NOT NULL, -- 위시번호
	`UNO` INTEGER NOT NULL  -- 유저번호
);

-- 좋아요
ALTER TABLE `LIKE`
	ADD CONSTRAINT `PK_LIKE` -- 좋아요 기본키
		PRIMARY KEY (
			`LNO` -- 좋아요번호
		);

-- 좋아요 유니크 인덱스
CREATE UNIQUE INDEX `UIX_LIKE`
	ON `LIKE` ( -- 좋아요
		`WNO` ASC, -- 위시번호
		`UNO` ASC  -- 유저번호
	);

ALTER TABLE `LIKE`
	MODIFY COLUMN `LNO` INTEGER NOT NULL AUTO_INCREMENT;

-- 댓글
CREATE TABLE `COMMENT` (
	`CONO` INTEGER      NOT NULL, -- 댓글번호
	`WNO`  INTEGER      NOT NULL, -- 위시번호
	`UNO`  INTEGER      NOT NULL, -- 유저번호
	`CONT` VARCHAR(255) NOT NULL, -- 댓글내용
	`DATE` DATE         NOT NULL  -- 댓글작성시간
);

-- 댓글
ALTER TABLE `COMMENT`
	ADD CONSTRAINT `PK_COMMENT` -- 댓글 기본키
		PRIMARY KEY (
			`CONO` -- 댓글번호
		);

ALTER TABLE `COMMENT`
	MODIFY COLUMN `CONO` INTEGER NOT NULL AUTO_INCREMENT;

-- 카테고리
CREATE TABLE `CATEGORY` (
	`CNO`  INTEGER     NOT NULL, -- 카테고리번호
	`NAME` VARCHAR(50) NOT NULL, -- 위시폴더명
	`UNO`  INTEGER     NOT NULL  -- 유저번호
);

-- 카테고리
ALTER TABLE `CATEGORY`
	ADD CONSTRAINT `PK_CATEGORY` -- 카테고리 기본키
		PRIMARY KEY (
			`CNO` -- 카테고리번호
		);

ALTER TABLE `CATEGORY`
	MODIFY COLUMN `CNO` INTEGER NOT NULL AUTO_INCREMENT;

-- 담아가기
CREATE TABLE `SEND` (
	`SNO` INTEGER NOT NULL, -- 담아가기 번호
	`UNO` INTEGER NOT NULL, -- 유저번호
	`WNO` INTEGER NOT NULL  -- 위시번호
);

-- 담아가기
ALTER TABLE `SEND`
	ADD CONSTRAINT `PK_SEND` -- 담아가기 기본키
		PRIMARY KEY (
			`SNO` -- 담아가기 번호
		);

-- 담아가기 유니크 인덱스
CREATE UNIQUE INDEX `UIX_SEND`
	ON `SEND` ( -- 담아가기
		`UNO` ASC, -- 유저번호
		`WNO` ASC  -- 위시번호
	);

ALTER TABLE `SEND`
	MODIFY COLUMN `SNO` INTEGER NOT NULL AUTO_INCREMENT;

-- 태그
CREATE TABLE `TAG` (
	`TNO`    INTEGER      NOT NULL, -- 태그번호
	`NAME`   VARCHAR(50)  NOT NULL, -- 위시태그이름
	`TFPATH` VARCHAR(255) NULL      -- 파일경로
);

-- 태그
ALTER TABLE `TAG`
	ADD CONSTRAINT `PK_TAG` -- 태그 기본키
		PRIMARY KEY (
			`TNO` -- 태그번호
		);

-- 유저&태그
CREATE TABLE `USER_TAG` (
	`UNO` INTEGER NOT NULL, -- 유저번호
	`TNO` INTEGER NOT NULL  -- 태그번호
);

-- 유저&태그
ALTER TABLE `USER_TAG`
	ADD CONSTRAINT `PK_USER_TAG` -- 유저&태그 기본키
		PRIMARY KEY (
			`UNO`, -- 유저번호
			`TNO`  -- 태그번호
		);

-- 위시리스트
ALTER TABLE `WISH`
	ADD CONSTRAINT `FK_CATEGORY_TO_WISH` -- 카테고리 -> 위시리스트
		FOREIGN KEY (
			`CNO` -- 카테고리번호
		)
		REFERENCES `CATEGORY` ( -- 카테고리
			`CNO` -- 카테고리번호
		);

-- 게시판
ALTER TABLE `BOARD`
	ADD CONSTRAINT `FK_USER_TO_BOARD` -- 유저 -> 게시판
		FOREIGN KEY (
			`UNO` -- 유저번호
		)
		REFERENCES `USER` ( -- 유저
			`UNO` -- 유저번호
		);

-- 팔로워팔로잉
ALTER TABLE `FOLLOWER`
	ADD CONSTRAINT `FK_USER_TO_FOLLOWER` -- 유저 -> 팔로워팔로잉
		FOREIGN KEY (
			`UNO` -- toUser
		)
		REFERENCES `USER` ( -- 유저
			`UNO` -- 유저번호
		);

-- 팔로워팔로잉
ALTER TABLE `FOLLOWER`
	ADD CONSTRAINT `FK_USER_TO_FOLLOWER2` -- 유저 -> 팔로워팔로잉2
		FOREIGN KEY (
			`UNO2` -- fromUser
		)
		REFERENCES `USER` ( -- 유저
			`UNO` -- 유저번호
		);

-- 좋아요
ALTER TABLE `LIKE`
	ADD CONSTRAINT `FK_WISH_TO_LIKE` -- 위시리스트 -> 좋아요
		FOREIGN KEY (
			`WNO` -- 위시번호
		)
		REFERENCES `WISH` ( -- 위시리스트
			`WNO` -- 위시번호
		);

-- 좋아요
ALTER TABLE `LIKE`
	ADD CONSTRAINT `FK_USER_TO_LIKE` -- 유저 -> 좋아요
		FOREIGN KEY (
			`UNO` -- 유저번호
		)
		REFERENCES `USER` ( -- 유저
			`UNO` -- 유저번호
		);

-- 댓글
ALTER TABLE `COMMENT`
	ADD CONSTRAINT `FK_WISH_TO_COMMENT` -- 위시리스트 -> 댓글
		FOREIGN KEY (
			`WNO` -- 위시번호
		)
		REFERENCES `WISH` ( -- 위시리스트
			`WNO` -- 위시번호
		);

-- 댓글
ALTER TABLE `COMMENT`
	ADD CONSTRAINT `FK_USER_TO_COMMENT` -- 유저 -> 댓글
		FOREIGN KEY (
			`UNO` -- 유저번호
		)
		REFERENCES `USER` ( -- 유저
			`UNO` -- 유저번호
		);

-- 카테고리
ALTER TABLE `CATEGORY`
	ADD CONSTRAINT `FK_USER_TO_CATEGORY` -- 유저 -> 카테고리
		FOREIGN KEY (
			`UNO` -- 유저번호
		)
		REFERENCES `USER` ( -- 유저
			`UNO` -- 유저번호
		);

-- 담아가기
ALTER TABLE `SEND`
	ADD CONSTRAINT `FK_WISH_TO_SEND` -- 위시리스트 -> 담아가기
		FOREIGN KEY (
			`WNO` -- 위시번호
		)
		REFERENCES `WISH` ( -- 위시리스트
			`WNO` -- 위시번호
		);

-- 담아가기
ALTER TABLE `SEND`
	ADD CONSTRAINT `FK_USER_TO_SEND` -- 유저 -> 담아가기
		FOREIGN KEY (
			`UNO` -- 유저번호
		)
		REFERENCES `USER` ( -- 유저
			`UNO` -- 유저번호
		);

-- 유저&태그
ALTER TABLE `USER_TAG`
	ADD CONSTRAINT `FK_USER_TO_USER_TAG` -- 유저 -> 유저&태그
		FOREIGN KEY (
			`UNO` -- 유저번호
		)
		REFERENCES `USER` ( -- 유저
			`UNO` -- 유저번호
		);

-- 유저&태그
ALTER TABLE `USER_TAG`
	ADD CONSTRAINT `FK_TAG_TO_USER_TAG` -- 태그 -> 유저&태그
		FOREIGN KEY (
			`TNO` -- 태그번호
		)
		REFERENCES `TAG` ( -- 태그
			`TNO` -- 태그번호
		);
		
		
		
--태그 테이블에 기본 태그 인서트

--여성
insert into tag (tno,name,tfpath ) values (1,"여성","/peekis/view/register/img/woman.jpg");

--남성
insert into tag (tno,name,tfpath ) values (2,"남성","/peekis/view/register/img/man.jpg");

--아동
insert into tag (tno,name,tfpath ) values (3,"아동","/peekis/view/register/img/kids.jpg");

--여행
insert into tag (tno,name,tfpath ) values (4,"여행","/peekis/view/register/img/trip.png");

--동물
insert into tag (tno,name,tfpath ) values (5,"동물","/peekis/view/register/img/animal.jpg");

--악세서리
insert into tag (tno,name,tfpath ) values (6,"악세서리","/peekis/view/register/img/Accessory-Designer-Intro.jpg");

--IT
insert into tag (tno,name,tfpath ) values (7,"IT","/peekis/view/register/img/it.jpg");

--스포츠
insert into tag (tno,name,tfpath ) values (8,"스포츠","/peekis/view/register/img/sports.jpg");

--코스메틱
insert into tag (tno,name,tfpath ) values (9,"코스메틱","/peekis/view/register/img/cosmetic.jpg");

--악기
insert into tag (tno,name,tfpath ) values (10,"악기","/peekis/view/register/img/instruments.jpg");

--자동차
insert into tag (tno,name,tfpath ) values (11,"자동차","/peekis/view/register/img/car.JPG");

--음식
insert into tag (tno,name,tfpath ) values (12,"음식","/peekis/view/register/img/food.jpg");

--가방
insert into tag (tno,name,tfpath ) values (13,"가방","/peekis/view/register/img/bag.jpg");

--신발
insert into tag (tno,name,tfpath ) values (14,"신발","/peekis/view/register/img/shoes.jpg");

--책
insert into tag (tno,name,tfpath ) values (15,"책","/peekis/view/register/img/book.jpg");

--가구
insert into tag (tno,name,tfpath ) values (16,"가구","/peekis/view/register/img/furniture.jpg");		