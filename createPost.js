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
    title: 'Roundworm Neural Simulation',
	text: 'Evolve a colony of organisms (based on C. elegans) to adapt to various environmental stimuli, using an evolutionary algorithm and spike-timing dependent plasticity.',
	date: '2017/08/06',
	post_id: 2,
	github: 'https://github.com/lpang36/RoundwormNeuralSimulation',
	link: '',
	image_path: '/static/images/neuron.jpg',
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