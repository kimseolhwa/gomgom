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
			var wish = resultObj.data;
			var cList = resultObj.commentList;
			var likeList = resultObj.likeList;
			var sendList = resultObj.sendList;

			$("#tab1").html("");
			//코멘트 리스트
			if(cList.length>0){
			
			var html=""
			for(var i=0; i<cList.length;i++){
			
				if(uNo==cList[i].uNo){
					if(cList[i].userPho==null){
						html += "<div id='comdelsel'><img src='../header/img/profileAvatar.jpg' class='img-circle' style='height: 30px; width: 30px;'></img>"
					    html += "&nbsp;<a>"+ cList[i].userName +"</a>"
					    html += "&nbsp;<span>"+ cList[i].cont +"</span>&nbsp;<span id='commentDelBtn'>&times;</span>"
					    html += "<input type='hidden' value="+ cList[i].coNo + " id='commentNum'/></div>" 
					}else{
					    html += "<div id='comdelsel'><img src="+ filePath + cList[i].userPho +" class='img-circle' style='height: 30px; width: 30px;'></img>"
					    html += "&nbsp;<a>"+ cList[i].userName +"</a>"
					    html += "&nbsp;<span>"+ cList[i].cont +"</span>&nbsp;<span id='commentDelBtn'>&times;</span>"
					    html += "<input type='hidden' value="+ cList[i].coNo + " id='commentNum'/></div>" 
					}
				}
				else{
					if(cList[i].userPho==null){
						html += "<div id='comdelsel'><img src='../header/img/profileAvatar.jpg' class='img-circle' style='height: 30px; width: 30px;'></img>"
					    html += "&nbsp;<a>"+ cList[i].userName +"</a>"
					    html += "&nbsp;<span>"+ cList[i].cont +"</span>"
					    html += "<input type='hidden' value="+ cList[i].coNo + " id='commentNum'/></div>" 
					}else{
					    html += "<div id='comdelsel'><img src="+ filePath + cList[i].userPho +" class='img-circle' style='height: 30px; width: 30px;'></img>"
					    html += "&nbsp;<a>"+ cList[i].userName +"</a>"
					    html += "&nbsp;<span>"+ cList[i].cont +"</span>"
					    html += "<input type='hidden' value="+ cList[i].coNo + " id='commentNum'/></div>" 
					}
				}
			}
			
			$("#tab1").html(html)
			 
			}

			$("#tab2").html("")
			
			$("#sendLength").text(sendList.length);
			
			//담아가기한 사람 리스트 
			if(sendList.length>0){
				
				$("#sendLength").text(sendList.length);
				
				var html="";
				for(var i=0; i<sendList.length;i++){
				  if(sendList[i].pho==null){
					html += "<span id='likeUser'><img src='../header/img/profileAvatar.jpg' class='img-circle' style='height: 30px; width: 30px;'></img>"
				    html += "&nbsp;<a>"+ sendList[i].name +"</a></span>&nbsp;&nbsp;"
				    html += "<input type='hidden' value="+ sendList[i].uNo + " id='likeUserNo'/>"
				  }else{
					html += "<span id='likeUser'><img src="+ filePath + sendList[i].pho +" class='img-circle' style='height: 30px; width: 30px;'></img>"
				    html += "&nbsp;<a>"+ sendList[i].name +"</a></span>&nbsp;&nbsp;"
				    html += "<input type='hidden' value="+ sendList[i].uNo + " id='likeUserNo'/>"
					}
				}
				$("#tab2").html(html)
			}
			
			// 태그 이름 
			if(wish.tag!=null){
				$("#tagCaptionText a").text(wish.tag)
			}							
			
			$("#tab3").html("")
			//좋아요한 사람 리스트 							
			if(likeList.length>0){
				var html=""
				for(var i=0; i<likeList.length;i++){
				  if(likeList[i].pho==null){
					html += "<span id='likeUser'><img src='../header/img/profileAvatar.jpg' class='img-circle' style='height: 30px; width: 30px;'></img>"
				    html += "&nbsp;<a>"+ likeList[i].name +"</a></span>&nbsp;&nbsp;"
				    html += "<input type='hidden' value="+ likeList[i].uNo + " id='likeUserNo'/>"
				  }else{
					html += "<span id='likeUser'><img src="+ filePath + likeList[i].pho +" class='img-circle' style='height: 30px; width: 30px;'></img>"
				    html += "&nbsp;<a>"+ likeList[i].name +"</a></span>&nbsp;&nbsp;"
				    html += "<input type='hidden' value="+ likeList[i].uNo + " id='likeUserNo'/>"
				}
			}
				$("#tab3").html(html)
		}
			
			//댓글 개수
			$("#commentLength").text(cList.length);
			
			//좋아요 개수 
			$("#likeLength").text(resultObj.like.numOfLno);
			
			$("#detailmodal-no").html( wish.no );
			$("#detailmodal-uno").html( wish.uno );
			var path = wish.path;
			if(path.startsWith('http://') == false){
				path = filePath + path;
			}
			
			if(wish.userPho==null){
				$(".detailmodal-pro").attr('src','../header/img/profileAvatar.jpg');
			}else{
				$(".detailmodal-pro").attr('src', filePath + wish.userPho);
			}
			
			if(resultObj.sessionUser.pho==null){
				$(".comInputUserPho").attr('src','../header/img/profileAvatar.jpg');
			}else{
				$(".comInputUserPho").attr('src', filePath + resultObj.sessionUser.pho);
			}
			
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
	$(this).parent("#comdelsel").remove()
	$("#commentLength").text(Number(commentLength)-1)
	
});
				
/* 댓글 입력 */
$("#insertComment").on("click",function(){
	var wNo = $("#detailmodal-no").text();
	var comment = $("#commentText").val();
	$("#commentText").val(""); 
	console.log("wNo: " , wNo)
	var commentLength = $("#commentLength").text();
	console.log("commentLength : " ,commentLength)
	$.ajax({
		 type: "POST",
	  dataType:"JSON",
	  url : contextRoot + "/main/ajax/addComment.do",
	  data:{'cont': comment, 'wNo' : wNo}
	}).done(function(resultObj) {
		console.log(resultObj.ajaxResult.data.join.name)	
		console.log(resultObj.ajaxResult.data.comment.cont)
		console.log(resultObj.ajaxResult.data.comment.coNo)
				
		if(resultObj.ajaxResult.data.join.pho==null){
	  $("#tab1").prepend("<div id='comdelsel'><img src=../header/img/profileAvatar.jpg class='img-circle'>" +
	   "&nbsp;<a>"+ resultObj.ajaxResult.data.join.name +"</a>"+
	   "&nbsp;<span>"+ resultObj.ajaxResult.data.comment.cont +"</span>&nbsp;<span id='commentDelBtn'>&times;</span>" +
	"<input type='hidden' value="+ resultObj.ajaxResult.data.comment.coNo + " id='commentNum'/></div>" );
		}else{
	  $("#tab1").prepend("<div id='comdelsel'><img src=" + filePath + resultObj.ajaxResult.data.join.pho + " class='img-circle'>" +
	   "&nbsp;<a>"+ resultObj.ajaxResult.data.join.name +"</a>"+
	   "&nbsp;<span>"+ resultObj.ajaxResult.data.comment.cont +"</span>&nbsp;<span id='commentDelBtn'>&times;</span>"+
	   "<input type='hidden' value="+ resultObj.ajaxResult.data.comment.coNo + " id='commentNum'/></div>" ); 
	}

		$("#commentLength").text(Number(commentLength)+1)
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
				var sendLength  = Number($("#sendLength").text());
				$("#sendLength").text(sendLength+1)
				console.log("resultObj : " , resultObj.ajaxResult.data)
				var html=''
					if(resultObj.ajaxResult.data.pho==null){
						html += "<div id='comdelsel'><img src='../header/img/profileAvatar.jpg' class='img-circle' style='height: 30px; width: 30px;'></img>"
					    html += "&nbsp;<a>"+ resultObj.ajaxResult.data.name +"</a>"
					    html += "<input type='hidden' value="+ resultObj.ajaxResult.data.uNo + " id='commentNum'/></div>" 
					}else{
					    html += "<div id='comdelsel'><img src="+ resultObj.ajaxResult.data.pho +" class='img-circle' style='height: 30px; width: 30px;'></img>"
					    html += "&nbsp;<a>"+ resultObj.ajaxResult.data.name +"</a>"
					    html += "<input type='hidden' value="+ resultObj.ajaxResult.data.uNo + " id='commentNum'/></div>" 
					}
				$("#tab2").prepend(html)
				
			});
	    	}
  })
    
  	
  
  
    
    /* 팔로우 하기 */
     $(document).on("click", ".follow", function(){
    	var wishUserNo = $(this).closest('.modal-content').find('.uno').text();
    	var uNo = $('#loginUser-no').text();
    	if($(".follow").text() == "팔로우"){
			$.getJSON('/peekis/wish/ajax/followInsert.do', {fno : wishUserNo, uno : uNo}, function( resultObj ) {
					if(resultObj.ajaxResult.status == 'success'){
						swal("팔로우 성공!", "유저와 친구가 되었습니다!", "success");
						$(".follow").text("언팔로우");
					}
				});
    	}else if($(".follow").text() == "언팔로우"){
			$.getJSON('/peekis/wish/ajax/followDelete.do', {fno : wishUserNo, uno : uNo}, function( resultObj ) {
				if(resultObj.ajaxResult.status == 'success'){
					swal("팔로우 삭제!", "친구가 삭제되었습니다!", "error");
					$(".follow").text("팔로우");
				}
			});
    	}
    });
    
						        