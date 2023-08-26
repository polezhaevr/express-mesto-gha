const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf8'
  });
  // в методе end тоже можно передать данные
  res.end('<h1>Привет, мир!</h1>', 'utf8');
});

server.listen(PORT);