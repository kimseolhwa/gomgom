/**
 * 
 */
$("#header").load("../header/header.html");
$("#footer").load("../footer/footer.html");
$("#user-profile").load("../profile/profile.html");


var getParameter = function(url) {
	var paramText = url.split("?")[1];
	var params = paramText.split("&");
	var pageParam = {};
	for(item of params) {
		var param = item.split("=");
		pageParam[param[0]] = param[1];
	}		
	return pageParam;
};

var friendNo = getParameter(document.location.href).fNo;
$('#profileUser').text(friendNo);

/* 로그인 체크 */
$.getJSON('/peekis/main/ajax/loginCheck.do')
	.done( function(resultObj) {
		console.log('로그인체크');
		console.log(resultObj);
		if(resultObj.ajaxResult.data != null){
			var loginUser = resultObj.ajaxResult.data
			$("#dropdown-color").text(loginUser.name);
			$("#loginUser-no").text(loginUser.uNo);		
			if(loginUser.pho != null){
				$("#pImg").attr("src", filePath + loginUser.pho);
			}
			userProfile();
		}else{
			location.href = contextRoot + "/auth/joinForm.html"
		}
	})
	.fail(function(){
		location.href = contextRoot + "/auth/joinForm.html"
	});
var uno = 0;
/* 유저정보 가져오기 */
function userProfile(){
	$.getJSON('/peekis/wish/ajax/userInfo.do', {fNo: friendNo}, function(resultObj) {
		console.log('유저정보 가져오기');
		console.log(resultObj);		
		$("#caCnt").text(resultObj.user.caCnt);
		$("#wishCnt").text(resultObj.user.wishCnt);
		$("#likeCnt").text(resultObj.user.likeCnt);
		$("#fCnt").text(resultObj.user.fCnt);
		$("#fCnt2").text(resultObj.user.fCnt2)
		$("#userName").text(resultObj.user.name);
		$("#profileUser").text(resultObj.user.uNo);
		if(resultObj.user.pho != null){
			$("#profile").attr("src", filePath + resultObj.user.pho);
		}else{
			$("#profile").attr("src", "../header/img/people.png");
		}
		categoryList();
		nextPage(1, friendNo);
		
	});
}
	
	
	
	
//*********************************************************************
// 카테고리 관련 스크립트
//*********************************************************************
var $draggable = $('.draggable').draggabilly();	  
var $container2 = $('.c_container');
$container2.flickity({
   cellAlign: 'left',
   contain: true
});	    
var sort2 = function(){
	$container2.imagesLoaded(function() {
		$container2.flickity();
	});
}
	    
$('#filters').on('click', '.category', function() {
	var filterValue = $(this).attr('data-filter');
	$container.isotope({
		filter : filterValue
	});
});
function categoryList() {
	$.getJSON('/peekis/category/ajax/categoryList.do', {uno : friendNo}, function(resultObj) {
		console.log('카테고리 정보 불러오기');
		console.log(resultObj);
		for (var category of resultObj.data){
			var cloneContent = $(".cloneCategory > div").clone();
				cloneContent.addClass(category.cNo+"").attr('data-filter', ".cNo"+category.cNo);
				cloneContent.find('.categoryName').html(category.name);
				cloneContent.find('.cno').val(category.cNo);
				if(category.path1 != null){
					var path = category.path1;
					if(path.startsWith('http://') == false){
						path = filePath + path;
					}
					cloneContent.find('.path1').attr('src', path);
					var path = category.path2;
					if(path.startsWith('http://') == false){
						path = filePath + path;
					}
					cloneContent.find('.path2').attr('src', path);
				}
				
				$items = $(cloneContent);
				$container2.append( $items ).flickity( 'append', $items );	
		  	}
		 sort2();
	});
}




//*****************************************************
//위시리스트 관련 스크립트
//*****************************************************	

var $container = $('.item_container');
$container.isotope({
	itemSelector : '.item',
	percentPosition : true
});
  
var sort = function(){
	$container.imagesLoaded(function() {
	$container.isotope();
	});
}


/* 위시리스트 목록 불러오기  */		     
$(window).scroll(function(){
	var scrollHeight = $(window).scrollTop() + $(window).height();
	var documentHeight = $(document).height();
	if(scrollHeight >= documentHeight -100){
		console.log("스크롤 이벤트 발생");
		var pageNo = Number($('#pageNo').text()) +1;
		nextPage(pageNo, friendNo);
	}
});
      
function nextPage(pageNo, friendNo){
	$.getJSON('/peekis/main/ajax/friendList.do',{pageNo : pageNo, fNo : friendNo}, function(resultObj) {
		console.log('페이지 불러오기');
		console.log(resultObj);
		for (var wish of resultObj.data){
			$('#pageNo').text(pageNo);
			var cloneContent = $('.cloneMainContents > div').clone();
			cloneContent.addClass(wish.no+""+("  cNo"+wish.cno));
			cloneContent.find('.no').val(wish.no);
			cloneContent.find('.uno').val(wish.uno);
			var path = wish.path;
			if(path.startsWith('http://') == false){
				path = filePath + path;
			}
			cloneContent.find('img:first').attr('src', path);
			if (wish.likeSts == 1){
				cloneContent.find('.undoheart').css('display','block');
				cloneContent.find('.heart').css('display','none');
			}
			if (wish.sendSts == 1){
				cloneContent.find('.plus').attr('status',true);
			}
			if(wish.userPho==null){
				cloneContent.find('.userPho').attr('src', '../header/img/profileAvatar.jpg');
			}else{
				cloneContent.find('.userPho').attr('src', filePath + wish.userPho);
			}
			cloneContent.find('.user_id').html(wish.userName);
			cloneContent.find('.user_wish').html(wish.categoryName);
  			//라이크 개수
  			cloneContent.find('#likeAmount').text(wish.numOflNo);
			$items = $(cloneContent);
			$container.append( $items ).isotope( 'appended', $items );
			$items.draggable({
				revert : true
			});
		}
		sort();
	});
}


	
/* 좋아요 토글 이벤트 */
$(document).on('click', '.heart', function(){
	console.log('좋아요 이벤트 발생');
	var wishNo = $(this).closest('.item').find('.no').val();
	var uNo = $('#loginUser-no').text();
	var	numOfLikeval =	$(this).find("#likeAmount").text();
	var numOfLike = $(this).next("div").find("#likeAmount");
    $.getJSON('/peekis/main/ajax/addLike.do', {wno : wishNo, uno : uNo}, function(resultObj) {
	    var result = resultObj.ajaxResult;
	    if(result.status == 'success'){
			$('.' + wishNo).find('.heart').toggleClass('toggle').show().fadeToggle(1000),
		    setTimeout(function(){
		    $('.' + wishNo).find('.heart').toggleClass('toggle');  
			},1000), 
		    $('.' + wishNo).find('.undoheart').hide().fadeToggle(1000);
			numOfLike.text(Number(numOfLikeval)+1);
	   }else{
	    	swal('좋아요 추가에 실패하였습니다.');
	   }
   });
});

$(document).on('click', '.undoheart', function(){
	console.log('좋아요 취소이벤트 발생');
	var wishNo = $(this).closest('.item').find('.no').val();
	var uNo = $('#loginUser-no').text();
	var numOfLikeval = $(this).find("#likeAmount").text();
	var numOfLike = $(this).prev("div").find("#likeAmount");
    $.getJSON('/peekis/main/ajax/deleteLike.do', {wno : wishNo, uno : uNo}, function(resultObj) {
    	var result = resultObj.ajaxResult;
    	console.log(result);
    	if(result.status == 'success'){
	    	$('.' + wishNo).find('.undoheart').toggleClass('toggle').show().fadeToggle(1000),
	        setTimeout(function(){
	        $('.' + wishNo).find('.undoheart').toggleClass('toggle');  
			},1000), 
	        $('.' + wishNo).find('.heart').hide().fadeToggle(1000);
	    	numOfLike.text(Number(numOfLikeval)-1);
    	}else{
    		swal('좋아요 삭제에 실패하였습니다.');
    	}
    });
});


/* 게시글 담아가기 */
$(document).on("click", ".plus", function(){
var wishNo = $(this).closest('.item').find('.no').val();
var uNo = $('#loginUser-no').text();
if($(this).attr('status') == 'true'){
	swal("이미 담아가기 한 위시리스트입니다!", "한번만 담아기가 가능합니다", "error");
}else{
	$.getJSON('/peekis/main/ajax/send.do', {wno : wishNo, uno : uNo}, 
		function( resultObj ) {
			$('.' + wishNo).find('.plus').attr('status',true);
			swal("담아가기 성공!", "해당 아이템을 담았습니다!", "success");
			console.log(resultObj);
		});
}
});



/* 팔로우 하기 */
$(document).on("click", ".follow", function(){
	var wishUserNo = $(this).closest('.modal-content').find('.uno').text();
	var uNo = $('#loginUser-no').text();
	if($(".follow").text() == "팔로우"){
		$.getJSON('/peekis/main/ajax/follower.do', {wishUserNo : wishUserNo, uno : uNo}, 
			function( resultObj ) {
				swal("팔로우 성공!", "유저와 친구가 되었습니다!", "success");
				$(".follow").text("언팔로우");
				console.log(resultObj);
			});
	}else if($(".follow").text() == "언팔로우"){
		$.getJSON('/peekis/main/ajax/unfollower.do', {wishUserNo : wishUserNo, uno : uNo}, 
			function( resultObj ) {
				swal("팔로우 삭제!", "친구가 삭제되었습니다!", "error");
				$(".follow").text("팔로우");
					console.log(resultObj);
			});
   		}
});




var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('footer').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    if (st > lastScrollTop && st > navbarHeight){
        $('footer').removeClass('nav-down').addClass('nav-up');
        $('#demoTop').show();
        
    } else {
        if(st + $(window).height() < $(document).height()) {
            $('footer').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}



