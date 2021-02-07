import React from 'react';
import PropTypes from 'prop-types';
import CVEvents from './events';
import move from './move'

class Image extends React.PureComponent {

  static propTypes = {
    id: PropTypes.number,
  };

  onMouseDown = (evt) => {
    move(evt);
  }

  render () {
    

    return (
      <div className="image" onMouseDown={this.onMouseDown}>
          <img src={this.props.src}></img>
      </div>
    );
  }

}

export default Image;
