var jasmine = require('jasmine-node');

jasmine.executeSpecsInFolder('./spec', function(runner, log){
  if (runner.results().failedCount == 0) {
	console.log('0');
  }
  else {
	console.log('1');
  }
}, true, false);