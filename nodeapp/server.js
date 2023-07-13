const express = require('express');
const server = express();

// Serve static files (HTML, CSS, JS)
server.use(express.static('public'));

// Start the server
const port = 8080;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
