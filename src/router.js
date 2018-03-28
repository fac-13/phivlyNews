const handler = require('./handler');

const router = (req, res) => {
  const { url } = req;

  if (url === '/') {
    handler.staticHandler(res, 'public/index.html');
  } else if (url.indexOf('public') !== -1) {
    handler.staticHandler(res, url);
  } else if (url.indexOf('search') !== -1) {
    handler.searchHandler(res, url);
  } else {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('404 error');
  }
};

module.exports = router;
