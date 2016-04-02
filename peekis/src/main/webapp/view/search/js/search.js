/**
 * 
 */

$("#header").load("../header/header.html");
$("#footer").load("../footer/footer.html");

/* 파라미터값 꺼내기 */
var getParameter = function(url) {
	var paramText = decodeURI(url).split("?")[1];
		return paramText;
};
var pageParam = getParameter(document.location.href);
var uno;
/* 로그인 체크 */
$.getJSON('/peekis/main/ajax/loginCheck.do')
	.done( function(resultObj) {
		console.log('로그인체크');
		console.log(resultObj);
		if(resultObj.ajaxResult.data != null){
			var loginUser = resultObj.ajaxResult.data
			$("#dropdown-color").text(loginUser.name);
			uno = loginUser.uNo;
			$("#loginUser-no").text(uno);		
			if(loginUser.pho != null){
				$("#pImg").attr("src", filePath + loginUser.pho);
			}
			nextPage(1, pageParam);
		}else{
			location.href = contextRoot + "/auth/joinForm.html"
		}
	})
	.fail(function(){
		location.href = contextRoot + "/auth/joinForm.html"
	});

	/* 이미지 정렬 */
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
		
		
	/* 리스트 불러오기 */
	$(window).scroll(function(){
		var scrollHeight = $(window).scrollTop() + $(window).height();
		var documentHeight = $(document).height();
		if(scrollHeight >= documentHeight -150){
	    	console.log('스크롤 이벤트 발생');
        	var pageNo = Number($('#pageNo').text()) +1;
	    	nextPage(pageNo, pageParam);
	    }
	});
	       
	
	function nextPage(pageNo, pageParam){
		//uno = $("#loginUser-no").text();		
		$.getJSON('/peekis/main/ajax/searchList.do',{pageNo : pageNo, tag : pageParam, uno: uno}, function(resultObj) {
			console.log('리스트 불러오기');
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
					cloneContent.find('img:first').attr('src', path);
					if (wish.likeSts == 1){
						cloneContent.find('.undoheart').css('display','block');
						cloneContent.find('.heart').css('display','none');
					}
					if (wish.sendSts == 1){
						cloneContent.find('.plus').attr('status',true);
					}
					if (wish.uno == uno){
						cloneContent.find('.plus').css('opacity',0);
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
		  	}
			sort();
		});
	   }
     
	
	
	/* 좋아요 추가 이벤트 */
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

	/* 좋아요 삭제 이벤트 */
	$(document).on('click', '.undoheart', function(){
		console.log('좋아요 취소이벤트 발생');
		var wishNo = $(this).closest('.item').find('.no').val();
		var uNo = $('#loginUser-no').text();
		var numOfLikeval = $(this).find("#likeAmount").text();
		var numOfLike = $(this).prev("div").find("#likeAmount");
		
		$.getJSON('/peekis/main/ajax/deleteLike.do', {wno : wishNo, uno : uNo}, function(resultObj) {
			var result = resultObj.ajaxResult;
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
	
	
	
	
	$('#filters').on('click', 'button', function() {
		var filterValue = $(this).attr('data-filter');
		$container.isotope({
			filter : filterValue
		});
	});

	$(".btn-pref .btn").click( function() {
		$(".btn-pref .btn").removeClass("btn-orange").addClass("btn-default");
		$(this).removeClass("btn-default").addClass("btn-orange");
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

