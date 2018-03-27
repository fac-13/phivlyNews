const request = require('request');
const reqpromise = require('request-promise');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path');
const countries = require('./countries.json');
const logic = require('./logic');

const staticHandler = (response, filepath) => {
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
			response.writeHead(500, { 'content-type': 'text/plain' });
			response.end('server error');
		} else {
			response.writeHead(200, { 'content-type': extensionType[extension] });
			response.end(file);
		}
	});
};

const searchHandler = (response, url) => {
	//	let result = logic.searchQuery(url);
	response.writeHead(200, { 'content-type': 'application/json' });
	response.end(JSON.stringify(result));
};

module.exports = {
	staticHandler,
	searchHandler
};
