var config = require('./me.js').cfg,
	_ = require('./js/libs/underscore/underscore.js'),
	fs = require('fs');

exports.applyConfig = function(){	
	_.templateSettings.evaluate = /\{\{([\s\S]+?)\}\}/g;
	_.templateSettings.interpolate = /\{\{=([\s\S]+?)\}\}/g;
	_.templateSettings.escape = /\{\{-([\s\S]+?)\}\}/g;

	var index_html = fs.readFileSync('index-tmpl.html', 'ascii');
	var post_template = fs.readFileSync('post-tmpl.html', 'ascii');

	var out_index_html = _.template(index_html)(config);
	fs.writeFile('../index.html', out_index_html.toString('utf8'), function(err) {
		if(err) {
			console.log(err);
		}
	}); 

	var out_post_template = _.template(post_template)(config);
	fs.writeFile('js/views/templates/posts/post.html', out_post_template.toString('utf8'), function(err) {
		if(err) {
			console.log(err);
		}
	}); 
}