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
							console.log("resultObj.sendList : " ,resultObj.sendList);

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
		        
		        