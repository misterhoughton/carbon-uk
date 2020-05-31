import React from 'react';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import UIkit from 'uikit';

import Alert from './Components/Alert';
import ApiClient from './Api/ApiClient';
import RegionsMap from './Components/CarbonData/RegionsMap';
import Slider from './Components/Slider.js';
import PageHeader from './Components/PageHeader/PageHeader';

// import Test from test;

import './index.scss';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      alert: {
        code: null,
        message: null,
      },
      regionsData: {
        regions: [],
      },
      selectedRegion: {
        generationmix: [],
        intensity: {},
      },
      newsArticles: [],
    };
    this.dateSlider.handleChange = this.dateSlider.handleChange.bind(this);
    this.setSelectedRegion = this.setSelectedRegion.bind(this);
  }
  dateSlider = (function() {
    const startDate = 'March 23, 2020',
      getLength = function() {
        const dayZero = moment(new Date(startDate)),
          now = moment(new Date()),
          length = now.diff(dayZero, 'days');

        return length;
      },
      handleChange = function(event) {
        const dateFormat = 'YYYY-MM-DD',
          apiClient = new ApiClient(),
          dayZero = moment(new Date(startDate)),
          selectedDate = dayZero.add(event.target.value, 'days'),
          dateFrom = selectedDate.format(dateFormat),
          dateTo = selectedDate.add(1, 'days').format(dateFormat);

        apiClient
          .getCarbonIntensity(dateFrom, dateTo)
          .then(body => {
            if (body.error) {
              throw body;
            }
            this.setState({
              regionsData: body.data[0] || [],
            });
            return apiClient.getNews(dateFrom, dateTo);
          })
          .then(body => {
            this.setState({
              newsArticles: body.response.results || [],
            });
          })
          .catch(error => {
            if (error.hasOwnProperty('error')) {
              this.setState({
                alert: {
                  code: error.error.code,
                  message: error.error.message,
                },
              });
              return;
            }
            this.setState({
              alert: {
                code: 'Nope',
                message: `Not happening. Don't give up`,
              },
            });
          });
      };

    return {
      getLength: getLength,
      handleChange: handleChange,
    };
  })();

  setSelectedRegion = function(region) {
    this.setState({
      selectedRegion: region,
    });
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <Alert
          code={this.state.alert.code}
          message={this.state.alert.message}
        />
        <PageHeader
          dateFrom={this.state.regionsData.to}
          dateTo={this.state.regionsData.from}
        />
        <Slider
          onChange={this.dateSlider.handleChange}
          max={this.dateSlider.getLength()}
        />
        <RegionsMap
          setSelectedRegion={this.setSelectedRegion}
          selectedRegion={this.state.selectedRegion}
          regions={this.state.regionsData.regions}
          newsArticles={this.state.newsArticles}
        />
      </div>
    );
  }
}

export default App;
