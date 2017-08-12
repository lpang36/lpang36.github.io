function admin(command) {
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

	var User = mongoose.model("user",postSchema);

	if (command=='createUser') {
		User.count({}, function(err, count) {
			if (count==0) {
				var newUser = new User ({
					username: $('#createUser').children().toArray()[0].prop("value"),
					password: $('#createUser').children().toArray()[1].prop("value")
				});
				newUser.save(function(error){});
				console.log("User saved");
			}
		});
	}

	else if (command=='login') {
		mongoose.findOne({username: $('#login').children().toArray()[0].prop("value"), password: $('#login').children().toArray()[1].prop("value")}, function (err, person) {
			if (!err) {
				$('#contents').css('display','block');
			}
		});
	}

	else if (command=='createPost') {
		var newPost = new Post ({
			title: $('#createPost').children().toArray()[0].prop("value"),
			text: $('#createPost').children().toArray()[1].prop("value"),
			date: $('#createPost').children().toArray()[2].prop("value"),
			post_id: $('#createPost').children().toArray()[3].prop("value"),
			github: $('#createPost').children().toArray()[4].prop("value"),
			link: $('#createPost').children().toArray()[5].prop("value"),
			image_path: $('#createPost').children().toArray()[6].prop("value"),
			category: $('#createPost').children().toArray()[7].prop("value")
		});
		newPost.save(function(error){});
		console.log("Post saved");
	}

	else if (command=='modifyPost') {
		Post.findOneAndUpdate({id:$('#modifyPost').children().toArray()[0].prop("value")},{$set: {
			title: $('#createPost').children().toArray()[1].prop("value"),
			text: $('#createPost').children().toArray()[2].prop("value"),
			date: $('#createPost').children().toArray()[3].prop("value"),
			github: $('#createPost').children().toArray()[4].prop("value"),
			link: $('#createPost').children().toArray()[5].prop("value"),
			image_path: $('#createPost').children().toArray()[6].prop("value"),
			category: $('#createPost').children().toArray()[7].prop("value")
		}},function(error){});
		console.log("Post saved");
	}

	else if (command=='deletePost') {
		Post.deleteOne({id:$('#modifyPost').children().toArray()[0].prop("value")},function(error){});
		console.log("Post deleted");
	}

	mongoose.connection.close();
}