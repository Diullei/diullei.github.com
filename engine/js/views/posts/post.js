define([
    'jQuery',
    'Underscore',
    'Backbone',
	'libs/showdown/showdown',
	'libs/date/pretty',
	'libs/highlight.min',
    'text!views/templates/posts/post.html',
    'text!views/templates/posts/tags.html'
], function($, _, Backbone, Showdown, prettyDate, hljs, postTemplate, tagsTemplate){

    var postView = Backbone.View.extend({
        el: $("#page"),
        constructor: function(model){
            this.model = model;
        },
        render: function(){		
            var model = (this.toJSON) ? this.model.toJSON() : this.model;

			model.linkTitle = model.title
			while (model.linkTitle.indexOf(' ') != -1) { model.linkTitle = model.linkTitle.replace(' ', '-'); }
			
            var data = {
                    tags: model.tags,
                    model: model,
                    _: _ 
                  };

            model.content = new Showdown.converter().makeHtml(model.content);
            this.el.html(_.template(postTemplate)(data));
			
			if(initJsfiddle) 
				initJsfiddle();
			
			$('pre code', this.el).each(function(i, e) {hljs.highlightBlock(e)});
            $('#disqus_thread').show();
        }
    });
    return postView;
});