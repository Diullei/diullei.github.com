var JsonDatabaseManager = require('./db').JsonDatabaseManager;

var inputFolder = __dirname  + '\\..\\posts';
var outPutFile = __dirname  + '\\..\\compiled-sources\\posts';

var db = new JsonDatabaseManager();

db.createPostIndexerFile(inputFolder, outPutFile);

console.log("successful");