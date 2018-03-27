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

const searchHandler = url => {
	request(url, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		console.log('body:', body); // Print the body
	});
};

module.exports = {
	staticHandler,
	searchHandler
};
