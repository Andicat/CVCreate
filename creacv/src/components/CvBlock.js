import React from 'react';
import PropTypes from 'prop-types';
import { move } from './move'

class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number,
    };

    onMouseDown = (evt) => {
        move(evt);
    }

    render () {

    return (
        <div className="cv__block" onMouseDown={this.onMouseDown}>
            {this.props.children}
        </div>
        );
    }
}

export default CvBlock;
