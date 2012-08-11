define([
    'Underscore',
    'Backbone'
], function(_, Backbone){
	var postModel = Backbone.Model.extend({
		defaults: {
			title: 'loading...',
			content: 'loading...',
			by: 'loading...',
			tags: [],
			date: '2012-06-05'
        }
	});
	return postModel;
});