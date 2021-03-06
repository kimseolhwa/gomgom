	
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
		$('#profileUser').text(friendNo);
	}	
	
	/* 게시물 탭으로 이동 */
	$(document).on('click', '#wishList', function (){    	
		if(document.location.href.indexOf("fNo") > 0){
        	location.href = contextRoot + "/view/user/user.html?fNo=" + friendNo;
    	}else{
	       	location.href = contextRoot + "/view/myList/myList2.html";
    	}
    });	
	
	/* 좋아요 탭으로 이동 */
	$(document).on('click', '#likeList', function (){    	
		if(document.location.href.indexOf("fNo") > 0){
        	location.href = contextRoot + "/view/like/like.html?fNo=" + friendNo;
    	}else{
	       	location.href = contextRoot + "/view/like/like.html";
    	}
    });
	
	/* 팔로우탭 클릭시 모달 띄우기 */
	$(document).on('click', '#followList', function (){
		var uno = $("#loginUser-no").text();
		var fno = $("#profileUser").text();
		$.getJSON('/peekis/wish/ajax/followList.do',{uno : uno, fno : fno}, function(resultObj) {
			console.log(resultObj);
			for (var user of resultObj.ajaxResult.data){
				var cloneContent = $(".clonefollow > div").clone();
				cloneContent.addClass(user.uNo+"");
				cloneContent.find('.f-UserNo').text(user.uNo);
				cloneContent.find('a').attr('href' , contextRoot + '/view/user/user.html?fNo=' + user.uNo);
				cloneContent.find('.userId').text(user.name);
				cloneContent.find('.follow-btn').addClass('follow');
				if(user.pho != null){
					cloneContent.find('.userImage').attr("src", filePath + user.pho);
				}
				if(user.fSts == 0){
					cloneContent.find('.follow').html('<i class="fa fa-plus">　팔로우</i>');
				}
				if(user.uNo == uno){
					cloneContent.find('.follow').css('display', 'none');
					cloneContent.find('a').attr('href' , contextRoot + '/view/myList/myList2.html');
				}
				$('#followModal .modal-body').append(cloneContent);
			}
		});
    });
	
	/* 팔로우 목록에서 - 팔로우, 언팔로우 하기 */
	$(document).on('click', '.follow', function (){
		var uno = $("#loginUser-no").text();
		var fno = $(this).closest('.fInfo').find('.f-UserNo').text();
		if($(this).html().indexOf('fa-check') > 0 ){
			$.getJSON('/peekis/wish/ajax/followDelete.do', {uno : uno, fno : fno}, function(resultObj) {
				if(resultObj.ajaxResult.status == 'success'){
					$('.'+ fno).find('.follow').html('<i class="fa fa-plus">　팔로우</i>');
					swal("팔로우 삭제!", "친구가 삭제되었습니다!", "error");
					if(uno == $("#profileUser").text()){
						$("#fCnt2").text(Number($("#fCnt2").text())-1);
						$('.'+ fno).remove();
					}
				}
			});
		}else if($(this).html().indexOf('fa-plus') > 0){
			$.getJSON('/peekis/wish/ajax/followInsert.do', {uno : uno, fno : fno}, function( resultObj ) {
				if(resultObj.ajaxResult.status == 'success'){
					$('.'+ fno).find('.follow').html('<i class="fa fa-check"></i>　팔로잉');
					swal("팔로우 성공!", "유저와 친구가 되었습니다!", "success");
					if(uno == $("#profileUser").text()){
						$("#fCnt2").text(Number($("#fCnt2").text())+1);
					}
				}
			});
		}
    });
	
	/* 모달창 닫으면 모달바디 리셋시키기*/
	$(document).on('hidden.bs.modal', '#followModal', function (e) {
		 $("#followModal .fInfo").remove();
	});
	$(document).on('hidden.bs.modal', "#followerModal", function (e) {
		$("#followerModal .fInfo").remove();
	});	
	
	/* 팔로워탭 클릭시 모달 띄우기 */
	$(document).on('click', '#followerList', function (){
		var uno = $("#loginUser-no").text();
		var fno = $("#profileUser").text();
		$.getJSON('/peekis/wish/ajax/followerList.do',{uno : uno, fno : fno}, function(resultObj) {
			console.log(resultObj);
			for (var user of resultObj.ajaxResult.data){
				var cloneContent = $(".clonefollow > div").clone();
				cloneContent.addClass(user.uNo+"");
				cloneContent.find('.f-UserNo').text(user.uNo);
				cloneContent.find('a').attr('href' , contextRoot + '/view/user/user.html?fNo=' + user.uNo);
				cloneContent.find('.userId').text(user.name);
				cloneContent.find('.follow-btn').addClass('follower');
				if(user.pho != null){
					cloneContent.find('.userImage').attr("src", filePath + user.pho);
				}
				if(user.fSts == 0){
					cloneContent.find('.follower').html('<i class="fa fa-plus">　팔로우</i>');
				}
				if(user.uNo == uno){
					cloneContent.find('.follower').css('display', 'none');
					cloneContent.find('a').attr('href' , contextRoot + '/view/myList/myList2.html');
				}
				$('#followerModal .modal-body').append(cloneContent);
			}
		});
    });
	
	/* 팔로워 목록에서 - 친구 언팔하기 */
	$(document).on('click', '.follower', function (){
		var uno = $("#loginUser-no").text();
		var fno = $(this).closest('.fInfo').find('.f-UserNo').text();
		if($(this).html().indexOf('fa-check') > 0){
			$.getJSON('/peekis/wish/ajax/followDelete.do', {uno : uno, fno : fno}, function(resultObj) {
				if(resultObj.ajaxResult.status == 'success'){
					$('.'+ fno).find('.follow').html('<i class="fa fa-plus">　팔로우</i>');
					swal("팔로우 삭제!", "친구가 삭제되었습니다!", "error");
					if(uno == $("#profileUser").text()){
						$("#fCnt2").text(Number($("#fCnt2").text())-1);
					}
				}
			});
		}else if($(this).html().indexOf('fa-plus') > 0){
			$.getJSON('/peekis/wish/ajax/followInsert.do', {uno : uno, fno : fno}, function( resultObj ) {
				if(resultObj.ajaxResult.status == 'success'){
					$('.'+ fno).find('.follow').html('<i class="fa fa-check"></i>　팔로잉');
					swal("팔로우 성공!", "유저와 친구가 되었습니다!", "success");
					if(uno == $("#profileUser").text()){
						$("#fCnt2").text(Number($("#fCnt2").text())+1);
					}
				}
			});
		}
    });
