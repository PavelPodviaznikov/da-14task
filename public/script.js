$(document).ready(function(){
	
	var messeges = [],
		images = [];
	

	$('#addNewMessege').click(function(e){
		e.preventDefault();
		var messege = $('#inputForm input').val();
		var url = '/messege?messege='+messege;
		if(messege===""){
			$('#dialog_container').css('display', 'flex');
        	$('#alertWindow').css('display', 'block');
        	$('#alertMessege').text("Please, type a messege!");
        	$('#ok').on('click', function(event) {
        		event.preventDefault();
        		$('#dialog_container').css('display', 'none');
        		$('#alertWindow').css('display', 'none');
        	});
		}
		else{
			displayMessege(url);
		}
	});

	$('#showAll').on('click', function(){
		$.get('/messeges', function(data){
			messeges = data;
			if(messeges.length===0){
				$('#dialog_container').css('display', 'flex');
	        	$('#alertWindow').css('display', 'block');
	        	$('#alertMessege').text("There are no messeges!");
	        	$('#ok').on('click', function(event) {
	        		event.preventDefault();
	        		$('#dialog_container').css('display', 'none');
	        		$('#alertWindow').css('display', 'none');
	        	});
			}
			else{
				for(var i=0; i<messeges.length; i+=1){
					if(messeges[i].img === undefined){
						$('#messegesArea').append('<div class="messege">'+messeges[i].text+'</div>');
					}
					else{
						for(var j=0; j<images.length; j++){
							if(parseInt(messeges[i].img)===images[j].imgId){
								$('#messegesArea').append("<img class='image' src='data:image/png;base64,"+images[j].imgText+"'>");
							}
						}
					}
				}
				$('.messege').fadeOut(3000, 'swing');
				$('.image').fadeOut(3000);
			}
		});
	});

	$('#getMessege').on('click', function(){
    	var newMesseges = [];
		var indexes = $('#inputMessegeNumber input').val();
		if(indexes === ""){
			$('#dialog_container').css('display', 'flex');
        	$('#alertWindow').css('display', 'block');
        	$('#alertMessege').text("Please, type an index!");
        	$('#ok').on('click', function(event) {
        		event.preventDefault();
        		$('#dialog_container').css('display', 'none');
        		$('#alertWindow').css('display', 'none');
        	});
		}
		else{
			$.get('/index?indexes='+indexes, function(data){
				newMesseges = data;
				for(var i=0; i<newMesseges.length; i+=1){
					if(newMesseges[i].img === undefined){
						$('#messegesArea').append('<div class="messege">'+newMesseges[i].text+'</div>');
					}
					else{
						for(var j=0; j<images.length; j++){
							if(parseInt(newMesseges[i].img)===images[j].imgId){
								$('#messegesArea').append("<img class='image' src='data:image/png;base64,"+images[j].imgText+"'>");
							}
						}
					}
					$('#inputMessegeNumber input').val("");
				}
				$('.messege').fadeOut(5000, 'swing');
				$('.image').fadeOut(3000);
			});
		}
		
	});

	$('#getImg').on('click', function(event){
		event.preventDefault();
		$('#dialog_container').css('display', 'flex');
        $('#my_dialog').css('display', 'block');
        $('#cancel').on('click', function(){
        	$('#dialog_container').css('display', 'none');
        	$('#my_dialog').css('display', 'none');
        });
        $('#createImg').on('click', function(e){
        	e.preventDefault();
        	e.stopImmediatePropagation();
        	var image = $('#imgText').val();
        	images.push(
        		{
        			'imgId': images.length,
        			'imgText': image
        		}
        	);
			$.get('/image?imgId='+images[images.length-1].imgId, function(data){
	       		messeges = data;
	       		var imgId = messeges[messeges.length-1].img;
	       		for(var i=0; i<images.length; i++){
	       			if(images[i].imgId===parseInt(imgId)){
	       				$('#messegesArea').append("<img class='image' src='data:image/png;base64,"+images[i].imgText+"'>");
	       			}
	       			else{
	       				console.log('error');
	       			}
	       		}
	       		
				$('#dialog_container').css('display', 'none');
			    $('#my_dialog').css('display', 'none');
				$('.image').fadeOut(3000);
				$('#imgText').val("");
				$('#counter').text(messeges.length);
	       	});
		
        	
        	/*
			else{
				$.get('/image?imgId='+images[length-1].imgId, function(data){
					messeges = data;
					console.log(messeges[length-1].img);
					//$('#messegesArea').append("<img class='image' src='data:image/png;base64,"+messeges[length-1].img+"'>");
					$('#dialog_container').css('display', 'none');
				    $('#my_dialog').css('display', 'none');
					$('.image').fadeOut(3000);
					$('#imgText').val("");
					$('#counter').text(messeges.length);
				});

			}*/
        });
		
	});



	function displayMessege(msg_url){
		$.get(msg_url, function(data){
			console.log(data);
			if(typeof data === 'string'){
				$('#messegesArea').append('<div class="messege">'+data+'</div>');
				$('#inputForm input').val("");
				$('.messege').fadeOut(3000);
			}
			else{
				messeges = data;
				$('#messegesArea').append('<div class="messege">'+messeges[messeges.length-1].text+'</div>');
				$('#inputForm input').val("");
				$('#counter').text(messeges.length);
				$('.messege').fadeOut(3000);
			}
		});
	}

	function displayAll(){
		
	}

});
