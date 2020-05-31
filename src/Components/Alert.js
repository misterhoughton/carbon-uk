import React from 'react';

class Alert extends React.Component {
  render() {
    let code, message;

    if (
      typeof this.props.code === 'string' &&
      typeof this.props.message === 'string'
    ) {
      code = this.props.code;
      message = this.props.message;

      return (
        <div className="uk-alert-danger" data-uk-alert>
          <span className="uk-text-bold">{code}</span> - {message}
        </div>
      );
    }
    return null;
  }
}

export default Alert;
