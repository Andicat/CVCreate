import React from 'react';
import PropTypes from 'prop-types';
import image from './../img/image.svg';

import {connect} from 'react-redux';
import {cvElement_activate} from '../redux/cvDataAC';
import {createStyle} from './utils';

class Image extends React.PureComponent {

    static propTypes = {
        cv: PropTypes.bool,
        id: PropTypes.string.isRequired,
        active: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        cv: false,
        style: {},
    };

    onClick = () => {
        if (this.props.cv) {
            this.props.dispatch(cvElement_activate(this.props.style,this.props.id));
        }
    }

    render () {
        let style = createStyle(this.props.style);
        let src = (this.props.style['file']) || image;
        let className = ' cv__element  cv__element--image' + (this.props.active?' cv__element--active':'');
        return <img className={className} src={src} style={style} alt='' onClick={this.onClick}/>;
    }
}

export default connect()(Image);
