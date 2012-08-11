var config = require('./me.js').cfg,
	_ = require('./engine/js/libs/underscore/underscore.js'),
	fs = require('fs');

var index_html = fs.readFileSync('engine/index-tmpl.html', 'ascii');

var out_index_html = _.template(index_html)(config);

fs.writeFile('index.html', out_index_html.toString('utf8'), function(err) {
    if(err) {
        console.log(err);
    }
}); 

console.log("funcionou!");