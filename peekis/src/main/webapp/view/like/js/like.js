/**
 * 
 */


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
		var pageParam = paramText.split("=")[1];
		return pageParam;
	};
	
	/* 리스트 불러오기 */
	var friendNo = 0;
    if(document.location.href.indexOf("fNo") > 0){
		friendNo = getParameter(document.location.href);
		$('body').off('click', '.undoheart');
	}
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
		var fno = $("#profileUser").text();
		alert(fno);
		 $.getJSON('/peekis/wish/ajax/likeList.do',{pageNo : pageNo, fNo: fno}, function(resultObj) {
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
 					cloneContent.find('.userPho').attr('src', filePath + wish.userPho);
 					cloneContent.find('.user_id').html(wish.userName);
 					cloneContent.find('.user_wish').html(wish.categoryName);
 					cloneContent.find('.undoheart').css('display','block');
 					cloneContent.find('.heart').css('display','none');
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
    	var loginUser = $('#UserNo').text();
    	if(userNo == loginUser){
        	location.href = contextRoot + "/view/myList/myList2.html";
    	}else{
        	location.href = contextRoot + "/view/user/user.html?fNo=" + userNo;
    	}
    });


$(window).load(function(){
	if(document.location.href.indexOf("fNo") < 0){
		$('.undoheart').css("cursor","pointer");
		/* 좋아요 취소 */
		$(document).on('click', '.undoheart', function(){
			console.log('좋아요 취소이벤트 발생');
			var wishNo = $(this).closest('.item').find('.no').val();
			var uNo = $('#UserNo').text();
	    	$.getJSON('/peekis/main/ajax/deleteLike.do', {wno : wishNo, uno : uNo}, function(resultObj) {
	    		var result = resultObj.ajaxResult;
	    		console.log(result);
				if(result.status == 'success'){
	        		$('.' + wishNo).find('.undoheart').toggleClass('toggle').show().fadeToggle(1000),
	        		setTimeout(function(){
	        			$('.' + wishNo).find('.undoheart').toggleClass('toggle');  
					   },1000), 
	        		$('.' + wishNo).find('.heart').hide().fadeToggle(1000);
	        		setTimeout(function(){
		        		$container.isotope( 'remove', $("." + wishNo) ).isotope();
						$("#likeCnt").text( Number($('#likeCnt').text()) -1);
	        		},1000);
				}else{
					swal('좋아요 삭제에 실패하였습니다.');
				}
				
			});
	    	
		});
	}
})