require.config({
	urlArgs: "a=4",
    paths: {
        jQuery: 'libs/jquery/jquery',
        Underscore: 'libs/underscore/underscore',
        Backbone: 'libs/backbone/backbone'
    },
	shim: {
		'jQuery': {exports: '$'},
		'Underscore': {exports: '_'},
		'Backbone': {exports: 'Backbone', deps: ['jQuery', 'Underscore']},
		'libs/showdown/showdown': {exports: 'Showdown'},
		'libs/date/date': {exports: 'date'},
		'libs/date/pretty': {exports: 'prettyDate'},
		'libs/linqjs/linq': {exports: 'Enumerable'},
		'libs/highlight.min': {exports: 'hljs'}
	}
});

require([
	'app'
	], function (App) {
    App.initialize();
});