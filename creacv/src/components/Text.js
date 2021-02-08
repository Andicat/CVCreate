import React from 'react';
import PropTypes from 'prop-types';

class Text extends React.PureComponent {

    static propTypes = {
        style: PropTypes.object,
        text: PropTypes.string,
    };

    static defaultProps = {
        style: {},
        text: '',
    };

    state = {
        style:{...this.props.style},
        text: this.props.text,
    }

    onClick = (evt) => {
        console.log('edit image');
        //edit(evt);
    }

    render () {
        return <span className="cv__text" style={this.state.style} onClick={this.onClick}>{this.state.text}</span>;
    }
}

export default Text;
