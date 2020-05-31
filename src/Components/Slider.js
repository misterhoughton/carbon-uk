import React from 'react';

function Slider(props) {
  let timer;
  // Prevent the slider event firing too quick and making too many calls:
  const delaySlider = function(event) {
    event.persist()
    clearTimeout(timer);
    timer = setTimeout(() => {
      return props.onChange(event);
    }, 50);
  };
  return (
    <div>
      <input
        className="uk-range"
        type="range"
        min="0"
        max={props.max}
        step="1"
        onInput={delaySlider}
      />
    </div>
  );
}

export default Slider;
