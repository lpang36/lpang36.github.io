var http = require('http');
var fs = require('fs');
var url = require('url');

//var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/pw');

var express = require('express');
var app = express();
app.use('/static',express.static(__dirname+'/static'));
app.set('view engine', 'ejs');
app.set('views','./views');

app.get('/', function(req, res){
   res.render('home');
});

/*
app.get('/post/:id)', function(req, res){
   res.render('post', {
      id: req.params.id
   });
});

app.get('/:category/', function(req,res){
	res.render('category', {
		category: req.params.category
	});
});
*/

var server = app.listen(8081, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})