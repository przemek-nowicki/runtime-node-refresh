#!/usr/bin/env node

"use strict";

var config = require('../config')
var storage = require('../storage');

var data = storage.read();
var pid = parseInt(data);

if (pid > 0) {
  try {
    process.kill(pid, config.SIGNAL_EVENT);
  } catch(e) {
    console.error('Could not connect to PID ' + pid);
  }
} else {
  console.error('pid not found in the storage');
}