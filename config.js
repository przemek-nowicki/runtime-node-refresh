var path = require('path');
var os = require('os');

var SIGNAL_EVENT = 'SIGPIPE';
var STORAGE_SOURCE = path.join(os.tmpdir(), 'rnr.pid');

module.exports.SIGNAL_EVENT = SIGNAL_EVENT;
module.exports.STORAGE_SOURCE = STORAGE_SOURCE;