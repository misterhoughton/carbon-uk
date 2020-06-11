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
    },
    getWeather = function() {
      const params = new URLSearchParams({
        'key': APIKEYS.MET_OFFICE_DATAPOINT
      }),
      searchParams = new URLSearchParams(params);

      return fetch(
        `http://datapoint.metoffice.gov.uk/public/data/layer/wxfcs/all/json/capabilities?${searchParams}`,
        {}
      ).then(response => {
        return response.json();
      }).then(body => {
        const layerName = 'Temperature',
              imageFormat = 'png',
              defaultTime = '2020-06-07T15:00:00',
              timeStep = '0';

        let baseUrl = body.Layers.BaseUrl.$;

        baseUrl = baseUrl.replace('{LayerName}', layerName);
        baseUrl = baseUrl.replace('{ImageFormat}', imageFormat);
        baseUrl = baseUrl.replace('{DefaultTime}', defaultTime);
        baseUrl = baseUrl.replace('{Timestep}', timeStep);
        baseUrl = baseUrl.replace('{key}', APIKEYS.MET_OFFICE_DATAPOINT);

        return baseUrl;
      });
    };

  return {
    getCarbonIntensity: getCarbonIntensity,
    getNews: getNews,
    getWeather: getWeather,
  };
}

export default ApiClient;
