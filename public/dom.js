(function () {
  // Document Selectors here:


  // Variables here:


  // On-Load listeners:

  fetch('GET', 'search?category=general', displayHeadlines)


  // DOM manipulation on response:

  function displayHeadlines(x) {
    console.log('x');
  }


  // Function Declaration:
 
  //   Fetch requests
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