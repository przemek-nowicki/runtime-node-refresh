#!/usr/bin/env node

"use strict";

const fs = require('fs');
const path = require('path');
const os = require('os');

var args = process.argv[2];

fs.readFile(path.join(os.tmpdir(), 'rnr.pid'), 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  const pid = parseInt(data);
  if (pid > 0) {
    process.kill(pid, "SIGPIPE");
  } else {
    console.error('pid not found in the storage');
  }
});
