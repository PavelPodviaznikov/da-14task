$(document).ready(function(){
	$.getJSON( "messeges.json", function( json ) {
        var length = json.length;
        for(var i=0; i<length; i+=1){
            console.log( "JSON: "+i+ " " + json[i].messege);
        }
 });
});