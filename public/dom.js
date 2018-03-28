(function() {
	// Document Selectors here:
	const newsTitle = document.querySelector('#js-newsTitle');
	const newsList = document.querySelector('#js-newsList');
	const testAnalysis = document.querySelector('#test');

	// Variables here:

	// On-Load listeners:
	fetch('GET', 'search?category=general', displayHeadlines);
	fetch('GET', 'countrylist', populateList);

	// User event listeners:
	testAnalysis.addEventListener('click', function() {
		fetch(
			'GET',
			'analyze?url=https://s.abcnews.com/images/Politics/donald-trump-justice-stevens-gty-jpo-180328_hpMain_16x9_992.jpg',
			displayAnalysis
		);
	});

	// Country Search Listener:
	var countryCode = 'cn';
	// fetch('GET', `search?country=${countryCode}`, displayHeadlines);

	// DOM manipulation on response:
	function populateList(countryObject) {
		console.log(countryObject);
	}

	function displayHeadlines(newsObject) {
		// Takes nearly 400ms - refactor for speed!!!
		newsObject.articles.forEach(function(item) {
			let article = document.createElement('article');
			let headline = document.createElement('h2');
			headline.textContent = item.title;
			let paragraph = document.createElement('p');
			let source = document.createElement('span');
			source.textContent = item.source.name;
			let time = document.createElement('time');
			time.setAttribute('datetime', item.publishedAt);
			time.textContent = `${item.publishedAt.slice(
				0,
				10
			)} ${item.publishedAt.slice(11, 19)}`;

			paragraph.appendChild(source);
			paragraph.appendChild(time);
			article.appendChild(headline);
			article.appendChild(paragraph);

			newsList.appendChild(article);
		});
	}

	function displayAnalysis(imageObject) {
		//console.log('DOM console logging image: ', imageObject);
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
