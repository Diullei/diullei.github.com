var fs = require('fs');
var program = require('./../js/libs/commander');

var _cmd = {};

function directoryExists(path) {
	try {
		stats = fs.lstatSync(path);
		if (stats.isDirectory()) {
			return true;
		}
	}
	catch (e) {
		return false;
	}
	return false;
}

_cmd.compile = function(){
	console.log('Compiling resources...\n');
	
	try{
		require('./blog-compile').compile();
		console.log('\nSuccessful');
	}
	catch(err){
		console.log('Error: ' + err.message);
	}
};

_cmd.config = function(){
	console.log('Applying ser configurations...');
	try{
		require('./apply-me').applyConfig();
		console.log('\nSuccessful');
	}
	catch(err){
		console.log('Error: ' + err.message);
	}
};

_cmd.install = function(){
	console.log('Installing blog...');
	
	if(!directoryExists('../blog')) {
		console.log('[install] create directory: /blog');
		fs.mkdirSync('../blog');
	}
	if(!directoryExists('../blog/img')) {
		console.log('[install] create directory: /blog/img');
		fs.mkdirSync('../blog/img');
	}
	if(!directoryExists('../blog/compiled-sources')) {
		console.log('[install] create directory: /blog/compiled-sources');
		fs.mkdirSync('../blog/compiled-sources');
	}
	if(!directoryExists('../blog/compiled-sources/posts')) {
		console.log('[install] create directory: /blog/compiled-sources/posts');
		fs.mkdirSync('../blog/compiled-sources/posts');
	}
	if(!directoryExists('../blog/posts')) {
		console.log('[install] create directory: /blog/posts');
		fs.mkdirSync('../blog/posts');
	}
	
	fs.writeFileSync('../start_server.cmd', 'node engine\\server.js 100 .');	
	console.log('[install] create file: start_server.cmd');
}

program
  .version('0.0.1')
  .option('-c, --compile', 'Compile blog')
  .option('-a, --config', 'Apply user custom configs')
  .option('-u, --update', 'Update BlogHub engine')
  .option('-i, --install', 'Install blog')
  .parse(process.argv);

if(program.compile) {
	_cmd.compile();
} else if(program.config) {
	_cmd.config();
} else if (program.install){
	_cmd.install();
	_cmd.config();
}