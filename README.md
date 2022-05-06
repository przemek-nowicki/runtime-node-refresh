# RnR - runtime-node-refresh

**RnR** - is tiny lib to refresh node setup on runtime without restarting the node server.

# Install

```sh
npm install --save runtime-node-refresh
```

# Usage
 
Following you will find example of simple project created via `npm` which uses `runtime-node-refresh` to refresh environment variable without running the node script again. Notice that the message to update environment variable came from other node process.

Create `index.js` file and add the following code:

```javascript
import RnR from 'runtime-node-refresh';

process.env.LOG_LEVEL = 'error';

RnR(() => {
  process.env.LOG_LEVEL = 'debug';
});

setInterval(() => console.log(`The LOG_LEVEL is set to ${process.env.LOG_LEVEL}`), 3000);
```

Create `package.json' file and fill it with the following:
```json
  {
    "name": "test-rnr",
    "scripts": {
      "start": "node index.js",
      "refresh": "runtime-node-refresh"
    },
    "dependencies": {
      "runtime-node-refresh": "^1.0.6"
    }
  }
```

Open two terminals, in the first terminal execute:

```sh
npm start
```


Run the refresh task in the second terminal:

```sh
npm run refresh
```

Back to first termiinal and see if the LOG_LEVEL variable value changed to debug.
## Real life example:

It may be very usefult when you want to restart/update environment variable on running node application without restarting the node server.
The real life example of `RnR` lib usage can be find in the following express based web-application:
https://github.com/przemek-nowicki/node-express-template.ts/blob/master/src/core/utils/logger.ts#L2

**Note:** RnR is using node signals which means it does not work on Worker threads.
It uses SIGPIPE signal to communicate between nodejs processes.
By default the SIGPIPE is ignored by NodeJS. 
However it is recommend to check if you don't have a listener installed on SIGPIPE in your project before you use `RnR` library.