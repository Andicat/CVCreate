import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvBlock_activate} from '../redux/cvDataAC';

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
        fontsize: this.props.style.fontsize,
        style:{...this.props.style},
        text: this.props.text,
    }

    onClick = (evt) => {
        //console.log('edit text', this, this.state.fontsize);
        //console.log(this.state.fontsize);
        //edit(evt);
        this.props.dispatch(cvBlock_activate(this));
    }

    render () {
        return <span className="cv__text" style={this.state.style} onClick={this.onClick}>{this.state.text}</span>;
    }
}

export default connect()(Text);
