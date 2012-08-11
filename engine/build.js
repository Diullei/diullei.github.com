var program = require('./js/libs/commander');

program
  .version('0.0.1')
  .option('-c, --compile', 'Compile blog')
  .option('-a, --config', 'Apply user custom configs')
  .option('-u, --update', 'Update BlogHub engine')
  .parse(process.argv);
  
if(program.compile) {
	console.log('Compiling resources...\n');
	
	try{
		require('./build/blog-compile').compile();
		console.log('\nSuccessful');
	}
	catch(err){
		console.log('Error: ' + err.message);
	}
} else if(program.config) {
	console.log('Applying ser configurations...');
	
	try{
		require('./apply-me').applyConfig();
		console.log('\nSuccessful');
	}
	catch(err){
		console.log('Error: ' + err.message);
	}
}