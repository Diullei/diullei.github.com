var JsonDatabaseManager = require('./db').JsonDatabaseManager;

function compile() {
	var inputFolder = __dirname  + '\\..\\..\\blog\\posts';
	var outPutFile = __dirname  + '\\..\\..\\blog\\compiled-sources\\posts';

	var db = new JsonDatabaseManager();

	db.createPostIndexerFile(inputFolder, outPutFile);
}

exports.compile = compile;