define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/posts/me.html'
], function($, _, Backbone, euTemplate){
    var MeView = Backbone.View.extend({
        el: $("#page"),
        render: function(){
            this.el.html(euTemplate);
            $('#disqus_thread').hide();
        }
    });
	return MeView;
});
