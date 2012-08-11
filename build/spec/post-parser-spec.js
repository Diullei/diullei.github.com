var util = require('../../js/libs/util').util;
var fs = require('fs');

var PostParser = require('../post-parser').PostParser;
var JsonDatabaseManager = require('../db').JsonDatabaseManager;

describe('When parser a post file', function(){

  // post title
  it('Should retrieve "Post Title" as a title from a single line with "Post Title" defined as a title', function(){

	var source = '@title: Post Title';
  	var parser = new PostParser(source);

  	var result = parser.execute();
    expect(result.title).toEqual('Post Title');
  });

  it('Should retrieve "Other Post Title" as a title from a single line with "Other Post Title" defined as a title', function(){

	var source = '@title: Other Post Title';
  	var parser = new PostParser(source);

  	var result = parser.execute();
	expect(result.title).toEqual('Other Post Title');
  });

  it('Should throw an exception when key title is invalid', function(){

	var source = '@title-title: Post Title';
  	var parser = new PostParser(source);

    expect(util.proxy(parser.execute, parser)).toThrow();
  });

  it('Should throw an exception when parser cant find the value text', function(){

	var source = '@title:';
  	var parser = new PostParser(source);

    expect(util.proxy(parser.execute, parser)).toThrow();
  });

   it('Should retrieve "Post Title" as a title from a mult line with "Post Title" defined as a title', function(){

	var source = '\
	@title: Post Title\
	';
  	var parser = new PostParser(source);

  	var result = parser.execute();
    expect(result.title).toEqual('Post Title');
  }); 

  // post author
   it('Should retrieve "Diullei Gomes" as an author from a single line with "Diullei Gomes" defined as author', function(){

	var source = '@by: Diullei Gomes';
  	var parser = new PostParser(source);

  	var result = parser.execute();
    expect(result.by).toEqual('Diullei Gomes');
  });
  
   it('Should retrieve "Post Title" as a title and "Diullei Gomes" as an author from a multline source', function(){

	var source = '\n\
	@title: Post Title\n\
	@by: Diullei Gomes\n\
	';
  	var parser = new PostParser(source);

  	var result = parser.execute();
    expect(result.title).toEqual('Post Title');
    expect(result.by).toEqual('Diullei Gomes');
  }); 

   // tags
   it('Should retrieve a list like: ["T1", "T2", "T3"] as a tag list from a single line with "T1;T2;T3" defined as Tags', function(){

	var source = '@tags: T1;T2;T3';
  	var parser = new PostParser(source);

  	var result = parser.execute();
    expect(result.tags).toEqual(["T1", "T2", "T3"]);
  });

  it('Should retrieve "Archtecture" as a category from a single line with "Archtecture" defined as a category', function(){

	var source = '@category: Archtecture';
  	var parser = new PostParser(source);

  	var result = parser.execute();
	expect(result.category).toEqual('Archtecture');
  });

  it('Should retrieve "2012-07-14" as a post date from a single line with "2012-07-14" defined as a date', function(){

	var source = '@date: 2012-07-14';
  	var parser = new PostParser(source);

  	var result = parser.execute();
	expect(result.date).toEqual('2012-07-14');
  });

   // recuperando tudo
   it('Should retrieve post data from a multline source', function(){

	var source = '\n\
	@title: Post Title\n\
	@by: Diullei Gomes\n\
	\n\
@date: 2012-07-14\n\
\n\
\n\
@category: Archtecture\n\
@tags: T1;T2;T3\
	';
  	var parser = new PostParser(source);

  	var result = parser.execute();
    expect(result.title).toEqual('Post Title');
    expect(result.by).toEqual('Diullei Gomes');
	expect(result.date).toEqual('2012-07-14');
	expect(result.category).toEqual('Archtecture');
    expect(result.tags).toEqual(["T1", "T2", "T3"]);
  }); 

});

describe('When run json database creator', function(){

  it('Should create a json file from posts on folder', function(){
  	var inputFolder = __dirname  + '\\test-posts';
  	var outputFolder = __dirname  + '\\test-posts';

  	var db = new JsonDatabaseManager();

  	db.createPostIndexerFile(inputFolder, outputFolder);

    var createdFile = fs.readFileSync(outputFolder + '\\db-posts-view.json', 'ascii');

	expect(createdFile).toEqual('[{"title":"Post1-Title","ref":"post-1.post.mkdown"}]');
  });
});
