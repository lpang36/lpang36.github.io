var http = require('http');
var fs = require('fs');
var url = require('url');

var mongoose = require('mongoose');

var uristring = 
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/pw';

var port = process.env.PORT || 5000;

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

var postSchema = mongoose.Schema({
	title: String,
	text: String,
	date: String,
	post_id: Number,
	github: String,
	link: String,
	image_path: String,
	category: String
}, { collection: 'posts' });

var Post = mongoose.model("post",postSchema);

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
*/

app.get('/:category/', function(req,res){
	Post.find({category: req.params.category}, function (err, postList) {
		if (postList&&postList.length > 0) {
			res.render('category', {
				category: req.params.category,
				posts: postList
			});
		}
		else {
			res.render('notFound');
		}
	});
});

app.get('*', function(req,res){
	res.render('notFound');
});

var server = app.listen((process.env.PORT || 5000), function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});