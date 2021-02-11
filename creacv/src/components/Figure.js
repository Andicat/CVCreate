import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvElement_activate} from '../redux/cvDataAC';


class Figure extends React.PureComponent {

    static propTypes = {
        id: PropTypes.string.isRequired,
        active: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        style: {},
    };

    state = {
       // style:{...this.props.style},
    }

    onClick = () => {
        this.props.dispatch(cvElement_activate(this));
    }

    render () {
        let className = ' cv__element  cv__element--figure' + (this.props.active?' cv__element--active':'');
        return <div className={className} style={this.props.style} onClick={this.onClick}></div>;
    }
}

export default connect()(Figure);
