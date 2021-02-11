import React from 'react';
import PropTypes from 'prop-types';

class Tools extends React.PureComponent {

  static propTypes = {
    block: PropTypes.string.isRequired,
  };

  render () {
    return (
      <div className="tools">
      </div>
    );
  }

}

export default Tools;
