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

var userSchema = mongoose.Schema({
	username: String,
	password: String
}, { collection: 'users' });

var User = mongoose.model("user",userSchema);

var express = require('express');
var app = express();
app.use('/static',express.static(__dirname+'/static'));
app.set('view engine', 'ejs');
app.set('views','./views');

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var cookieParser = require('cookie-parser')
app.use(cookieParser());

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

app.get('/createUser/', function(req, res){
   res.render('createUser');
});

app.get('/login/', function(req, res){
   res.render('admin');
});

app.get('/createPost/', function(req, res){
	if (req.cookies.login) {
		res.render('createPost');
	}
	else {
		res.render('notFound');
	}
});

app.get('/modifyPost/', function(req, res){
	if (req.cookies.login) {
		res.render('modifyPost');
	}
	else {
		res.render('notFound');
	}
});

app.get('/deletePost/', function(req, res){
	if (req.cookies.login) {
		res.render('deletePost');
	}
	else {
		res.render('notFound');
	}
});

app.get('/:category/', function(req,res){
	Post.find({$query: {category: req.params.category}, $orderby: {priority: 1}}, function (err, postList) {
		if (postList&&postList.length > 0) {
			var posts = [];
			postList.forEach(function (post) {
				posts.push(post.toJSON());
			});
			res.render('category', {
				category: req.params.category,
				posts: posts
			});
		}
		else {
			res.render('notFound');
		}
	});
});

app.get('*', function(req, res){
   res.render('notFound');
});

app.post('/createUser/', function(req, res){
	User.count({}, function(err, count) {
		console.log(count);
		if (!count) {
			var newUser = new User ({
				username: req.body.username,
				password: req.body.password
			});
			newUser.save(function(error){
				res.end();
			});
		}
	});
});

app.post('/login', function(req, res){
	User.findOne({username: req.body.username, password: req.body.password}, function (err, person) {
		if (!err&&person) {
			res.cookie('login',true);
			res.end();
		}
	});
});

app.post('/createPost', function(req, res) {
	var newPost = new Post ({
		title: req.body.title,
		text: req.body.text,
		date: req.body.date,
		post_id: req.body.post_id,
		github: req.body.github,
		link: req.body.link,
		image_path: req.body.image_path,
		category: req.body.category,
		priority: req.body.priority,
		tags: req.body.tags
	});
	newPost.save(function(error){
		res.end();
	});
});

app.post('/modifyPost', function(req, res) {
	Post.findOneAndUpdate({id:req.body.post_id},{$set: {
		title: req.body.title,
		text: req.body.text,
		date: req.body.date,
		github: req.body.github,
		link: req.body.link,
		image_path: req.body.image_path,
		category: req.body.category,
		priority: req.body.priority,
		tags: req.body.tags
	}},function(error){
		res.end();
	});
});

app.post('/deletePost', function(req, res) {
	Post.deleteOne({id:req.body.post_id},function(error){
		res.end();
	});
});

var server = app.listen((process.env.PORT || 5000), function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});