(function () {
  // Document Selectors here:
  const newsTitle = document.querySelector('#js-newsTitle');
  const newsList = document.querySelector('#js-newsList');

  // Variables here:


  // On-Load listeners:

  fetch('GET', 'search?category=general', displayHeadlines)


  // DOM manipulation on response:

  function displayHeadlines(newsObject) {
    // console.log(newsObject);
    var keys =['source.name', 'title', 'url', 'publishedAt'];
    newsObject.articles.forEach(function(item) {
      var article = {
        source: item.source.name,
        title: item.title,
        url: item.url,
        date: (item.publishedAt).slice(0, 10),
        time: (item.publishedAt).slice(11, 19)
      };
      console.log(article);
    });
    
  }


  // Function Declaration:
 
  // Fetch request
  function fetch(method, url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log("fetch is working", url);
        var response = JSON.parse(xhr.responseText);
        callback(response);
      } else {
        console.log("XHR error", xhr.readyState);
      }
    });
    xhr.open(method, url, true);
    xhr.send();
  }

}());