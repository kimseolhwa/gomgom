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

		        
/* 상세정보 가져오기 */
$container.on('click', '.detail', function() {
	var wishNo = $(this).closest('.item').find('.no').val();
	var uNo = Number($('#loginUser-no').text());
	
	$.getJSON('/peekis/main/ajax/detail.do', {no : wishNo, uno: uNo} , 
		function( resultObj ) {
			console.log('상세정보 불러오기');
			console.log(resultObj);
			var wish = resultObj.data;
			var cList = resultObj.commentList;
			var likeList = resultObj.likeList;
			var sendList = resultObj.sendList;
			var tags = resultObj.tags;
			
			// 태그 이름 
			if(tags != null){
				for(var i=0; i<tags.length; i++){
					var tagClone = $(".tagDiv a:first").clone();
					tagClone.text("#" + tags[i]);
					tagClone.attr('href', contextRoot + "/view/search/search.html?" + tags[i]);
					$("#tagCaptionText").append(tagClone);
				}
			}
			
			//댓글 탭
			$("#commentLength").text(cList.length);
			for(var i=0; i<cList.length;i++){
				var comClone = $('.commentDiv>div').clone();
				if(uNo!=cList[i].uNo){
					comClone.find('#commentDelBtn').css('display','none');
				}else{
					comClone.find('#commentDelBtn').css('display','inline');
				}
				if(cList[i].userPho==null){
					comClone.find('.img-circle').attr('src', '../header/img/profileAvatar.jpg');
				}else{
					comClone.find('.img-circle').attr('src',filePath + cList[i].userPho);
				}
				comClone.find('.comUserID').text(cList[i].userName);
				comClone.find('.comCont').text(cList[i].cont);
				comClone.find('#commentNum').val(cList[i].coNo);
				$("#tab1").append(comClone);
			}
			
			//담아가기 탭
			$("#sendLength").text(sendList.length);
			for(var i=0; i<sendList.length;i++){
				var sendClone = $('.sendDiv>span').clone();
				if(sendList[i].pho==null){
					sendClone.find('.img-circle').attr('src', '../header/img/profileAvatar.jpg');
				}else{
					sendClone.find('.img-circle').attr('src',filePath + sendList[i].pho);
				}
				sendClone.find('.sendUserID').text(sendList[i].name);
				sendClone.find('#sendUserNo').val(sendList[i].uNo);
				$("#tab2").append(sendClone);
			}
			
			//좋아요 탭
			$("#likeLength").text(likeList.length);
			for(var i=0; i<likeList.length;i++){
				var likeClone = $('.likeDiv>span').clone();
				if(likeList[i].pho==null){
					likeClone.find('.img-circle').attr('src', '../header/img/profileAvatar.jpg');
				}else{
					likeClone.find('.img-circle').attr('src',filePath + likeList[i].pho);
				}
				likeClone.find('.likeUserID').text(likeList[i].name);
				likeClone.find('#likeUserNo').val(likeList[i].uNo);
				$("#tab3").append(likeClone);
			}
			
			$("#detailmodal-no").html( wish.no );
			$("#detailmodal-uno").html( wish.uno );
			
			if(wish.userPho==null){
				$(".detailmodal-pro").attr('src','../header/img/profileAvatar.jpg');
			}else{
				$(".detailmodal-pro").attr('src', filePath + wish.userPho);
			}
			
			// 댓글입력 폼 사용자사진
			if(resultObj.sessionUser.pho==null){
				$(".comInputUserPho").attr('src','../header/img/profileAvatar.jpg');
			}else{
				$(".comInputUserPho").attr('src', filePath + resultObj.sessionUser.pho);
			}
			
			$(".modal-user_id").html(wish.userName);	
			$(".modal-user_wish").html(wish.categoryName);	
			
			var path = wish.path;
			if(path.startsWith('http://') == false){
				path = filePath + path;
			}
			$("#detailmodal-image").attr("src", path );
			$("#detailmodal-title").html( wish.title );			
			$("#detailmodal-content").html( wish.content );
			$("#detailmodal-price").html('&#8361;&nbsp;' + $.number(wish.price));
			$("#detailmodal-url").attr("onclick", "window.open('" + wish.url + "')");
			$("#detailmodal-tag").html("");
			$('#detailmodal').modal();
			$(".follow").css("display","block");
			if(resultObj.followerCheck == 1 ){
				$(".follow").html('<i class="fa fa-check"></i>　팔로잉');
			}
			if($("#detailmodal-uno").text() == $('#loginUser-no').text()){
				$(".follow").css("display","none");
			}
		});
});


/* 댓글 삭제 - ajax로 가져온 html을 click이벤트 */
$('body').on('click', "#commentDelBtn", function(){
	var coNo = $(this).next("#commentNum").val();
	console.log("coNo : " , coNo)
	var commentLength = $("#commentLength").text();
	$.ajax({
		 type: "POST",
		 dataType:"JSON",
		 url : contextRoot + "/main/ajax/delComment.do",
		 data:{'coNo': coNo}
	})
	// 댓글삭제 UI
	$(this).parent("#comdelsel").remove();
	$("#commentLength").text(Number(commentLength)-1)
	
});
				
/* 상세페이지 - 댓글 입력 */
$("#insertComment").on("click",function(){
	var wNo = $("#detailmodal-no").text();
	var comment = $("#commentText").val();
	$("#commentText").val(""); 
	console.log("wNo: " , wNo);
	$.ajax({
		 type: "POST",
		 dataType:"JSON",
		 url : contextRoot + "/main/ajax/addComment.do",
		 data:{'cont': comment, 'wNo' : wNo}
	}).done(function(resultObj) {
		console.log(resultObj);
		var data = resultObj.ajaxResult.data;
		var comClone = $('.commentDiv>div').clone();
		if(data.join.pho==null){
			comClone.find('.img-circle').attr('src', '../header/img/profileAvatar.jpg');
		}else{
			comClone.find('.img-circle').attr('src', filePath + data.join.pho);
		}
		comClone.find('.comUserID').text(data.join.name);
		comClone.find('.comCont').text(data.comment.cont);
		comClone.find('#commentNum').val(data.comment.coNo);
		$("#tab1").prepend(comClone);
		$("#commentLength").text(Number($("#commentLength").text())+1);
	})
	
})

		      
/* 상세페이지- 담아가기 버튼 */  
$(document).on("click", "#detailSendBtn", function(){
	var wishNo  = Number($('#detailmodal-no').text());
	var uNo = $('#loginUser-no').text();
	var detailSendBtn = $(this);
	var mainSendBtn = $('.' + wishNo).find('.plus');
	
	if($(this).attr('status') == 'true' || mainSendBtn.attr('status') == 'true'){
		swal("이미 담아가기 한 위시리스트입니다!", "한번만 담아기가 가능합니다", "error");
	}else{
		$.getJSON('/peekis/main/ajax/send.do', {wno : wishNo, uno : uNo}, 
			function( resultObj ) {
			    detailSendBtn.attr('status',true);
				swal("담아가기 성공!", "해당 아이템을 담았습니다!", "success");
				var data = resultObj.ajaxResult.data;
				console.log(data);
				var sendClone = $('.sendDiv>span').clone();
				if(data.pho==null){
					sendClone.find('.img-circle').attr('src', '../header/img/profileAvatar.jpg');
				}else{
					sendClone.find('.img-circle').attr('src', filePath + data.pho);
				}
				sendClone.find('.sendUserID').text(data.name);
				sendClone.find('#sendUserNo').val(data.uNo);
				$("#tab2").prepend(sendClone);
				
				$("#commentLength").text(Number($("#commentLength").text())+1);				
			});
	    	}
  })
  	
  
/* 상세페이지- 좋아요 버튼 */  
$(document).on("click", "#detailLikeBtn", function(){
	  var wishNo  = Number($('#detailmodal-no').text());
	  var uNo = $('#loginUser-no').text();
	  
	  if($('.' + wishNo).find('.undoheart').css('display') == 'block'){
		  swal("이미 좋아요 한 위시리스트입니다!", "한번만 좋아요가 가능합니다", "error");
	  }else{
		  $.getJSON('/peekis/main/ajax/addLike.do', {wno : wishNo, uno : uNo}, function(resultObj) {
			  var result = resultObj.ajaxResult;
				if(result.status == 'success'){
	        		$('.' + wishNo).find('.heart').toggleClass('toggle').show().fadeToggle(1000),
	        		setTimeout(function(){
	        			$('.' + wishNo).find('.heart').toggleClass('toggle');  
					   },1000), 
	        		$('.' + wishNo).find('.undoheart').hide().fadeToggle(1000);
	        		
	        		$("#likeLength").text(Number($("#likeLength").text()) +1);
	        		var numOfLikeval = $('.'+wishNo).find("#likeAmount").text();
	        		$('.'+wishNo).find("#likeAmount").text(Number(numOfLikeval)+1);
	    			
    				var likeClone = $('.likeDiv>span').clone();
    				
    				likeClone.find('.img-circle').attr('src', $("#pImg").attr("src"));
    				likeClone.find('.likeUserID').text($("#dropdown-color").text());
    				likeClone.find('#likeUserNo').val($("#loginUser-no").text());
    				$("#tab3").append(likeClone);      		
				}else{
					swal('좋아요 추가에 실패하였습니다.');
				}
			});
	  }
})
  
  
  
  
    
    /* 팔로우 하기 */
     $(document).on("click", ".follow", function(){
    	var wishUserNo = $(this).closest('.modal-content').find('.uno').text();
    	var uNo = $('#loginUser-no').text();
    	console.log($(".follow").text());
    	if($(".follow").text().indexOf("팔로우")>0){
			$.getJSON('/peekis/wish/ajax/followInsert.do', {fno : wishUserNo, uno : uNo}, function( resultObj ) {
					if(resultObj.ajaxResult.status == 'success'){
						swal("팔로우 성공!", "유저와 친구가 되었습니다!", "success");
						$(".follow").html('<i class="fa fa-check"></i>　팔로잉');
					}
				});
    	}else{
			$.getJSON('/peekis/wish/ajax/followDelete.do', {fno : wishUserNo, uno : uNo}, function( resultObj ) {
				if(resultObj.ajaxResult.status == 'success'){
					swal("팔로우 삭제!", "친구가 삭제되었습니다!", "error");
					$(".follow").html('<i class="fa fa-plus">　팔로우</i>');
				}
			});
    	}
    });
    


$('#detailmodal').on('hidden.bs.modal', function (e) {
	$("#tab1 div").remove();
	$("#tab2 span").remove();
	$("#tab3 span").remove();
	$("#tagCaptionText a").remove();
	$("#tab1").addClass('active');
	$("#tab1").addClass('in');
	$("#tab2").removeClass('active');
	$("#tab2").removeClass('in');
	$("#tab3").removeClass('active');
	$("#tab3").removeClass('in');
})
						        