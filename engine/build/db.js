var fs = require('fs');
var linq = require('../js/libs/linqJs/linq.js').Enumerable;
var PostParser = require('./post-parser').PostParser;

/*
function Atom(attribs){
	this.attribs = attribs;
}

Atom.prototype.toXml = function(){
	var xml = '<feed xmlns="http://www.w3.org/2005/Atom">';
	xml += '<title>' + this.attribs.title + '</title>';
	xml += '<link href="' + this.attribs.feed_url + '" rel="self"/>';
	xml += '<link href="' + this.attribs.site_url + '" />';
	xml += '<updated>' + this.attribs.updated + '</updated>';
	xml += '<id>' + this.attribs.site_url + '</id>';
	xml += '<author>';
	xml += '<name>' + this.attribs.author + '</name>';
	xml += '<email>' + this.attribs.email + '</email>';
	xml += '</author>';

	xml += '<entry>';
	for(var i = 0; i < this.attribs.itens.length; i++){
		var entry = this.attribs.itens[i];
		
		xml += '<title>' + entry.title + '</title>';
		xml += '<link href="' + entry.url + '" />';
		xml += '<link href="' + entry.date + '" />';
		xml += '<id>' + entry.url + '</id>';
		xml += '<content type="html">' + entry.content + '</content>';
	}
	xml += '</entry>';
	xml += '</feed>';	
	
	return xml;
}*/

(function(exports){

	var clearDir = function(dirPath) {
      try { var files = fs.readdirSync(dirPath); }
      catch(e) { return; }
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            clearDir(filePath);
        }
      //fs.rmdirSync(dirPath);
    };
	
	function JsonDatabaseManager(){}

	JsonDatabaseManager.prototype.createPostIndexerFile = function(inputFolder, outputFolder) {
		var indexer = [];
		var ids = {};
		
		// make post list
		fs.readdirSync(inputFolder).forEach(function(file) {
			if(file.substr(file.lastIndexOf('.'), file.length) == '.post'){

				var fileContent = '';

				try {
				  fileContent = fs.readFileSync(inputFolder + '/' + file, 'binary');
				}
				catch (err) {
				  console.error("There was an error opening the file:");
				  console.log(err);
				}

			  	var parser = new PostParser(fileContent);

			  	var post = parser.execute();

				if(!post.id) throw "Post must have an id.";
				if(!post.title) throw "Post must have a title.";
				if(!post.by) throw "Post must have an by.";
				if(!post.tags) throw "Post must have an tags.";
				if(!post.category) throw "Post must have an category.";
				if(!post.date) throw "Post must have an date.";
				if(!ids[post.id]) ids[post.id] = true; else throw "Can't duplicate post id.";
					
			  	post.ref = file.toLowerCase() + '.mkdown';
				
				if(post.deploy == 'true') {
					indexer.push(post);
					console.log('Mapping: ' + post.title);
				}
			}
		});

		clearDir(outputFolder);
		
		/*
		var feed = new Atom({
			title: 'Diullei Gomes',
			description: 'Diullei Gomes - Blog',
			feed_url: 'http://diullei.github.com/atom.xml',
			site_url: 'http://diullei.github.com/',
			author: 'Diullei Gomes',
			email: 'diullei@gmail.com',
			updated: '',
			items: []
		});*/
	
		linq.From(indexer).ForEach(function(x){
			/*feed.attribs.items.push({
				title:  x.title,
				content: x.title,
				url: 'http://diullei.github.com/blog/#!/post/' + x.id + '/',
				guid: x.id,
				author: x.author,
				date: x.date
			});*/
		
			fs.writeFile(outputFolder + '\\' + x.ref, x.content ? x.content.toString('utf8') : '-- no content --', function(err) {
			    if(err) {
			        console.log(err);
			    }
			}); 
			fs.writeFile(outputFolder + '\\db-' + x.id + '-post-view.json', JSON.stringify(x).toString('utf8'), function(err) {
			    if(err) {
			        console.log(err);
			    } else {
			    }
			});
		});		
		
		/*var xml = feed.xml();
		fs.writeFile('..\\atom.xml', feed.toXml().toString('utf8'), function(err) {
		    if(err) {
		        console.log(err);
		    }
		});*/
		
		linq.From(indexer).ForEach(function (model) {
			model.date = Date.parse(model.date);
		});
		var lastModel = linq.From(indexer).OrderByDescending(function(x){return x.date}).FirstOrDefault();
		fs.writeFile(outputFolder + '\\db-last-post-view.json', JSON.stringify(lastModel).toString('utf8'), function(err) {
		    if(err) {
		        console.log(err);
		    }
		});

		linq.From(indexer).ForEach(function(x){ delete x.content; });

		fs.writeFile(outputFolder + '\\db-posts-view.json', JSON.stringify(indexer).toString('utf8'), function(err) {
		    if(err) {
		        console.log(err);
		    }
		}); 
	};

	exports.JsonDatabaseManager = JsonDatabaseManager;
})(exports);