const request = require('request');
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

// const countries = require('./countries.json');
// const logic = require('./logic');

const staticHandler = (response, filepath) => {
  const extension = filepath.split('.')[1]; // url or query string?
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
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
  const myURL = new URL('https://newsapi.org/v2/top-headlines');

  console.log(myURL);
  console.log(url);

  const query = qs.parse(url.split('?')[1]);

  console.log(query);

  const options = {
    uri: myURL.href,
    qs: query,
    method: 'GET',
    headers: {
      'X-Api-Key': process.env.APIKEY_NEWS,
    },
  };

  console.log(options);

  request(options, (err, res, body) => {
    console.log('error:', err); // Print the error if one occurred
    console.log('statusCode:', res && res.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the body
    response.end(body);
  });
};

module.exports = {
  staticHandler,
  searchHandler,
};
