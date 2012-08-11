define([
    'jQuery',
    'Underscore',
    'Backbone',
    'text!views/templates/posts/404.html'
], function($, _, Backbone, p404Template){
    var P404View = Backbone.View.extend({
        el: $("#page"),
        render: function(){
            $(this.el).html(p404Template);
            $('#disqus_thread').hide();
        }
    });
	return P404View;
});
