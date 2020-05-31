import React from 'react';
import moment from 'moment';

function PageHeader(props) {
  const getDateRangeUiString = (dateTo, dateFrom) => {
    let momDateTo, momDateFrom;

    if (typeof dateTo !== 'string' || typeof dateFrom !== 'string') {
      return '';
    }

    momDateTo = moment(new Date(dateTo));
    momDateTo = moment(new Date(dateFrom));

    if (momDateTo.isSame(dateFrom, 'day')) {
      return moment(dateFrom).format('dddd, MMMM Do YYYY');
    }
    return `${momDateFrom.format('dddd, MMMM Do YYYY')} to ${momDateTo.format(
      'dddd, MMMM Do YYYY'
    )}`;
  };

  return (
    <div className="uk-section uk-section-primary uk-section-xsmall">
      <div className="uk-container">
        <div className="uk-column-1-2">
          <h2 className="uk-heading-xsmall">Carbon Intensity Data UK</h2>
          <p>{getDateRangeUiString(props.dateFrom, props.dateTo)}</p>
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
