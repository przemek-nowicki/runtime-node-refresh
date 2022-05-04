  'use strict';

  const fs = require('fs');
  const path = require('path');
  const os = require('os');

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
    fs.writeFile(path.join(os.tmpdir(), 'rnr.pid'), process.pid.toString(), function (err) {
      if (err) return console.log(err);
      console.log('rnr.pid saved successfully');
    });
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