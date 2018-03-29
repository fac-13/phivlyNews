https://phivly-news.herokuapp.com/

# phivlyNews

What's making headlines around the world? Pick your country, follow the news.

### User Stories

-   [ ]  A Newser can see up-to-date top headlines from around the world on our landing page.
-   [ ]  A Newser can select a country from a list in order to follow the news from just that country.
-   [ ]  A Newser can view top headlines from the country of their choice
-   [ ]  A Newser can see country flags and new sources logos

### Stretch Goals

-   [ ]  The landing page preloaded headlines update every minute
-   [ ]  The landing page headlines are based on Newsers' geolocation.
-   [ ]  Once following a country's headlines, a Newser is updated with news headlines every minute
-   [ ]  A Newser get (pointless) analysis of the news data


### Getting Started

Preliminary focus for week 5 project was to use emojis and the twitter API. The idea was to search for tweets featuring user specified emojis and return those at intervals through a feed. We researched emoji codes and the twitter API. Emojis are interesting... Twitter API documentation is not amazing and the API seems to be intentionally a bit difficult to use casually. The nail was put in the coffin by the discovery that authorisation is via OAuth and not API key.

### News API

We discussed a few other APIs and settled on News API since it featured simple design, clear interface, good documentation, authorisation via instantly accessible API key and constantly updating content. The request process is easy - there are only a few endpoints and parameters.

#### Endpoints:
* Headlines
* Everything (all stories)
* Sources (news sources - BBC, CNN e.g.)

#### Params:
* specify country
* specify source
* specify category (business, sport etc.)
* specify language
* number of results
* etc...


Emojis were still to be involved in some capacity - probably through use of npm modules providing emoji translation or cross referencing facility. Perhaps we would return news stories / headlines for a country of the user's choice and either hard-code substitutions of certain words/phrases for certain emojis or allow the user to choose the substitutions.

This is a nice idea but a little complicated unless we limited ourselves only to the english language, but the range of languages the news was available in was too interesting to sacrifice merely for emojis.

### Getting News

Visitors to the site would be greeted on page load by
1. a header featuring an array of buttons each specifying a country represented by News API (emojis found their way into these buttons thankfully).
2. a main section featuring an instantly generated listing of top headlines from around the world.

On clicking a button for a given country, the user will find that the main section listing of top headlines will be replaced by the top headlines for the country chosen.

### Getting Analysis

For each headline news item - either generated on load or by user click - a further interaction is planned such that the user can hover or click the news item entry to access some analysis of the given content. This would take the form probably of an analysis of the image that accompanies the news item (but which is not displayed on our page). We will use the Clarifai JavaScript client (npm module) to make a request to Clarifai from our server. This request will be for either
* the dominant colour content of the image - what kind of mood is it?
* the object/concept prediction from the clarifai general model - what is displayed in the image?

A further analysis could be through sentiment analysis of either the headline or the summary of the news item (using IBM Watson?). The issue with this, again, is that it depends on the language that the item is listed in. Perhaps we could use a translation API for making this available for all listings but a translation service is prtty much guaranteed to garble any sentmient persisting in the source text...

### Structure/Process

On the back end a JSON file holds the list of available countries as country-name:country-code pairs (France: fr, e.g.).

On page load an IIFE runs in the DOM.js file adding listeners and firing two requests to our server:
1. for the countries JSON
2. for the global top headlines

On return to client side the countries are parsed, linked to the corresponding emoji flag (stored in JSON on front-end), and inserted into the DOM as buttons.

The wrapper for these buttons has an event listener attached so that clicks on the buttons will propogate and fire.

On receiving the initial request for headlines (via the 'search' endpoint) the server parses the attached query string ('category=general' to get general headlines), adds to an options object with the News API url and the API key and makes the request to News API via the request module.

(The 'search' endpoint is used also for subsequent requests to the News API from the front end.)

Headline data is passed back to the front end as an object to be iterated on by the client and inserted in the DOM.

Again, the wrapper for the news headline entries should have an event listener for user requests for pointless analysis...

