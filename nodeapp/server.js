/* const express = require('express');
const server = express();

// Serve static files (HTML, CSS, JS)
server.use(express.static('public'));

// Start the server
const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); */


const express = require('express');
const prometheus = require('prom-client');

const server = express();

// Create custom metrics
const customMetric = new prometheus.Counter({
  name: 'my_custom_metric',
  help: 'A custom metric to monitor something',
});

// Example endpoint to increase the custom metric value
server.get('/example', (req, res) => {
  // Your application logic here
  // ...

  // Increase the custom metric value
  customMetric.inc();

  res.send('Example endpoint');
});

// Metrics endpoint to expose Prometheus metrics
server.get('/metrics', (req, res) => {
  res.set('Content-Type', prometheus.register.contentType);
  res.end(prometheus.register.metrics());
});

// Serve static files (HTML, CSS, JS)
server.use(express.static('public'));

// Start the server
const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



