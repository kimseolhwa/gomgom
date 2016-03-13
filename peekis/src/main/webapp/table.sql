-- 유저
CREATE TABLE `USER` (
	`UNO`   INTEGER      NOT NULL COMMENT '유저번호', -- 유저번호
	`NAME`  VARCHAR(50)  NOT NULL COMMENT '유저이름', -- 유저이름
	`PWD`   VARCHAR(20)  NOT NULL COMMENT '유저암호', -- 유저암호
	`EMAIL` VARCHAR(40)  NOT NULL COMMENT '유저이메일', -- 유저이메일
	`PHO`   VARCHAR(255) NULL     COMMENT '유저사진' -- 유저사진
)
COMMENT '유저';

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

-- 위시리스트
CREATE TABLE `WISH` (
	`WNO`   INTEGER      NOT NULL auto_increment primary key COMMENT '위시번호', -- 위시번호
	`FPATH` VARCHAR(255) NOT NULL COMMENT '위시사진경로', -- 위시사진경로
	`TPATH` VARCHAR(255) NULL COMMENT '썸네일사진경로', -- 썸네일사진경로
	`FNAME` VARCHAR(50)  NULL COMMENT '변경된사진이름', -- 변경된사진이름
	`TNAME` VARCHAR(50)  NULL COMMENT '썸네일사진이름', -- 썸네일사진이름
	`TITLE` VARCHAR(255) NOT NULL COMMENT '위시제목', -- 위시제목
	`CONT`  VARCHAR(255) NULL     COMMENT '위시내용', -- 위시내용
	`PRICE` INTEGER      NULL     COMMENT '위시가격', -- 위시가격
	`URL`   VARCHAR(255) NULL     COMMENT '위시URL', -- 위시URL
	`BUY`   CHAR(1)      NOT NULL DEFAULT 'N' COMMENT '구매여부', -- 구매여부
	`DATE`  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성시간', -- 작성시간
	`CNO`   INTEGER      NULL COMMENT '카테고리번호' -- 카테고리번호
)
COMMENT '위시리스트';
select * from wish;

-- 위시리스트
ALTER TABLE `WISH`
	ADD CONSTRAINT `PK_WISH` -- 위시리스트 기본키
		PRIMARY KEY (
			`WNO` -- 위시번호
		);

-- 게시판
CREATE TABLE `BOARD` (
	`BNO`   INTEGER      NOT NULL COMMENT '게시글번호', -- 게시글번호
	`TITLE` VARCHAR(255) NOT NULL COMMENT '게시글 제목', -- 게시글 제목
	`CONT`  VARCHAR(255) NOT NULL COMMENT '게시글 내용', -- 게시글 내용
	`DATE`  DATE         NOT NULL COMMENT '게시글 작성시간', -- 게시글 작성시간
	`UNO`   INTEGER      NOT NULL COMMENT '유저번호' -- 유저번호
)
COMMENT '게시판';

-- 게시판
ALTER TABLE `BOARD`
	ADD CONSTRAINT `PK_BOARD` -- 게시판 기본키
		PRIMARY KEY (
			`BNO` -- 게시글번호
		);

-- 팔로워팔로잉
CREATE TABLE `FOLLOWER` (
	`UNO`  INTEGER NOT NULL COMMENT 'toUser', -- toUser
	`UNO2` INTEGER NOT NULL COMMENT 'fromUser' -- fromUser
)
COMMENT '팔로워팔로잉';

-- 팔로워팔로잉
ALTER TABLE `FOLLOWER`
	ADD CONSTRAINT `PK_FOLLOWER` -- 팔로워팔로잉 기본키
		PRIMARY KEY (
			`UNO`,  -- toUser
			`UNO2`  -- fromUser
		);

-- 좋아요
CREATE TABLE `LIKE` (
	`LNO` INTEGER NOT NULL COMMENT '좋아요번호', -- 좋아요번호
	`WNO` INTEGER NOT NULL COMMENT '위시번호', -- 위시번호
	`UNO` INTEGER NOT NULL COMMENT '유저번호' -- 유저번호
)
COMMENT '좋아요';

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

-- 댓글
CREATE TABLE `COMMENT` (
	`CONO` INTEGER      NOT NULL COMMENT '댓글번호', -- 댓글번호
	`WNO`  INTEGER      NOT NULL COMMENT '위시번호', -- 위시번호
	`UNO`  INTEGER      NOT NULL COMMENT '유저번호', -- 유저번호
	`CONT` VARCHAR(255) NOT NULL COMMENT '댓글내용', -- 댓글내용
	`DATE` DATE         NOT NULL COMMENT '댓글작성시간' -- 댓글작성시간
)
COMMENT '댓글';

-- 댓글
ALTER TABLE `COMMENT`
	ADD CONSTRAINT `PK_COMMENT` -- 댓글 기본키
		PRIMARY KEY (
			`CONO` -- 댓글번호
		);

-- 카테고리
CREATE TABLE `CATEGORY` (
	`CNO`  INTEGER     NOT NULL COMMENT '카테고리번호', -- 카테고리번호
	`NAME` VARCHAR(50) NOT NULL COMMENT '위시폴더명', -- 위시폴더명
	`UNO`  INTEGER     NOT NULL COMMENT '유저번호' -- 유저번호
)
COMMENT '카테고리';

-- 카테고리
ALTER TABLE `CATEGORY`
	ADD CONSTRAINT `PK_CATEGORY` -- 카테고리 기본키
		PRIMARY KEY (
			`CNO` -- 카테고리번호
		);

-- 담아가기
CREATE TABLE `SEND` (
	`SNO` INTEGER NOT NULL COMMENT '담아가기 번호', -- 담아가기 번호
	`UNO` INTEGER NOT NULL COMMENT '유저번호', -- 유저번호
	`WNO` INTEGER NOT NULL COMMENT '위시번호' -- 위시번호
)
COMMENT '담아가기';

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

-- 태그
CREATE TABLE `TAG` (
	`TNO`  INTEGER     NOT NULL COMMENT '태그번호', -- 태그번호
	`NAME` VARCHAR(50) NOT NULL COMMENT '위시태그이름' -- 위시태그이름
)
COMMENT '태그';

-- 태그
ALTER TABLE `TAG`
	ADD CONSTRAINT `PK_TAG` -- 태그 기본키
		PRIMARY KEY (
			`TNO` -- 태그번호
		);

-- 유저&태그
CREATE TABLE `USER_TAG` (
	`UNO` INTEGER NOT NULL COMMENT '유저번호', -- 유저번호
	`TNO` INTEGER NOT NULL COMMENT '태그번호' -- 태그번호
)
COMMENT '유저&태그';

-- 유저&태그
ALTER TABLE `USER_TAG`
	ADD CONSTRAINT `PK_USER_TAG` -- 유저&태그 기본키
		PRIMARY KEY (
			`UNO`, -- 유저번호
			`TNO`  -- 태그번호
		);

-- 위시리스트태그
CREATE TABLE `TABLE` (
	`WNO` INTEGER NOT NULL COMMENT '위시번호', -- 위시번호
	`TNO` INTEGER NOT NULL COMMENT '태그번호' -- 태그번호
)
COMMENT '위시리스트태그';

-- 위시리스트태그
ALTER TABLE `TABLE`
	ADD CONSTRAINT `PK_TABLE` -- 위시리스트태그 기본키
		PRIMARY KEY (
			`WNO`, -- 위시번호
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

-- 위시리스트태그
ALTER TABLE `TABLE`
	ADD CONSTRAINT `FK_WISH_TO_TABLE` -- 위시리스트 -> 위시리스트태그
		FOREIGN KEY (
			`WNO` -- 위시번호
		)
		REFERENCES `WISH` ( -- 위시리스트
			`WNO` -- 위시번호
		);

-- 위시리스트태그
ALTER TABLE `TABLE`
	ADD CONSTRAINT `FK_TAG_TO_TABLE` -- 태그 -> 위시리스트태그
		FOREIGN KEY (
			`TNO` -- 태그번호
		)
		REFERENCES `TAG` ( -- 태그
			`TNO` -- 태그번호
		);