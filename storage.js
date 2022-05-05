var fs = require('fs');
var config = require('./config');

function write(data) {
  fs.writeFile(config.STORAGE_SOURCE, data, function (err) {
    if (err) return console.error(err);
  });
}

function read() {
  if(!fs.existsSync(config.STORAGE_SOURCE)) {
    console.error("File not found");
  }
  return fs.readFileSync(config.STORAGE_SOURCE);
}

module.exports.write = write;
module.exports.read = read;

