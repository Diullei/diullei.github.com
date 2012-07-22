define([
    'jQuery',
    'Underscore',
    'Backbone',
	'views/posts/post', 
	'models/posts/post', 
	'collections/posts',
	'views/posts/list',
	'views/posts/me',
	'views/posts/p404',
], function ($, _, Backbone, PostView, PostModel, PostCollection, ListView, MeView, P404View) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            '!/posts': 'showPosts',
            '!/me': 'showMe',
            '!/post/:id/*actions': 'showPost',
            '*actions': 'defaultAction'
        },

        defaultAction: function (actions) {
            var model = new PostModel();
            model.fetch({
                url: '/blog/compiled-sources/posts/db-last-post-view.json',
				//contentType: "charset=utf-8",
                success: function () {
                    new PostView(model.attributes).render();
                }
            });
        },

        showPosts: function () {
            var collection = new PostCollection();
            collection.fetch({
                url: '/blog/compiled-sources/posts/db-posts-view.json',
				//contentType: "charset=utf-8",
                success: function () {
                    new ListView(collection).render();
                }
            });
        },

        showPost: function (id) {
        	console.log(id);
            var model = new PostModel();
            model.fetch({
                url: '/blog/compiled-sources/posts/db-' + id + '-post-view.json',
				//contentType: "charset=utf-8",
                success: function () {
                	// TODO: resolver!!
                	console.log(model.attributes);
                    new PostView(model.attributes).render();
                },
                error: function(){
                	console.log('error');
				    new P404View().render();
                }
            });
        },

        showMe: function () {
            new MeView().render();
        }
    });

    var initialize = function () {
            var app_router = new AppRouter;
            Backbone.history.start();
        };
        
    return {
        initialize: initialize
    };
});