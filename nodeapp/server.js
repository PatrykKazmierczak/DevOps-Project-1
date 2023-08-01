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
  buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500],
});

// Custom Prometheus Gauge for operational metrics
const operationalMetrics = {
  passRate: new Prometheus.Gauge({
    name: 'pass_rate',
    help: 'Pass rate of HTTP requests',
  }),
  errorRate: new Prometheus.Gauge({
    name: 'error_rate',
    help: 'Error rate of HTTP requests',
  }),
  effectivePassRate: new Prometheus.Gauge({
    name: 'effective_pass_rate',
    help: 'Effective pass rate of HTTP requests',
  }),
  rpm: new Prometheus.Gauge({
    name: 'rpm',
    help: 'Request Per Minute (RPM) of HTTP requests',
  }),
  medianLatency: new Prometheus.Gauge({
    name: 'median_latency',
    help: 'Median latency of HTTP requests in ms',
  }),
  availability: new Prometheus.Gauge({
    name: 'availability',
    help: 'Availability of the application',
  }),
};

// Custom Prometheus Gauge for adoption metrics
const adoptionMetrics = {
  uniqueApiConsumers: new Prometheus.Gauge({
    name: 'unique_api_consumers',
    help: 'Number of unique API consumers',
  }),
  timeToFirstCall: new Prometheus.Gauge({
    name: 'time_to_first_call',
    help: 'Time to first API call in ms',
  }),
  apiUsageGrowth: new Prometheus.Gauge({
    name: 'api_usage_growth',
    help: 'API usage growth rate',
  }),
};

// Middleware to measure response time and observe the duration
server.use(async (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const responseTimeInMs = Date.now() - start;
    httpRequestDurationMicroseconds.labels(req.route.path).observe(responseTimeInMs);
  });
  next();
});

// Middleware to calculate operational metrics
server.use(async (req, res, next) => {
  // Logic to calculate operational metrics (replace with your actual calculations)
  const passRate = 0.99;
  const errorRate = 0.01;
  const effectivePassRate = 0.999;
  const rpm = 150;
  const medianLatency = 50;
  const availability = 0.9999;

  // Update Prometheus Gauges with the calculated metrics
  operationalMetrics.passRate.set(passRate);
  operationalMetrics.errorRate.set(errorRate);
  operationalMetrics.effectivePassRate.set(effectivePassRate);
  operationalMetrics.rpm.set(rpm);
  operationalMetrics.medianLatency.set(medianLatency);
  operationalMetrics.availability.set(availability);

  next();
});

// Middleware to calculate adoption metrics
server.use(async (req, res, next) => {
  // Logic to calculate adoption metrics (replace with your actual calculations)
  const uniqueApiConsumers = 50;
  const timeToFirstCall = 200;
  const apiUsageGrowth = 0.1;

  // Update Prometheus Gauges with the calculated metrics
  adoptionMetrics.uniqueApiConsumers.set(uniqueApiConsumers);
  adoptionMetrics.timeToFirstCall.set(timeToFirstCall);
  adoptionMetrics.apiUsageGrowth.set(apiUsageGrowth);

  next();
});

// Metrics endpoint for Prometheus
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
