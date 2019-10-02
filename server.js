const next = require('next');
const http = require('http');
const shortRedirection = require('./utils/handlers/shortRedirection');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handleNextRequests = app.getRequestHandler();

app.prepare().then(() => {
  const server = new http.Server(async (req, res) => {
    const redirected = await shortRedirection(req, res);
    if (redirected) {
      return;
    }
    handleNextRequests(req, res);
  });

  server.listen(3000, err => {
    if (err) {
      throw err;
    }

    console.log(`> Ready on http://localhost:3000`);
  });
});
