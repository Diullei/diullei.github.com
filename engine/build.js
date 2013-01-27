var Showdown = require('./showdown');

var fs = require('fs');

var posts = JSON.parse(fs.readFileSync('../posts/index.json', 'utf8'));

var menu = "";

for(var prop in posts) {	
	if(posts[prop].title) {	
		menu = "<li><a href='" + posts[prop].uri.split('.')[0] + ".html'>" + posts[prop].title + "<br/></a> <small>" + posts[prop].date + "</small></li>" + menu;
	}
}

function createPost(post, menu){
	var htmlMd = fs.readFileSync('../posts/' + post.uri, 'utf8');

	var indexHtml = fs.readFileSync('templates/post.template', 'utf8').toString()
		.replace('@@@title', post.title)
		.replace('@@@title', post.title)
		.replace('@@@title', post.title)
		.replace('@artigos', menu)
		.replace('@post', "<h1>" + post.title + "</h1>" + "<span>by: " + post.author + " @ " + post.date + "</span><hr/>" +  (new Showdown.converter().makeHtml(htmlMd.toString())));
	
	fs.writeFile('../blog/' + post.uri.split('.')[0] + '.html', indexHtml.toString('utf8'), function(err) {
		if(err) {
			console.log(err);
		}
	}); 
}

for(var prop in posts) {	
	if(posts[prop].title) {
		createPost(posts[prop], menu);
	}
}

var lastTitle = posts[posts.last].title;

var index = fs.readFileSync('templates/index.template', 'utf8').toString('utf8').replace('@start', posts[posts.last].uri.split('.')[0] + '.html');

fs.writeFile('index.html', index.toString('utf8'), function(err) {
	if(err) {
		console.log(err);
	}
}); 

