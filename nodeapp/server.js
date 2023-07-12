const express = require('express');
const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
