## Usage

```
const bunyan = require('bunyan');
const bunyanRequest = require('micro-bunyan-request');

const logger = bunyan.createLogger({ name: 'My App' });
const logreq = bunyanRequest({
  logger: logger,
  headerName: 'x-request-id'
});

module.exports = logreq(async (req, res) => `Hello world`);
```

## Credits

Adapted: [vvo/bunyan-request](https://github.com/vvo/bunyan-request) for micro
