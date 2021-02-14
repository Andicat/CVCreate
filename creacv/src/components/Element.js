import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvBlock_activate} from '../redux/cvDataAC';
import {optionRenderFunc} from './move'

class Element extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
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
        this.props.dispatch(cvBlock_activate(this));
    }

    render () {
        let className = 'cv__element' + (this.props.active?' cv__element--active':'');
        return optionRenderFunc(this.props.type, this.props.text, this.props.style, className, this.onClick);
        //return <span className={className} style={this.props.style} onClick={this.onClick}>{this.props.text}</span>;
    }
}

export default connect()(Element);
