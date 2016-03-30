/**
 * 
 */


	  
	  var $draggable = $('.draggable').draggabilly();
	  
		var $container2 = $('.c_container');
	    $container2.flickity({
	       cellAlign: 'left',
	       contain: true
	    });
	    
	    $('#filters').on('click', '.category', function() {
			var filterValue = $(this).attr('data-filter');
			$container.isotope({
				filter : filterValue
			});
		});
		
		$('.add-category').click(function () {
			swal({title: "폴더 만들기",
				   text: "위시리스트를 담을 폴더를 만들어 주세요:",
				   type: "input",
				   showCancelButton: true,
				   closeOnConfirm: false,
				   animation: "slide-from-top",
				   inputPlaceholder: "폴더 명을 적어주세요" },
				   function(inputValue){
					   if (inputValue === false) return false;
					   if (inputValue === "")
					   {swal.showInputError("제대로 입력해 주세요!");
					   return false}
					   swal("폴더 생성!", "만드신 폴더: " + inputValue, "success") 
					   
					  $.ajax({
					  type: "POST",
			  		  dataType:"JSON",
			  	 	  url : '/peekis/category/ajax/addCategory.do',
			  	 	  data:{'name': inputValue},
			  	 	  success: function(resultObj){
						console.log(resultObj)
		  	 			var category = resultObj.category;
						console.log(resultObj.category.name)
						var cloneContent = $(".cloneCategory > div").clone();
						cloneContent.addClass(category.cNo+"");
						cloneContent.find('.categoryName').html(resultObj.category.name);
						$items = $(cloneContent);
	   					$container2.append( $items ).flickity( 'append', $items );	
	   					
	   					// 드랍 추가
	   					$items.droppable({
							drop : dropCategory
						});
			  	 	  }
					})
				});
		  });
		
		 $.getJSON('/peekis/category/ajax/categoryList.do', function(resultObj) {
			 $("#profileUser").text(resultObj.loginUser.uNo);
			 console.log(resultObj)
			 for (var category of resultObj.data){
				 var cloneContent = $(".cloneCategory > div").clone();
					cloneContent.addClass(category.cNo+"").attr('data-filter', ".cNo"+category.cNo);
					cloneContent.find('.categoryName').html(category.name);
					cloneContent.find('.cno').val(category.cNo);
					cloneContent.find('.path1').attr('src', category.path1);
					cloneContent.find('.path2').attr('src', category.path2);
					cloneContent.find('.path3').attr('src', category.path3);
					cloneContent.find('.path4').attr('src', category.path4);
					
					$items = $(cloneContent);
					$container2.append( $items ).flickity( 'append', $items );	
					
					// 드랍 추가
					$items.droppable({
						drop : dropCategory
					});
			  	}
			});
	  

			var dropCategory = function(event, ui) {
				var dropItem = ui.draggable;
				var regExp = /cNo[1-9]+/;
				var dropCls = dropItem.attr("class").match(regExp)[0];
				
				console.dir($(this).attr("data-filter"));
				dropItem.removeClass(dropCls);
				dropItem.addClass($(this).attr("data-filter").replace(".", ""));
			};
			
			/* 카테고리 삭제하기  */
			$container2.on( 'click', '.categoryDel', function() {
				var cNo = $(this).closest(".category").find('.cno').val();
				console.log(cNo);
				$.getJSON('/peekis/category/ajax/deleteCategory.do', {cno : cNo} , function( resultObj ) {
					var ajaxResult = resultObj.ajaxResult;
					if (ajaxResult.status == "success") {
						$container2.flickity( 'remove', $("." + cNo) ).flickity();
					}
				});
			});
			
			$container2.on( 'click', '.categoryUpdate',function () {
				var cNo = $(this).closest(".category").find('.cno').val();
				swal({title: "카테고리 수정",
					   text: "카테고리를 수정해 주세요:",
					   type: "input",
					   showCancelButton: true,
					   closeOnConfirm: false,
					   animation: "slide-from-top",
					   inputPlaceholder: "카테고리 명을 적어주세요" },
					   function(inputValue){
						   if (inputValue === false) return false;
						   if (inputValue === "")
						   {swal.showInputError("제대로 입력해 주세요!");
						   return false}
						   swal("카테고리 수정!", "수정한 카테고리: " + inputValue, "success") 
						   
						  $.ajax({
						  type: "POST",
				  		  dataType:"JSON",
				  	 	  url : '/peekis/category/ajax/updateCategory.do',
				  	 	  data:{
				  	 		  name: inputValue,
				  	 		  cno:cNo
				  	 		  },
				  	 	  success: function(resultObj){
							console.log(resultObj)
				  	 	  }
						})
					});
			  });
			
			
	  
	  
	  
	  
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
		
      /* 구매여부 토글 */
      $(document).on("click", ".buy", function(){
    	var wishNo = $(this).closest(".item").find('.no').val();
    	$.getJSON('/peekis/wish/ajax/buyCheck.do', {no : wishNo}, function(resultObj) {
    		var result = resultObj.ajaxResult;
    		console.log(result);
			if(result.status == 'success'){
        		console.log(this);
				$('.'+result.data).find('.buy').toggleClass("buy-check");
			}else{
				alert('구매여부 변경에 실패하였습니다.');
			}
		});
      })

      
      
	/* 위시리스트 목록 불러오기  */		
	nextPage(1);
      
    $(window).scroll(function(){
    	var scrollHeight = $(window).scrollTop() + $(window).height();
    	var documentHeight = $(document).height();
    	if(scrollHeight >= documentHeight -100){
    		console.log("스크롤 이벤트 발생");
    		var pageNo = Number($('#pageNo').text()) +1;
    		nextPage(pageNo);
    	}
    });
      
    function nextPage(pageNo){
    	var uno = $("#loginUser-no").text();
    	 $.getJSON('/peekis/wish/ajax/list.do',{pageNo : pageNo, uno: uno},function(resultObj) {
    		 //$("#UserNo").text(resultObj.loginUser.uNo);
    		 for (var wish of resultObj.data){
				$('#pageNo').text(pageNo);
				var cloneContent = $(".cloneMainContents > div").clone();
				cloneContent.addClass(wish.no+"");
				cloneContent.find('.no').val(wish.no);
				var path = wish.path;
				if(path.startsWith('http://') == false){
					path = filePath + path;
				}
				if(wish.buy == 'Y'){
					cloneContent.find('.buy').addClass('buy-check');
				}
				cloneContent.find('img:first').attr("src", path);
				$items = $(cloneContent);
				$container.append( $items ).isotope( 'appended', $items );
				$items.draggable({
						revert : true
					});
				//$items.each( makeEachDraggable );
		  	}
    		 sort();
		});
    	
    }
    
	/* 위시리스트 추가하기  */
	$('#registModal .regist-btn').click(function () {
		var form = $("#cForm")[0];
		var formData = new FormData(form);
		formData.append("url", $("#modal-url").val());
		formData.append("uno", $("#loginUser-no").text());
		$.ajax({
			url: '/peekis/wish/ajax/add.do', 
			processData: false,
			contentType: false,
			data: formData,
			type: 'POST',
		    dataType :'json',
		    success: function(resultObj) {
		    	console.log(resultObj);
				var wish = resultObj.wish;
				var cloneContent = $(".cloneMainContents > div").clone();
				cloneContent.addClass(wish.no+("  cNo"+wish.cno));
				cloneContent.find('.no').val(wish.no);
				var path = wish.path;
				if(path.startsWith('http://') == false){
					path = filePath + path;
				}
				cloneContent.find('img:first').attr("src", path);
				$items = $(cloneContent);
				$container.prepend( $items ).isotope( 'prepended', $items );
				
				var addText = '<div class="item add-item">';
				addText += $('.add-item').html();
				addText += '</div>';
				$items = $(addText);
				$container.prepend( $items ).isotope( 'prepended', $items );
				$container.isotope( 'remove', $('.add-item:last') ).isotope();
				$("#wishCnt").text( Number($('#wishCnt').text()) +1);
		    },
		    complete: resetModal()
		});
	})

	
	/* 위시리스트 삭제하기  */
	$container.on( 'click', '.wish-menu .fa-trash-o', function() {
		var wishNo = $(this).closest(".item").find('.no').val();
		$.getJSON('/peekis/wish/ajax/delete.do', {no : wishNo} , function( resultObj ) {
			var ajaxResult = resultObj.ajaxResult;
			if (ajaxResult.status == "success") {
				$container.isotope( 'remove', $("." + wishNo) ).isotope();
				$("#wishCnt").text( Number($('#wishCnt').text()) -1);
			}
		});
	})
	
	/* 위시리스트 수정폼 불러오기  */
	$container.on( 'click', '.fa-pencil', function() {
		var item = $(this).closest(".item");
		var wishNo = $(this).closest(".item").find('.no').val();
		$.getJSON('/peekis/wish/ajax/update.do', {no : wishNo} , 
			function( resultObj ) {
				var wish = resultObj.ajaxResult.data;
				console.log(wish);
				$("#editmodal-no").val( wish.no );
				$("#editmodal-image").attr("src", item.find('img').attr('src') );
				$("#editmodal-title").val( wish.title );			
				$("#editmodal-content").val( wish.content );
				$("#editmodal-price").val( wish.price );
				$("#editmodal-url").val( wish.url );
				$("#editmodal-tag").val(wish.tag);
				$('#editModal').modal();
			});
	})
	
	/* 위시리스트  수정하기  */
	$('#editModal .update-btn').click(function () {
		var form = $("#eForm")[0];
		var formData = new FormData(form);
		formData.append("uno", $("#loginUser-no").text());
		formData.append("no", $("#editmodal-no").val());
		$.ajax({
			url: '/peekis/wish/ajax/update.do', 
			processData: false,
			contentType: false,
			data: formData,
			type: 'POST',
		    dataType :'json',
		    success: function(resultObj) {
		    	var ajaxResult = resultObj.ajaxResult;
		    	console.log(resultObj);
				if (ajaxResult.status == "success") {
			        $("." + ajaxResult.data.no + " .product").find("img").attr("src",  filePath +  ajaxResult.data.path);
			        alert("게시물 수정에  성공했습니다.");
			    } else {
			        alert("게시물 수정에 실패했습니다.");
			    }
		    }
		});
	});
	
  

	  
	  
// 모달관련 스크립트
	$('.cancel-btn').click(function () {
		resetModal();
	});
	
	$('#addModal a').click(function(){
		modalHide('#addModal');
	});
	
	$('#urlModal input[type=submit]').click(function(){
		modalHide('#urlModal');
	});
	
	function modalHide(modalId){
		$(modalId).modal('hide');
	};
	
	function resetModal() {
		$('#url').val("");
		$("#modal-File").val("");
		$("#modal-title").val("");
		$("#modal-content").val("");
		$("#modal-price").val("");
		$("#modal-url").val("");
		$("#modal-tag").val("");
		$("#modal-url").removeAttr("disabled");
		$("#modal-image").attr("src", "http://www.randomlengthsnews.com/wp-content/themes/gonzo/images/no-image-blog-one.png");
	}
	
	$('#modal-image, #editmodal-image').click( function() {
		$(this).closest(".form-group").find('[type=file]').trigger('click');
	});	
	
	$('.modal-body').find('[type=file]').change(function() {
		console.log(this);
		readURL(this);
	});
	
	
	 function readURL(input) {
	     if (input.files && input.files[0]) {
	         var reader = new FileReader(); //파일을 읽기 위한 FileReader객체 생성
	         reader.onload = function (e) {
	         //파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
	             $(input).prev().attr('src', e.target.result);
	             //이미지 Tag의 SRC속성에 읽어들인 File내용을 지정
	             //(아래 코드에서 읽어들인 dataURL형식)
	         }                   
	         reader.readAsDataURL(input.files[0]);
	         //File내용을 읽어 dataURL형식의 문자열로 저장
	     }
	 }

// URL 정보파싱
$('#preview').bind('submit', function(e) {
	  e.preventDefault();
	  
	  var url = $('#url').val();      
	  if (url.substring(0, 4) == 'http')
	  {
		getLinkMeta(url);
	  }
	  else
	  {
		//displayMessage('URL must start with <em>http://</em>', 'error');
	  }
	  return false;
	});
	
	
	function getLinkMeta(url) {
	  var q = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from html where url="' + url + '" and xpath="//title|//head/meta"') + '&format=json&callback=?';
	  
	  console.log(q);
	  
	  $.ajax({
				type: 'GET',
				url: q, 
				dataType: 'jsonp',
				success: function(data, textStatus) {
					if (results) {
						console.log(results);
						
						var result = {};
						var regExp = null;
						
						$.each(data.query.results.meta, function(key, val){
							if (val.content) {
								regExp = /(title)/g;
								if (regExp.test(val.property))
								{
									result.title = val.content;
								}
								
								regExp = /(:description)/g;
								if (regExp.test(val.property))
								{
									result.description = val.content;
								}
								
								regExp = /http.*\.(jpg|jpeg|gif|png)/g;
								if (regExp.test(val.content)) {
									if (val.content != 'undefined') {
										result.img = val.content;
									}
								}
								
								regExp = /(Price|product:price:amount)/g;
								if (regExp.test(val.property)) {
									if (val.content != 'undefined') {
									result.price = val.content;
									}
								}
								
								regExp = /(keyword)/g;
								if (regExp.test(val.name)) {
									result.tag = val.content;
								}
								
							}
						});
						
						var src = result.img ? result.img : '';
						
						$("#modal-image").attr("src", src);
						$("#modal-src").val(src);
						$("#modal-title").val(result.title);
						$("#modal-content").val(result.description);
						$("#modal-price").val(result.price);
						$("#modal-url").val(url);
						$("#modal-url").attr("disabled","disabled");
						$("#modal-tag").val(result.tag);
						$("#modal-File").val("");
		 
						
						
						var text = '<article><h1>' + result.title + '</h1>';
						text += '<div class="url"><em>' + url + '</em></div>';
						text += result.img ? '<img src="' + result.img + '" class="thumb"/>' : '';
						text += '<p>' + result.description + '</p>';
						text += '<p>' + result.price + '원</p></article>';
						
						//displayMessage(text);
					} else {
						displayMessage("Sorry, can't scrape anything from that url.", 'error');
					}
					
				},
				beforeSend:function(){
					$('.wrap-loading').css('display','block');
					$('.spinner').css('display','block');
			    },complete:function(){
			    	$('.wrap-loading').css('display','none');
			    	$('.spinner').css('display','none');
			    }
	  });
	}
	  function displayMessage(text, type) {
			$('#results').removeClass('error');
			if (type == 'error') {
				$('#results').addClass('error');
				text = '<article class="error">' + text + '</article>';
			}
			
			$('#results').prepend(text).hide().fadeIn();
		}