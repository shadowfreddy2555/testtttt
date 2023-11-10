const http = require('http');
const crypto = require('crypto');

// Function to generate a random string for the URL
function generateRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

// Generate a random string of length 6 for the URL
const randomString = generateRandomString(6);

// Create a simple HTTP server to keep the Replit process alive
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`I'm alive! Server URL: https://shadowfreddy555.${req.headers.host}/${randomString}`);
  res.end();
});

server.listen(8080, () => {
  console.log(`Server is running at http://localhost:8080`);
});
