
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function loadLittleIndex(data){
	var menu = "";
	var index = 0;
	for(var prop in data) {
		//if(index >= 5) {
		//	break;
		//}
		
		if(data[prop].title) {
			menu = "<li><a href='/#" + prop + "'><span>[" + data[prop].date + "]</span> " + data[prop].title + "<br/></a></li>" + menu;
			index++;
		}
	}
	$('#artigos').html(menu);
	
	$('#artigos a').click(function(e) {
		//e.preventDefault();
		var linkHref = $(this).attr('href');
		if (linkHref.indexOf("#") != -1) {
			var hash = linkHref.substr(linkHref.indexOf("#") + 1);
			loadPost(hash);
		}
	});	
}

function loadIndex(uri, callback) {
	$.ajax({
		url: "/posts/" + uri + "?ms=" + new Date().getTime(),
		type: 'GET',
		dataType: 'text',
		data:{name: name},
		success: function (text) {
			callback(text);
		},
		error: function (e) {
			$('#content').html("<h1>Erro :(</h1><p>Ocorreu um erro durante o carregamento desta página.</p>");
		}
	});
}

function loadPost(hash) {	
	$.ajax({
		url: "/posts/index.json?ms=" + new Date().getTime(),
		type: 'GET',
		dataType: 'json',
		data:{name: name},
		success: function (index) {
		
			var post = hash || window.location.href.split('#')[1];
			console.log(post);
			post = isNumber(post) ? post : undefined;
			var uri = index[post] || index[index["last"]];
			
			loadLittleIndex(index);
			loadIndex(uri["uri"], function(text){
			
				var html = new Showdown.converter().makeHtml(text);
				$('#content').html("<h1>" + uri["title"] + "</h1>" + "<span>by: " + uri["author"] + " @ " + uri["date"] + "</span><hr/>" + html);
				$('pre code', this.el).each(function(i, e) {hljs.highlightBlock(e)});
			});
		},
		error: function (e) {
			$('#content').html("<h1>Erro :( </h1><p>Ocorreu um erro durante o carregamento desta página.</p>");
		}
	});
}

$(function(){
	loadPost();
});