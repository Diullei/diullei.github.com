define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/posts/list.html'
], function($, _, Backbone, postTemplate){
    var ListView = Backbone.View.extend({
        el: $("#page"),
        constructor: function(model){
            this.model = model;
        },
        render: function(){			
            var model = this.model.toJSON();
			model = Enumerable.From(model).OrderByDescending(function(x){return x.date}).ToArray();

			var allTags = [];
			Enumerable.From(model).ForEach(function(x){
				x.linkTitle = x.title
				while (x.linkTitle.indexOf(' ') != -1) { x.linkTitle = x.linkTitle.replace(' ', '-'); }
				allTags = allTags.concat(x.tags);
			});
			
			allTags = Enumerable.From(allTags).OrderBy(function(x){return x}).Distinct().ToArray();
			
            var data = {
                    model: model,
                    _: _,
                    allTags : allTags
                  };

            this.el.html(_.template(postTemplate)(data));
            $('#disqus_thread').hide();
        }
    });
	return ListView;
});
