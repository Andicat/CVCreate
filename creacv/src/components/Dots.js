import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvElement_activate} from '../redux/cvDataAC';
import {createStyle} from './utils';

class Dots extends React.PureComponent {

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
        style = {...style, width:this.props.style.size + 'px', height:this.props.style.size + 'px', margin:this.props.style.size*0.5 + 'px', borderRadius: '50%'};
        let className = ' cv__element  cv__element--dots' + (this.props.active?' cv__element--active':'');
        return <div className={className} onClick={this.onClick}>
                    {Array.from({length: this.props.style.count}, (v,i) => <div key={i} style={style}></div>)}
                </div>;
    }
}

export default connect()(Dots);
