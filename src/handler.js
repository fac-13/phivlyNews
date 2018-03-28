const request = require('request');
//const reqpromise = require('request-promise');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const countries = require('./countries.json');
const logic = require('./logic');

const staticHandler = (res, filepath) => {
	const extension = filepath.split('.')[1]; //url or query string?
	const extensionType = {
		html: 'text/html',
		css: 'text/css',
		js: 'application/javascript',
		ico: 'image/x-icon',
		svg: 'image/svg+xml'
	};

	fs.readFile(path.join(__dirname, '..', filepath), 'utf8', (error, file) => {
		if (error) {
			res.writeHead(500, { 'content-type': 'text/plain' });
			res.end('server error');
		} else {
			res.writeHead(200, { 'content-type': extensionType[extension] });
			res.end(file);
		}
	});
};

const searchHandler = (res, url) => {
	request(url, (apiError, apiResponse, apiBody) => {
		console.log('apiError:', apiError);
		console.log('apiRes statusCode:', apiResponse && apiResponse.statusCode);
		console.log('apiRes body:', apiBody);

		if (apiError) {
			res.writeHead(apiResponse.statusCode, { 'content-type': 'text/plain' });
			res.end(`api request error: ${apiResponse.statusCode}`);
		} else {
			// Pure function logic goes here if needed
			res.writeHead(200, { 'content-type': extensionType[extension] });
			res.end(apiBody);
		}
	});
};

module.exports = {
	staticHandler,
	searchHandler
};
