const handler = require('./hander');

const router = (req, res) => {
	const url = req.url;

	if (url === '/') {
		staticHandler(res, 'public/index.html');
	} else if (url.indexOf('public') !== -1) {
		staticHandler(res, url);
	} else if (url.indexOf('search') !== -1) {
		searchHandler(res, url);
	} else {
		response.writeHead(404, { 'content-type': 'text/plain' });
		response.end('404 error');
	}
};

module.exports = router;
