const request = require("request");
const qs = require("querystring");
// const reqpromise = require('request-promise');
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const countries = require("./countries.json")

// const countries = require('./countries.json');
// const logic = require('./logic');

const staticHandler = (res, filepath) => {
  const extension = filepath.split(".")[1]; // url or query string?
  const extensionType = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    ico: "image/x-icon",
    svg: "image/svg+xml"
  };

  fs.readFile(path.join(__dirname, "..", filepath), "utf8", (error, file) => {
    if (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("server error");
    } else {
      res.writeHead(200, { "content-type": extensionType[extension] });
      res.end(file);
    }
  });
};

const countryListHandler = (res, filepath) => {
  console.log('CountryListHandler reached')
  fs.readFile(path.join(__dirname, filepath), "utf8", (error, file) => {
    if (error) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("server error");
    } else {
      res.writeHead(200, { "content-type": 'application/json' });
      console.log(file);
      res.end(file);
    }
  });
}

const searchHandler = (res, url) => {
  try {
    const myURL = new URL("https://newsapi.org/v2/top-headlines");

    // console.log(myURL);
    // console.log(url);

    const query = qs.parse(url.split("?")[1]);

    // console.log(query);

    const options = {
      uri: myURL.href,
      qs: query,
      method: "GET",
      headers: {
        "X-Api-Key": process.env.APIKEY_NEWS
      }
    };

    // console.log(options);

    request(options, (apiError, apiResponse, apiBody) => {
      // console.log("apiError:", apiError);
      // console.log("apiRes statusCode:", apiResponse && apiResponse.statusCode);
      // console.log("apiRes body:", apiBody);

      if (apiError) {
        res.writeHead(apiResponse.statusCode, { "content-type": "text/plain" });
        res.end(`api request error: ${apiResponse.statusCode}`);
      } else {
        // Pure function logic goes here if needed
        res.writeHead(200, { "content-type": "application/json" });
        res.end(apiBody);
      }
    });
  } catch (error){
    console.log('Error, could not initiate API request');
    return error.message;
  }
    
   
};

const analyzeHandler = (res, url) => {

  const query = qs.parse(url.split('?')[1])

  console.log(query);

  const Clarifai = require('clarifai');

  const app = new Clarifai.App({
    apiKey: `${process.env.APIKEY_PHOTO}`
  });

  app.models.predict(Clarifai.COLOR_MODEL, query.url).then(
    function(result) {
      // do something with response
      // console.log(JSON.stringify(response, null, 2));

      res.end(JSON.stringify(result.outputs[0].data.colors, null, 2));
    },
    function(err) {
      // there was an error
      console.log(err);
    }
  );

  // request(options, (apiError, apiResponse, apiBody) => {
  //   console.log('apiError:', apiError);
  //   console.log('apiRes statusCode:', apiResponse && apiResponse.statusCode);
  //   console.log('apiRes body:', apiBody);

  //   if (apiError) {
  //     res.writeHead(apiResponse.statusCode, { 'content-type': 'text/plain' });
  //     res.end(`api request error: ${apiResponse.statusCode}`);
  //   } else {
  //     // Pure function logic goes here if needed
  //     res.writeHead(200, { 'content-type': 'application/json' });
  //     res.end(apiBody);
  //   }
  // });
};

module.exports = {
  staticHandler,
  searchHandler,
  analyzeHandler,
  countryListHandler
};
