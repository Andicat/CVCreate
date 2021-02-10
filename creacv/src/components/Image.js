import React from 'react';
import PropTypes from 'prop-types';
import image from './../img/image.svg';

class Image extends React.PureComponent {

    static propTypes = {
        style: PropTypes.object,
        src: PropTypes.string,
    };

    static defaultProps = {
        style: {},
        src: image,
    };

    state = {
        style:{...this.props.style},
        src: this.props.src,
    }

    onClick = (evt) => {
        //console.log('edit image');
        //edit(evt);
    }

    render () {
        //console.log(this.props.src);
        return <img className="cv__image" src={this.state.src} style={this.state.style} alt='' onClick={this.onClick}/>;
    }
}

export default Image;
