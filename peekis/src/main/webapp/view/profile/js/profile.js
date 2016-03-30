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
	
	/* 로그인 체크 */
	$.getJSON('/peekis/main/ajax/loginCheck.do', function(resultObj) {
		console.log(resultObj);
		if(resultObj.ajaxResult.data != null){
			var loginUser = resultObj.ajaxResult.data
			$("#dropdown-color").text(loginUser.name);
			$("#loginUser-no").text(loginUser.uNo);		
			if(loginUser.pho != null){
				$("#pImg").attr("src", filePath + loginUser.pho);
			}
		}else{
			location.href = contextRoot + "/auth/joinForm.html"
		}
	});
	
	
	/* 유저정보 가져오기 */
	$.getJSON('/peekis/wish/ajax/userInfo.do', {fNo: friendNo}, function(resultObj) {
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
	});
	
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
					cloneContent.find('.follow-btn').text('언팔로잉');
				}
				if(user.uNo == uno){
					cloneContent.find('.follow-btn').css('display', 'none');
					cloneContent.find('a').attr('href' , contextRoot + '/view/myList/myList2.html');
				}
				$('#followModal .modal-body').append(cloneContent);
			}
		});
    });
	
	/* 팔로우 목록에서 - 팔로우 된 친구 언팔하기 */
	$(document).on('click', '.follow', function (){
		var uno = $("#loginUser-no").text();
		var fno = $(this).closest('.fInfo').find('.f-UserNo').text();
		$.getJSON('/peekis/wish/ajax/followDelete.do',{uno : uno, fno : fno}, function(resultObj) {
			if(resultObj.ajaxResult.status == 'success'){
				console.log(resultObj);
				$('.'+ fno).find('.follow-btn').text('언팔로잉');
				if(uno == $("#profileUser").text()){
					$("#fCnt2").text(Number($("#fCnt2").text())-1);
					$('.'+ fno).remove();
				}
			}
		});
    });
	
	/* 모달창 닫으면 모달바디 리셋시키기*/
	$('#followModal').on('hidden.bs.modal', function (e) {
		alert('dd');
		 $(this).remove('.fInfo');
	});
	$('#followerModal').on('hidden.bs.modal', function (e) {
		alert('dddd');
		$(this).remove('.fInfo');
	});
	
	/* 팔로우 버튼에 이벤트추가 */
	$(document).on('mouseenter', '.follow-btn', function (){
		if($(this).text() == '팔로잉')	$(this).text('언팔로잉');
		else $(this).text('팔로잉');
    });
	
	$(document).on('mouseleave', '.follow-btn', function (){
		if($(this).text() == '팔로잉')	$(this).text('언팔로잉');
		else $(this).text('팔로잉');
    });	
	
	
	/* 팔로워탭 클릭시 모달 띄우기 */
	$(document).on('click', '#followerList', function (){
		var uno = $("#profileUser").text();
		$.getJSON('/peekis/wish/ajax/followerList.do',{uno : uno}, function(resultObj) {
			console.log(resultObj);
			for (var user of resultObj.ajaxResult.data){
				var cloneContent = $(".clonefollow > div").clone();
				cloneContent.addClass(user.uNo+"");
				if(user.pho != null){
					cloneContent.find('.userImage').attr("src", filePath + user.pho);
				}
				if(user.fSts == 0){
					cloneContent.find('.follow-btn').text('언팔로잉');
				}
				cloneContent.find('.follow-btn').addClass('follower');
				cloneContent.find('.userId').text(user.name);
				cloneContent.find('.f-UserNo').text(user.uNo);
				$('#followerModal .modal-body').append(cloneContent);
			}
		});
    });
	
	/* 팔로워 목록에서 - 친구 언팔하기 */
	$(document).on('click', '.follower', function (){
		var uno = $("#profileUser").text();
		var fno = $(this).closest('.fInfo').find('.f-UserNo').text();
		if($(this).text() == '언팔로잉'){
			$.getJSON('/peekis/wish/ajax/followDelete.do',{uno : uno, fno : fno}, function(resultObj) {
				if(resultObj.ajaxResult.status == 'success'){
					swal("팔로우 삭제!", "친구가 삭제되었습니다!", "error");
					$("#fCnt2").text(Number($("#fCnt2").text())-1);
					$('.'+ fno).find('.follow-btn').text('언팔로잉');
				}
			});
		}else{
			$.getJSON('/peekis/main/ajax/follower.do',{uno : uno, wishUserNo : fno}, function(resultObj) {
				if(resultObj.ajaxResult.status == 'success'){
					swal("팔로우 성공!", "유저와 친구가 되었습니다!", "success");
					$("#fCnt2").text(Number($("#fCnt2").text())+1);
					$('.'+ fno).find('.follow-btn').text('팔로잉');
				}
			});
		}
    });
