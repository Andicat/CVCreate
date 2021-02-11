import React from 'react';
import PropTypes from 'prop-types';
import image from './../img/image.svg';

import {connect} from 'react-redux';
import {cvElement_activate} from '../redux/cvDataAC';


class Image extends React.PureComponent {

    static propTypes = {
        id: PropTypes.string.isRequired,
        active: PropTypes.bool,
        style: PropTypes.object,
        src: PropTypes.string,
    };

    static defaultProps = {
        style: {},
        src: image,
    };

    state = {
        //style:{...this.props.style},
        //src: this.props.src,
    }

    onClick = () => {
        this.props.dispatch(cvElement_activate(this));
    }

    render () {
        let className = ' cv__element  cv__element--image' + (this.props.active?' cv__element--active':'');
        return <img className={className} src={this.props.src} style={this.props.style} alt='' onClick={this.onClick}/>;
    }
}

export default connect()(Image);
