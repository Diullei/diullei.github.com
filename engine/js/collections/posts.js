define([
	'jQuery',
	'Underscore',
	'Backbone',
	'models/posts/post'
], function($, _, Backbone, postModel){
  var PostCollection = Backbone.Collection.extend({
  	url: "/bloghub/compiled-sources/posts/db-posts-view.json",
    model: postModel,
    initialize: function(){}
  });
 
  return PostCollection;
});