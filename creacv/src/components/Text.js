import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvElement_activate, cvElement_textUpdate} from '../redux/cvDataAC';
import {createStyle} from './utils'

class Text extends React.PureComponent {

    static propTypes = {
        cv: PropTypes.bool,
        id: PropTypes.string.isRequired,
        active: PropTypes.bool,
        style: PropTypes.object,
        text: PropTypes.string,
    };

    static defaultProps = {
        cv: false,
        style: {},
        text: '',
    };

    onBlur = (evt) => {
        let textCurr = evt.target.innerText;
        if (this.props.text!==textCurr) {
            this.props.dispatch(cvElement_textUpdate(this.props.id,textCurr));
        }
    }

    onClick = () => {
        if (this.props.cv) {
            this.props.dispatch(cvElement_activate(this.props.style,this.props.id));
        }
    }

    render () {
        let style = createStyle(this.props.style); 
        let className = ' cv__element  cv__element--text' + (this.props.active?' cv__element--active':'');
        return <span className={className} style={style} suppressContentEditableWarning={true} contentEditable={this.props.cv} onClick={this.onClick} onBlur={this.onBlur}>{this.props.text}</span>;
    }
}

export default connect()(Text);
