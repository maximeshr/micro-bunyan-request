const uuid = require('uuid');

module.exports = (options) => (handler) => (req, res, ...restArgs) => {
  const logger = options.logger;
  const headerName = options.headerName || 'x-request-id';
  const id = req.headers[headerName] || uuid.v4();
  const now = Date.now();
  const startOpts = { req };

  req.logger = logger.child({
    type: 'request',
    id: id,
    serializers: logger.constructor.stdSerializers
  });

  if (req.body) {
    startOpts.body = req.body;
  }

  res.setHeader(headerName, id);

  req.logger.info(startOpts, `Request ${id} started`);

  const time = process.hrtime();

  res.on('finish', () => {
    const diff = process.hrtime(time);
    req.logger.info(
      { res: res, duration: diff[0] * 1e3 + diff[1] * 1e-6 },
      `Request ${id} ended`
    );
  });

  return handler(req, res, ...restArgs);
};
