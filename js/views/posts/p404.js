define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/posts/404.html'
], function($, _, Backbone, euTemplate){
    var P404View = Backbone.View.extend({
        el: $("#page"),
        render: function(){
            this.el.html(euTemplate);
            $('#disqus_thread').hide();
        }
    });
	return P404View;
});
