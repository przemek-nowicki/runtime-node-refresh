# RnR - runtime-node-refresh

**RnR** - is tiny lib to refresh node setup on runtime without restarting the node server.

# Install

```sh
npm install --save runtime-node-refresh
```

# Usage
 
Following you will find 

Create `index.js` file and add the following code:

```javascript
import RnR from 'runtime-node-refresh';

process.env.LOG_LEVEL = 'error';

RnR(() => {
  process.env.LOG_LEVEL = 'debug';
});

setInterval(() => console.log(`The LOG_LEVEL is set to ${process.env.LOG_LEVEL}`), 5000);
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
      "runtime-node-refresh": "^1.0.3"
    }
  }
```

Open two terminals, in the first terminal execute:

```sh
npm start
```


And run the refresh task in second terminal:

```sh
npm run refresh
```

## Real life example:

It may be very usefult when you want to restart/update environment variable on running node application without restarting the node server.

Note: RnR is using node signals which means it does not work on Worker threads.


