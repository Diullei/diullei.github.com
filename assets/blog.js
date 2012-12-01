
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
			var dashTitle = "";
			for(var i = 0; i < data[prop].title.length; i++) {
				dashTitle += data[prop].title[i] == ' ' ? '-' : data[prop].title[i];
			}
		
			menu = "<li><a href='/#!" + prop + "/" + dashTitle + "'><span>[" + data[prop].date + "]</span> " + data[prop].title + "<br/></a></li>" + menu;
			index++;
		}
	}
	$('#artigos').html(menu);
	
	$('#artigos a').click(function(e) {
		//e.preventDefault();
		var linkHref = $(this).attr('href');
		if (linkHref.indexOf("#") != -1) {
			var hash = linkHref.substr(linkHref.indexOf("#") + 2).split('/')[0];
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
			$('#blog-content').html("<h1>Erro :(</h1><p>Ocorreu um erro durante o carregamento desta página.</p>");
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
		
			var post = hash || (window.location.href.split('#')[1] || "").substr(1).split('/')[0];
			//console.log(post);
			post = isNumber(post) ? post : undefined;
			var uri = index[post] || index[index["last"]];
			
			loadLittleIndex(index);
			loadIndex(uri["uri"], function(text){
			
				var html = new Showdown.converter().makeHtml(text);
				$('#blog-content').html("<h1>" + uri["title"] + "</h1>" + "<span>by: " + uri["author"] + " @ " + uri["date"] + "</span><hr/>" + html);
				$('pre code', this.el).each(function(i, e) {hljs.highlightBlock(e)});
				
				setTimeout(function() {
					console.log(uri["title"]);
					console.log(window.location.href);
					DISQUS.reset({
					  reload: true,
					  config: function () {  
						this.page.identifier = uri["title"];
						this.page.url = window.location.href;
						this.page.title = uri["title"];
						this.language = "pt";
					  }
					});
					},
					1000
				);
				
			});
		},
		error: function (e) {
			$('#blog-content').html("<h1>Erro :( </h1><p>Ocorreu um erro durante o carregamento desta página.</p>");
		}
	});
}

$(function(){
	loadPost();
});