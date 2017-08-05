var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pw');

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log(db.name);
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

var Post = mongoose.model("Post",postSchema);

var newPost = new Post({
    title: 'Soccer Sentimeter',
	text: 'Website which tracks and analyzes Twitter sentiment of Premier League teams and players. Written in the Django framework. Uses the Twitter, Google Maps, Highcharts, MediaWiki, and TextBlob APIs.',
	date: '2017/08/05',
	post_id: 1,
	github: 'https://github.com/lpang36/SoccerSentimeter',
	link: 'http://soccersentimeter.pythonanywhere.com/',
	image_path: '/static/images/premierleague.png',
	category: 'project'
});
		
newPost.save(function(error){ 
	if (error) {
		console.log("Error");
		return;
	}
	console.log("Post saved");
	mongoose.connection.close();
});