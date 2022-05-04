'use strict';

let cbToCall;
const process = global.process

const isProcessOk =  (process) => {
  return process &&
    typeof process === 'object' &&
    typeof process.kill === 'function' &&
    typeof process.pid === 'number' &&
    typeof process.on === 'function'
}

const reloadCbFn = (cb) => {
  cbToCall = cb;
};

process.on('SIGPIPE', () => {
  if (typeof cbToCall === 'function') {
    cbToCall();  
  } else {
    console.error('SIGPIPE triggered but no callback provided to execute!');
  }
});

if (!isProcessOk(process)) {
  module.exports = () => {
    return () => {}
  }
} else {
  module.exports = reloadCbFn;
}