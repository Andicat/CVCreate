import React from 'react';
import PropTypes from 'prop-types';

class Figure extends React.PureComponent {

    static propTypes = {
        style: PropTypes.object,
    };

    static defaultProps = {
        style: {},
    };

    state = {
        style:{...this.props.style},
    }

    onClick = (evt) => {
        //console.log('edit figure');
        //edit(evt);
    }

    render () {
        return <div className="cv__figure" style={this.state.style} onClick={this.onClick}></div>;
    }
}

export default Figure;
