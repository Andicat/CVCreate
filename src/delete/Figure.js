import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvElement_activate} from '../redux/cvDataAC';
import {createStyle} from './utils';

class Figure extends React.PureComponent {

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
        let className = ' cv__element  cv__element--figure' + (this.props.active?' cv__element--active':'');
        return <div className={className} style={style} onClick={this.onClick}></div>;
    }
}

export default connect()(Figure);
