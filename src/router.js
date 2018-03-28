const { staticHandler, searchHandler, analyzeHandler } = require('./handler');

const router = (req, res) => {
  const url = req.url;

  if (url === '/') {
    staticHandler(res, 'public/index.html');
  } else if (url.indexOf('public') !== -1) {
    staticHandler(res, url);
  } else if (url.indexOf('search') !== -1) {
    searchHandler(res, url);
  } else if (url.indexOf('analyze') !== -1) {
    analyzeHandler(res, url);
  }else {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('404 error');
  }
};

module.exports = router;
