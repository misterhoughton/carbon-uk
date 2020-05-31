import React from 'react';

class PiechartLabel extends React.Component {
  constructor(props) {
    super(props);
    this[this.props.fuel] = React.createRef();
  }
  setBBox = function(){
    if (this[this.props.fuel].current) {
      this.props.setLabelBBox(
        this.props.fuel,
        this[this.props.fuel].current.getBBox()
      );
    }
  }
  
  componentDidMount() {
    this.setBBox();
  }

  componentDidUpdate() {
    this.setBBox();
  }

  render() {
    return (
      <g id={this.props.id}>
        <text
          x={this.props.x}
          y={this.props.y}
          className="label"
          ref={this[this.props.fuel]}
        >
          {this.props.fuel}
        </text>
      </g>
    );
  }
}

function PiechartLabelMask(props) {
  if (props.bBox !== undefined) {
    const bBox = {
      x: props.bBox.x,
      y: props.bBox.y,
      width: props.bBox.width,
      height: props.bBox.height,
    };
    return (
      <mask id={props.id}>
        <rect x="0" y="0" width="100%" height="100%" fill="white" />
        <rect
          className="label-mask"
          x={bBox.x}
          y={bBox.y}
          width={bBox.width}
          height={bBox.height}
        />
      </mask>
    );
  }
  return null;
}

class PiechartLine extends React.Component {
  viewWidth = 150;
  viewHeight = 100;
  strokeWidth = 1;
  centreX = this.viewWidth / 2;
  centreY = this.viewHeight / 2;
  circleRadius = this.viewHeight / 3.5 - this.strokeWidth * 2;

  constructor(props) {
    super(props);
    this.state = {
      labelBBoxes: {},
    };
    this.setLabelBBox = this.setLabelBBox.bind(this);
  }

  setLabelBBox = function(labelKey, labelBBox) {
    let labelBBoxes = this.state.labelBBoxes;
    if (
      !labelBBoxes.hasOwnProperty(labelKey) ||
      labelBBoxes[labelKey].x !== labelBBox.x
    ) {
      labelBBoxes[labelKey] = labelBBox;
      this.setState({
        labelBBoxes: labelBBoxes,
      });

      this.forceUpdate();
    }
  };

  getPropsForSvg = function(fuelTypes) {
    const offsetCache = (function() {
        // Set initial offset 45% to horizontal:
        let offsetAngle = -(2 * Math.PI) / 4;
        return {
          get: function() {
            return offsetAngle;
          },
          set: function(angle) {
            offsetAngle = angle;
          },
        };
      })(),
      getAngleByPerc = function(perc) {
        const radians = 2 * Math.PI,
          angle = (radians / 100) * perc;
        return angle;
      };

    return fuelTypes
      .filter(fuelType => {
        return fuelType.perc > 2;
      })
      .map(fuelType => {
        const offset = offsetCache.get(),
          fuelTypeAngle = getAngleByPerc(fuelType.perc),
          labelAngle = fuelTypeAngle / 2 + offset,
          sliceAngle = fuelTypeAngle + offset,
          label = {
            x: this.centreX + (this.circleRadius + 15) * Math.cos(labelAngle),
            y: this.centreY + (this.circleRadius + 15) * Math.sin(labelAngle),
            angle: 0,
          },
          labelLine = {
            x1: this.centreX + this.circleRadius * Math.cos(labelAngle),
            y1: this.centreY + this.circleRadius * Math.sin(labelAngle),
            x2: this.centreX + (this.circleRadius + 15) * Math.cos(labelAngle),
            y2: this.centreY + (this.circleRadius + 15) * Math.sin(labelAngle),
          },
          sliceLine = {
            x: this.centreX + this.circleRadius * Math.cos(sliceAngle),
            y: this.centreY + this.circleRadius * Math.sin(sliceAngle),
          };
        offsetCache.set(sliceAngle);
        return {
          fuel: fuelType.fuel,
          label: label,
          labelLine: labelLine,
          sliceLine: sliceLine,
        };
      });
  };

  render() {
    const fuelTypes = this.getPropsForSvg(this.props.fuelTypes);

    return (
      <svg
        version="1.1"
        viewBox={`0 0 ${this.viewWidth} ${this.viewHeight}`}
        xmlns="http://www.w3.org/2000/svg"
        className="piechart"
      >
        <circle
          className="pie"
          cx={this.centreX}
          cy={this.centreY}
          r={this.circleRadius}
        />
        {fuelTypes.map(fuelType => (
          <g key={fuelType.fuel}>
            <PiechartLabelMask
              id={fuelType.fuel}
              bBox={this.state.labelBBoxes[fuelType.fuel]}
            />
            <line
              x1={this.centreX}
              y1={this.centreY}
              x2={fuelType.sliceLine.x}
              y2={fuelType.sliceLine.y}
              className="slice-line"
            />
            <line
              x1={fuelType.labelLine.x1}
              y1={fuelType.labelLine.y1}
              x2={fuelType.labelLine.x2}
              y2={fuelType.labelLine.y2}
              className="label-line"
              mask={`url(#${fuelType.fuel})`}
            />
            <PiechartLabel
              x={fuelType.label.x}
              y={fuelType.label.y}
              fuel={fuelType.fuel}
              setLabelBBox={this.setLabelBBox}
            />
          </g>
        ))}
      </svg>
    );
  }
}

export default PiechartLine;
