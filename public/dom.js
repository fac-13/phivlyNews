/* eslint-disable */
(function() {
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
	});

	// testAnalysis.addEventListener('click', function() {
	//   fetch('GET', 'analyze?url=https://s.abcnews.com/images/Politics/donald-trump-justice-stevens-gty-jpo-180328_hpMain_16x9_992.jpg', displayAnalysis)
	// })

	// DOM manipulation on response:

	function populateList(countryObject) {
		var myFlags = flags();
		var countryList = Object.keys(countryObject);
		countryList.forEach(country => {
			let button = document.createElement('button');
			button.classList.add('country__button');
			// button.textContent = country + ' ';
			button.textContent += myFlags[countryObject[country]];
			button.value = countryObject[country];
			countriesContainer.appendChild(button);
		});
	}

	function displayHeadlines(newsObject) {
		while (newsList.firstChild) {
			newsList.removeChild(newsList.firstChild);
		}

		newsObject.articles.forEach(function(item) {
			let article = document.createElement('article');
			article.classList.add('news__article');
			let headline = document.createElement('h2');
			headline.classList.add('article__headline');
			headline.textContent = item.title;
			let paragraph = document.createElement('p');
			paragraph.classList.add('article_meta');
			let source = document.createElement('span');
			source.classList.add('article__source');
			source.textContent = item.source.name;
			let time = document.createElement('time');
			time.classList.add('article__datetime');
			time.setAttribute('datetime', item.publishedAt);
			time.textContent =
				item.publishedAt.slice(0, 10) + item.publishedAt.slice(11, 19);
			paragraph.appendChild(source);
			paragraph.appendChild(time);
			article.appendChild(headline);
			article.appendChild(paragraph);

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
