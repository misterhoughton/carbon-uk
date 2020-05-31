import React from 'react';

class RegionHeader extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="uk-column-1-2">
          <h3 className="uk-heading-divider uk-margin-remove-top">
            {this.props.region.shortname}
          </h3>
          <p className="uk-text-primary uk-margin-remove-top">
            {this.props.region.intensity.forecast} -{' '}
            {this.props.region.intensity.index}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

class FuelType extends React.Component {
  render() {
    return (
      <div>
        <p>
          {this.props.fuel}
          <br />
          {this.props.perc}%
        </p>
      </div>
    );
  }
}

class Region extends React.Component {
  render() {
    return (
      <div
        className="uk-grid-match uk-child-width-1-5@m uk-margin-remove-top"
        data-uk-grid
      >
        {this.props.region.generationmix.map(fuelType => (
          <FuelType
            key={fuelType.fuel}
            fuel={fuelType.fuel}
            perc={fuelType.perc}
          />
        ))}
      </div>
    );
  }
}

export { Region, RegionHeader };
