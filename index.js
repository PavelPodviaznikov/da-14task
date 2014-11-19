var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var messeges = [];
var date = new Date();
var answers = [
		{
			'input':'hello',
			'output':'hello to you'
		},
		{
			'input':'time',
			'output': date.getHours()+":"+(date.getMinutes()<10?'0':'') + date.getMinutes()
		},
		{
			'input':'goodbye',
			'output': 'bye'
		}
]
app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/messege', function (request, response){
	var messege = request.param('messege'),
		answer = "";
	for(var i=0; i<answers.length; i++){
		if(messege === answers[i].input){
			answer = answers[i].output;
		}
	}
	if(answer === ""){
		messeges.push({'text':messege});
		answer = messeges;
	}
	response.send(answer);
});

app.get('/messeges', function (request, response){
	response.send(messeges);
});

app.get('/index', function (request, response){
	var newMesseges = [],
	    indexes = request.param('indexes');

	indexes = indexes.split(/\,|\s/);
	for(var i = 0; i<indexes.length; i+=1){
		if(messeges[indexes[i]-1].img === undefined){
			newMesseges.push( {'text' : messeges[indexes[i]-1].text} );
		}
		else{
			newMesseges.push( {'img' : messeges[indexes[i]-1].img} );
		}
	}
	response.send(newMesseges);
});

app.get('/image', function (request, response){
	var image = request.param('imgId');
	messeges.push({'img': image});
	response.send(messeges);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
