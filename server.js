require = require('esm')(module /*, options*/);
const http = require('http');
const fs = require('fs-extra');
const path = require('path');
import { fetchData } from './index.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url.endsWith('.css')) {
    res.writeHead(200, {'Content-Type': 'text/css'});
    const cssStream = fs.createReadStream(path.join(__dirname, req.url));
    cssStream.pipe(res);
  } else if (req.url.endsWith('.json')) {
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename=news.json'
    });
    fetchData()
      .then(blob => {
        const fileURL = URL.createObjectURL(blob);
        const fileStream = fs.createReadStream(fileURL.substring(7));
        fileStream.pipe(res);
      })
      .catch(error => {
        console.error(error);
        res.statusCode = 500;
        res.end();
      });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
