const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'e908e313cc9144079962ffe1c86be214'
 });

 app.models.predict(Clarifai.COLOR_MODEL, "https://s.abcnews.com/images/Politics/donald-trump-justice-stevens-gty-jpo-180328_hpMain_16x9_992.jpg").then(
  function(response) {
    // do something with response
    console.log(JSON.stringify(response, null, 2));
  },
  function(err) {
    // there was an error
    console.log(err);
  }
);