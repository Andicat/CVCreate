import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvElement_activate} from '../redux/cvDataAC';

class Text extends React.PureComponent {

    static propTypes = {
        id: PropTypes.string.isRequired,
        active: PropTypes.bool,
        style: PropTypes.object,
        text: PropTypes.string,
    };

    static defaultProps = {
        style: {},
        text: '',
    };

    state = {
        //fontsize: this.props.style.fontsize,
        //style:{...this.props.style},
        //text: this.props.text,
    }

    onClick = () => {
        this.props.dispatch(cvElement_activate(this));
    }

    render () {
        let className = ' cv__element  cv__element--text' + (this.props.active?' cv__element--active':'');
        return <span className={className} style={this.props.style} onClick={this.onClick}>{this.props.text}</span>;
    }
}

export default connect()(Text);
