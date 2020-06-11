import React from 'react';

function WeatherOverlay(props) {
  return (
    <image
    className="weather-overlay"
      href={props.weatherImg}
      x="-160"
      y="-160"
      height="160%"
      width="160%"
    />
  );
}
export default WeatherOverlay;
