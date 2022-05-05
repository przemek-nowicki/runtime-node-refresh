'use strict';

var config = require('./config');
var storage = require('./storage');

var cbToCall;
var process = global.process;

function isProcessOk(process) {
  return process &&
    typeof process === 'object' &&
    typeof process.kill === 'function' &&
    typeof process.pid === 'number' &&
    typeof process.on === 'function'
}

function reloadCbFn(cb) {
  cbToCall = cb;
  storage.write(process.pid.toString());
};

process.on(config.SIGNAL_EVENT, function() {
  if (typeof cbToCall === 'function') {
    cbToCall();  
  } else {
    console.error('SIGPIPE triggered but no callback provided to execute');
  }
});

if (!isProcessOk(process)) {
  console.error('Invalid nodejs process object detected')
  module.exports = function () {
    return function () {}
  }
} else {
  module.exports = reloadCbFn;
}