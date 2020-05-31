import React from 'react';

class Piechart extends React.PureComponent {
  getOffset = function(arrayIndex) {
    let offset = 0;
    if (arrayIndex === 0) {
      return offset;
    }
    for (let i = 0; i < arrayIndex; i++) {
      offset = this.props.fuelTypes[i].perc + offset;
    }
    return -offset;
  };
  getClassName = function(fuel) {
    return{
      biomass: 'biomass',
      coal: 'coal',
      imports: 'imports',
      gas: 'gas',
      nuclear: 'nuclear',
      other: 'other',
      hydro: 'hydro',
      solar: 'solar',
      wind: 'wind',
    }[fuel];
  };
 
  render() {
    return (
      <svg
        version="1.1"
        viewBox="0 0 63.6 63.6"
        xmlns="http://www.w3.org/2000/svg"
        className="piechart"
      >
        {this.props.fuelTypes.map((fuelType, index) => (
          <circle
            style={this.style}
            key={fuelType.fuel}
            cx="31.8"
            cy="31.8"
            r="15.9"
            className={this.getClassName(fuelType.fuel)}
            strokeWidth="31.8"
            strokeDasharray={`${fuelType.perc} 158`}
            strokeDashoffset={this.getOffset(index)}
          />
        ))}
      </svg>
    );
  }
}

export default Piechart;
