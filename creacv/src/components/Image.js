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
        src: PropTypes.string,
    };

    static defaultProps = {
        cv: false,
        style: {},
        src: image,
    };

    onClick = () => {
        if (this.props.cv) {
            this.props.dispatch(cvElement_activate(this.props.style,this.props.id));
        }
    }

    render () {
        let style = createStyle(this.props.style);
        if (this.props.style['file']) {
            let img = new Image();
            img.src = this.props.style['file'];
        }
        let src = null || (this.props.src);
        let className = ' cv__element  cv__element--image' + (this.props.active?' cv__element--active':'');
        return <img className={className} src={src} style={style} alt='' onClick={this.onClick}/>;
    }
}

export default connect()(Image);
