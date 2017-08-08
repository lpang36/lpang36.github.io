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

Post.findOneAndUpdate({title:'Phone Camera Radiation Meter'},{$set:{text:'Independent research project on the feasibility of using a smart phone camera to detect and measure ionizing radiation exposure. Published in the Canadian Young Scientist Journal (now Journal of Student Science and Technology). Won gold medal at Toronto Science Fair.'}},function(error){ 
	if (error) {
		console.log("Error");
		return;
	}
	console.log("Post saved");
	mongoose.connection.close();
});

