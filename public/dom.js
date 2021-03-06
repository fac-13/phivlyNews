/* eslint-disable */
(function () {
  // Document Selectors here:
  const newsTitle = document.querySelector('#js-newsTitle');
  const newsList = document.querySelector('#js-newsList');
  const countriesContainer = document.getElementById('countries-button');
  const testAnalysis = document.querySelector('#test');

  // Variables here:


  // On-Load listeners:

  fetch('GET', 'search?category=general', displayHeadlines);
  fetch('GET', 'countrylist', populateList);

  // User event listeners:

  countriesContainer.addEventListener('click', function(e) {
    var countryCode = e.target.value;
    fetch('GET', 'search?country=' + countryCode, displayHeadlines);
  })

  // newsList.addEventListener('click', function(e) {
  //   var photoLocation = e.target.value;
  //   console.log(e.target);
  //   fetch('GET', 'analyze?rl=' + photoLocation, displayAnalysis);
  // })


  // DOM manipulation on response:

  function populateList(countryObject) {
		var countryList = Object.keys(countryObject).sort();
		countryList.forEach(country => {
			let button = document.createElement('button');
			button.classList.add('country__button','flag-icon-background', 'flag-icon-' + countryObject[country]);
			button.value = countryObject[country];
			countriesContainer.appendChild(button);
		});
	}

	function displayHeadlines(newsObject) {
		while (newsList.firstChild) {
			newsList.removeChild(newsList.firstChild);
		}

		newsObject.articles.forEach(function(item) {
			var article = document.createElement('article');
			article.classList.add('news__article');
      article.addEventListener('click', function(e) {
        var photoLocation = item.urlToImage;
        console.log(photoLocation);
        fetch('GET', 'analyze?url=' + photoLocation, function(imageObject) {
          console.log(e.target);
          var targetElement = article.lastChild;
          console.log(targetElement);
          imageObject.forEach(function(colour) {
            console.log(colour);
            var wrapper = document.createElement('div');
            wrapper.setAttribute('style', 'background-color:' + colour.raw_hex + ';height:100px;width:' + (colour.value * 100) + '%;display:inline-block;');
            targetElement.appendChild(wrapper);
          })
        });
      })
			var headline = document.createElement('h2');
			// headline.classList.add('article__headline');
			// headline.setAttribute('href', item.url);
			// headline.setAttribute('target', '_blank');
			headline.textContent = item.title;
			var paragraph = document.createElement('p');
			paragraph.classList.add('article_meta');
			var source = document.createElement('span');
			source.classList.add('article__source');
			source.textContent = item.source.name;
			var time = document.createElement('time');
			time.classList.add('article__datetime');
			time.setAttribute('datetime', item.publishedAt);
			time.textContent =
				item.publishedAt.slice(0, 10) + ' ' + item.publishedAt.slice(11, 19);
      var colours = document.createElement('aside');
      colours.setAttribute('style', 'margin:15px;')

			paragraph.appendChild(source);
			paragraph.appendChild(time);
			article.appendChild(headline);
			article.appendChild(paragraph);
      article.appendChild(colours);

			newsList.appendChild(article);
		});
	}

	function displayAnalysis(imageObject) {
		console.log('DOM console logging image: ', imageObject);
	}

	// Function Declaration:

	// Fetch request
	function fetch(method, url, callback) {
		var xhr = new XMLHttpRequest();

		xhr.addEventListener('load', function() {
			if (xhr.readyState === 4 && xhr.status === 200) {
				console.log('fetch is working', url);
				var response = JSON.parse(xhr.responseText);
				callback(response);
			} else {
				console.log('XHR error', xhr.readyState);
			}
		});
		xhr.open(method, url, true);
		xhr.send();
	}
})();
