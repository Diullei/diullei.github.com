var linq = require('../js/libs/linqJs/linq.js').Enumerable;

(function(exports){
	var BREAK_LINE = '\n';

	function PostParser(source){
		this.source = source;
		this.validKeys = ['@title', '@by', '@tags', '@category', '@date', '@content', '@id', '@deploy'];
	}

	PostParser.prototype.checkKey = function(key) {
		if(linq.From(this.validKeys).Where(function(x){ return x == key }).ToArray().length == 0)
			throw 'Invalid key "' + key + '".';
	};

	PostParser.checkKeyValue = function(value, key) {
			if(value == '')
				throw 'The ' + key + ' value is missing.';
	};

	PostParser.prototype.execute = function() {
		if(this.source == undefined)
			throw 'Invalid source.';

		var self = this;
		var post = {};

		var lines = this.source.split(BREAK_LINE);

		var isContent = false;
		var contentText = '';

		linq.From(lines).ForEach(function (x) {
			if(isContent){
				contentText += (x + '\n');
				return;
			}

			if(x.trim() == '') return;
			if(x.split(':').length != 2) return;

			var key = x.split(':')[0].trim();
			var value = x.split(':')[1].trim();

			self.checkKey(key);

			if(key == "@content"){
				isContent = true;
				return;
			}

			PostParser.checkKeyValue(value, key);

			key = key.substring(1);
			if(key == 'tags'){
				post[key] = linq.From(value.split(';')).Select(function(x){return x.trim()}).ToArray();
			}
			else
				post[key] = value;
		});

		if(isContent){
			post["content"] = contentText;
		}

		return post;
	};

	exports.PostParser = PostParser;
})(exports);