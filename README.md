# RnR - runtime-node-refresh

**RnR** - is tiny lib to refresh node setup on runtime without restarting the node server.

# Install

```sh
npm install --save runtime-node-refresh
```

# Usage
 
It may be very usefult when you want to refresh/update your environment variables let's say your log level without restarting node server.

Note: RnR is using node signals which means it does not work on Worker threads.


