import React from 'react';

function Alert(props) {
    if (
      typeof props.code === 'string' &&
      typeof props.message === 'string'
    ) {
      return (
        <div className="uk-alert-danger" data-uk-alert>
          <span className="uk-text-bold">{props.code}</span> - {props.message}
        </div>
      );
    }
    return null;
}

export default Alert;
