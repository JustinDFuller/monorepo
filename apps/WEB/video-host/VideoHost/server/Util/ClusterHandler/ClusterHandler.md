# ClusterHandler

- ClusterHandler deals with all things cluster related.
  - Forking the cluster.
  - Passing in a callback, or method to start the server listening (see ServerHandler and the main index.js).

### How to use

Simply

```javascript
const clusterHandler = require('./ClusterHandler');
```

Then give it your callback method to start the server:

```javascript
const server = require('./ServerHandler');
clusterHandler(server);
```

And you're up and running!
