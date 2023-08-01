const express = require('express');
const Prometheus = require('prom-client');

const server = express();

// Serve static files (HTML, CSS, JS)
server.use(express.static('public'));

// Init Prometheus Histogram for HTTP request duration
const httpRequestDurationMicroseconds = new Prometheus.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route'],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500]
});

// Middleware to measure response time and observe the duration
server.use(async (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const responseTimeInMs = Date.now() - start;
    httpRequestDurationMicroseconds
      .labels(req.route.path)
      .observe(responseTimeInMs);
  });
  next();
});

// Metrics endpoint
server.get('/metrics', async (req, res) => {
  try {
    const metrics = await Prometheus.register.metrics();
    res.set('Content-Type', Prometheus.register.contentType);
    res.end(metrics);
  } catch (err) {
    console.error('Error while generating metrics:', err);
    res.status(500).send('Error while generating metrics');
  }
});

// Start the server
const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
