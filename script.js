var messeges = [];
var messege;
var image;
var indexes;
$(document).ready(function(){
	$('#addNewMessege').on('click', function(){
		messege = $('#inputForm input').val();
		if(messege===""){
			alert("Type a messege!!!");
		}
		else{
			createMessege(messeges, messege);
		}
	});
	$(document).keypress(function(e) {
		messege = $('#inputForm input').val();
        if(e.which == 13) {
            e.preventDefault();
         	if(messege===""){
			alert("Type a messege!!!");
			}
			else{
				createMessege(messeges, messege);
			}
        }
    });
	$('#showAll').on('click', function(){
		shawMesseges(messeges);
	});

	$('#getMessege').on('click', function(){
		indexes = $('#inputMessegeNumber input').val();
		shawMessege(messeges, indexes);

	});

	$('#getImg').on('click', function(){
		$('#dialog_container').css('display', 'flex');
        $('#my_dialog').css('display', 'block');
        $('#cancel').on('click', function(){
        	$('#dialog_container').css('display', 'none');
        	$('#my_dialog').css('display', 'none');
        });
        $('#createImg').on('click', function(){
        	image = $('#imgText').val();
        	if(image===""){
				alert("Type a messege!!!");
			}
			else{
				createImage(messeges, image);
			}
        	
        });
	});



	function createMessege(msgArr, msg){
		msgArr.push({'text': msg});
		$('#messegesArea').append('<div class="messege">'+msg+'</div>');
		$('.messege').fadeOut(3000);
		$('#inputForm input').val("");
		$('#counter').text(msgArr.length);
	}
	function createImage(msgArr, img){
		msgArr.push({'image': img});
		$('#messegesArea').append("<img class='image' src='data:image/png;base64,"+img+"'>");
		$('.image').fadeOut(3000);
		$('#imgText').val("");
		$('#counter').text(msgArr.length);
		$('#dialog_container').css('display', 'none');
        $('#my_dialog').css('display', 'none');
	}
	function shawMesseges(msgArr){
		for(var i=0; i<msgArr.length; i+=1){
			if(msgArr[i].text!==undefined){
				$('#messegesArea').append('<div class="messege">'+msgArr[i].text+'</div>');
			}
			else{
				$('#messegesArea').append("<img class='image' src='data:image/png;base64,"+msgArr[i].image+"'>");
			}
		}
		$('.messege').fadeOut(5000, 'swing');
		$('.image').fadeOut(5000, 'swing');
	}
	function shawMessege(msgArr, indxs){
		var index;
		if(indxs.match(/[0-9]+|[0-9]+\,[0-9]+|[0-9]+\s[0-9]+/)){
			index = indxs.split(/\,|\s/);
			for(var i=0; i<index.length; i+=1){
				if(index[i]>msgArr.length){
					alert("Opps, out of array!!!");
				}
				else{
					if(msgArr[index[i]-1].text!==undefined){
						$('#messegesArea').append('<div class="messege">'+msgArr[index[i]-1].text+'</div>');
					}
					else{
						$('#messegesArea').append("<img class='image' src='data:image/png;base64,"+msgArr[index[i]-1].image+"'>");
					}
				}		
			}
		}
		else{
			alert("Ooops, try again!!!");
		}
		
		$('.messege').fadeOut(5000, 'swing');
		$('.image').fadeOut(5000, 'swing');
		$('#inputMessegeNumber input').val("");
	}
});



