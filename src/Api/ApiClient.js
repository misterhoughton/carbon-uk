const APIKEYS = require('./ApiKeys.json');

function ApiClient() {
  const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    getCarbonIntensity = function(dateFrom, dateTo) {
      return fetch(
        `https://api.carbonintensity.org.uk/regional/intensity/${dateFrom}/${dateTo}`,
        config
      ).then(response => {
        return response.json();
      });
    },
    getNews = function(dateFrom, dateTo, section) {
      const params = new URLSearchParams({
          'api-key': APIKEYS.GUARDIAN_OPEN_PLATFORM,
          'use-date': 'first-publication',
          'from-date': dateFrom,
          'to-date': dateTo,
          q: 'corona OR virus OR covid OR lockdown',
          section: section || 'uk-news',
          'order-by': 'newest',
        }),
        searchParams = new URLSearchParams(params);
      return fetch(
        `https://content.guardianapis.com/search?${searchParams}`,
        config
      ).then(response => {
        return response.json();
      });
    };
  return {
    getCarbonIntensity: getCarbonIntensity,
    getNews: getNews,
  };
}

export default ApiClient;
