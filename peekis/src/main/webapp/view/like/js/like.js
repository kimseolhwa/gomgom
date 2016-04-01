/**
 * 
 */
$("#header").load("../header/header.html");
$("#footer").load("../footer/footer.html");
$("#user-profile").load("../profile/profile.html");
	
var $container = $('.item_container');
$container.isotope({
   itemSelector : '.item',
   percentPosition : true,
   masonry: { columnWidth : 1, rowHeight: 1 }
});

var sort = function(){
  $container.imagesLoaded(function() {
  	$container.isotope();
  });
}
    
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

var friendNo = 0;
if(document.location.href.indexOf("fNo") > 0){
	friendNo = getParameter(document.location.href).fNo;
	$('body').off('click', '.undoheart');
}
	
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
			nextPage(1);
		}else{
			location.href = contextRoot + "/auth/joinForm.html"
		}
	})
	.fail(function(){
		location.href = contextRoot + "/auth/joinForm.html"
	});

/* 유저정보 가져오기 */
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
	friendNo = resultObj.user.uNo;
	if(resultObj.user.pho != null){
		$("#profile").attr("src", filePath + resultObj.user.pho);
	}else{
		$("#profile").attr("src", "../header/img/people.png");
	}	
});
	
/* 리스트 불러오기 */
nextPage(1);

$(window).scroll(function(){
	var scrollHeight = $(window).scrollTop() + $(window).height();
	var documentHeight = $(document).height();
	if(scrollHeight >= documentHeight -100){
		console.log('스크롤 이벤트 발생');
		var pageNo = Number($('#pageNo').text()) +1;
		nextPage(pageNo);
	}
});
  
function nextPage(pageNo){
	 $.getJSON('/peekis/wish/ajax/likeList.do',{pageNo : pageNo, fNo: friendNo}, function(resultObj) {
		console.log('페이지 불러오기');
		console.log(resultObj);
		for (var wish of resultObj.data){
			  $('#pageNo').text(pageNo);
			  var cloneContent = $('.cloneMainContents > div').clone();
				cloneContent.addClass(wish.no+'');
				cloneContent.find('.no').val(wish.no);
				cloneContent.find('.uno').val(wish.uno);
				var path = wish.path;
				if(path.startsWith('http://') == false){
					path = filePath + path;
				}
				if(wish.uno == $("#loginUser-no").text()){
					cloneContent.find('.plus').css('opacity', '0');
				}
				if(wish.sendSts == 1){
					cloneContent.find('.plus').attr('status','true')
				}
				cloneContent.find('img:first').attr('src', path);
				cloneContent.find('.userPho').attr('src', filePath + wish.userPho);
				cloneContent.find('.user_id').html(wish.userName);
				cloneContent.find('.user_wish').html(wish.categoryName);
				cloneContent.find('.undoheart').css('display','block');
				cloneContent.find('.heart').css('display','none');
				cloneContent.find('#likeAmount').text(wish.numOflNo);
				$items = $(cloneContent);
				$container.append( $items ).isotope( 'appended', $items );			
		  	}
		sort();
		if(document.location.href.indexOf("fNo") > 0){
			$('.undoheart').attr("disabled", true);
		}
	});
}



/* 친구페이지로 넘어가기 */
$(document).on('click', '.user_id', function (){
	var userNo = $(this).closest('.item').find('.uno').val();
	var loginUser = $('#loginUser-no').text();
	if(userNo == loginUser){
		location.href = contextRoot + "/view/myList/myList2.html";
	}else{
		location.href = contextRoot + "/view/user/user.html?fNo=" + userNo;
	}
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
				if(uNo == $('#profileUser').text()){
					$("#wishCnt").text( Number($('#wishCnt').text()) +1);
				}
				$('.' + wishNo).find('.plus').attr('status',true);
				swal("담아가기 성공!", "해당 아이템을 담았습니다!", "success");
				console.log(resultObj);
			});
	}
});




/* 좋아요 취소 */
if(document.location.href.indexOf("fNo") < 0){
	$('.undoheart').css("cursor","pointer");
	$(document).on('click', '.undoheart', function(){
		console.log('좋아요 취소이벤트 발생');
		var wishNo = $(this).closest('.item').find('.no').val();
		var uNo = $('#loginUser-no').text();
		var numOfLikeval = $(this).find("#likeAmount").text();
		var numOfLike = $(this).prev("div").find("#likeAmount");
		
    	$.getJSON('/peekis/main/ajax/deleteLike.do', {wno : wishNo, uno : uNo}, function(resultObj) {
    		var result = resultObj.ajaxResult;
    		//console.log(result);
			if(result.status == 'success'){
        		$('.' + wishNo).find('.undoheart').toggleClass('toggle').show().fadeToggle(1000),
        		setTimeout(function(){
        			$('.' + wishNo).find('.undoheart').toggleClass('toggle');  
				   },1000), 
        		$('.' + wishNo).find('.heart').hide().fadeToggle(1000);
        		setTimeout(function(){
        			numOfLike.text(Number(numOfLikeval)-1);
	        		$container.isotope( 'remove', $("." + wishNo) ).isotope();
					$("#likeCnt").text( Number($('#likeCnt').text()) -1);
        		},1000);
			}else{
				swal('좋아요 삭제에 실패하였습니다.');
			}
			
		});
    	
	});
}





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
