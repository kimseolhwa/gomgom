/**
 * 
 */


$(document).ready(function() {
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
	$("#friendNo").text(friendNo);
    
	/* 위시리스트 목록 불러오기  */		
	nextPage(1, friendNo);
          
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
			$("#UserNo").text(resultObj.loginUser.uNo);
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
  				$items = $(cloneContent);
  				$container.append( $items ).isotope( 'appended', $items );			
			}
			sort();
  			for (var like of resultObj.like){
  				$('.' + like).find('.undoheart').css('display','block');
  				$('.' + like).find('.heart').css('display','none');
  			}  			
  			for (var send of resultObj.send){
  				$('.' + send).find('.plus').attr('status',true);
  			}
   		});
	}
	
	
	/* 상세정보 가져오기 */
	$container.on( 'click', '.detail', function() {
		var wishNo = $(this).closest('.item').find('.no').val();
		var uNo = Number($('#UserNo').text());
				
		$.getJSON('/peekis/main/ajax/detail.do', {no : wishNo, uno: uNo}, function( resultObj ) {
			var wish = resultObj.data;
			var cList = resultObj.commentList;
			console.log(wish);				
			if(cList.length>0){					
				console.log("cList : ", cList);				
				var html=""
				for(var i=0; i<cList.length;i++){			
					if(uNo==cList[i].uNo){
						if(cList[i].userPho==null){
							html += "<img src='../header/img/profileAvatar.jpg' class='img-circle' style='height: 30px; width: 30px;'></img>"
						    html += "&nbsp;<a>"+ cList[i].userName +"</a>"
						    html += "&nbsp;<span>"+ cList[i].cont +"</span>&nbsp;<span id='commentDelBtn'> &times; </span></br>"
						}else{
						    html += "<img src="+ filePath + cList[i].userPho +" class='img-circle' style='height: 30px; width: 30px;'></img>"
						    html += "&nbsp;<a>"+ cList[i].userName +"</a>"
						    html += "&nbsp;<span>"+ cList[i].cont +"</span>&nbsp;<span id='commentDelBtn'> &times; </span></br>"
						}
					}
					else{
						if(cList[i].userPho==null){
							html += "<img src='../header/img/profileAvatar.jpg' class='img-circle' style='height: 30px; width: 30px;'></img>"
						    html += "&nbsp;<a>"+ cList[i].userName +"</a>"
						    html += "&nbsp;<span>"+ cList[i].cont +"</span></br>"
						}else{
						    html += "<img src="+ filePath + cList[i].userPho +" class='img-circle' style='height: 30px; width: 30px;'></img>"
						    html += "&nbsp;<a>"+ cList[i].userName +"</a>"
						    html += "&nbsp;<span>"+ cList[i].cont +"</span></br>"
						}
					}
				}				
				$("#tab1").html(html);				
			}
				
			$("#detailmodal-no").html( wish.no );
			$("#detailmodal-uno").html( wish.uno );
			var path = wish.path;
			if(path.startsWith('http://') == false){
				path = filePath + path;
			}							
			$("#detailmodal-pro").attr('src', filePath + wish.userPho);
			$(".modal-user_id").html(wish.userName);	
			$(".modal-user_wish").html(wish.categoryName);	
			$("#detailmodal-image").attr("src", path );
			$("#detailmodal-title").html( wish.title );			
			$("#detailmodal-content").html( wish.content );
			$("#detailmodal-price").html('&#8361;&nbsp;' + $.number(wish.price));
			$("#detailmodal-url").attr("onclick", "window.open('" + wish.url + "')");
			$("#detailmodal-tag").html("");
			$('#detailmodal').modal();
			$(".follow").css("display","block");
			if(resultObj.followerCheck == 1 ){
				$(".follow").text("언팔로우");
			}
			if($("#detailmodal-uno").text() == $('#UserNo').text()){
				$(".follow").css("display","none");
			}
		});
	});
	
	
		
	/* 좋아요 토글 이벤트 */
	$(document).on('click', '.heart', function(){
		console.log('좋아요 이벤트 발생');
		var wishNo = $(this).closest('.item').find('.no').val();
		var uNo = $('#UserNo').text();
	    $.getJSON('/peekis/main/ajax/addLike.do', {wno : wishNo, uno : uNo}, function(resultObj) {
		    var result = resultObj.ajaxResult;
		    if(result.status == 'success'){
				$('.' + wishNo).find('.heart').toggleClass('toggle').show().fadeToggle(1000),
			    setTimeout(function(){
			    $('.' + wishNo).find('.heart').toggleClass('toggle');  
				},1000), 
			    $('.' + wishNo).find('.undoheart').hide().fadeToggle(1000);
		   }else{
		    	swal('좋아요 추가에 실패하였습니다.');
		   }
	   });
	});

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
	    	}else{
	    		swal('좋아요 삭제에 실패하였습니다.');
	    	}
	    });
	});
	
	
	
	
	/* 팔로우 하기 */
	$(document).on("click", ".follow", function(){
		var wishUserNo = $(this).closest('.modal-content').find('.uno').text();
		var uNo = $('#UserNo').text();
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
	
});