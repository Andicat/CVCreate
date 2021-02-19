import React from 'react';
import PropTypes from 'prop-types';

import CVElement from './CVElement';

import {connect} from 'react-redux';
import {cvBlock_activate, cvBlock_activateMulti} from '../redux/cvDataAC';


class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        activeIndex: PropTypes.number.isRequired,        
        activeElementId: PropTypes.string,
    };

    onClick = (evt) => {
        if (evt.ctrlKey || evt.shiftKey) {
            this.props.dispatch(cvBlock_activateMulti(this.props.id));
        } else {
            this.props.dispatch(cvBlock_activate(this.props.id, evt.currentTarget));
        }
    }

    render () {
        let style = {top:this.props.data.positionTop + 'px', left:this.props.data.positionLeft + 'px', width:this.props.data.width + 'px', height:this.props.data.height + 'px'};
        let className = 'cv__block' + (this.props.activeIndex>=0?' cv__block--active':'') + (this.props.activeIndex===0?' cv__block--active-first':'');
        let elementId = this.props.id + '-' + 0;
        let elementCode = <CVElement  key={elementId} id={elementId} blockId={this.props.id} cv={true} data={this.props.data} activeElementId={this.props.activeElementId}></CVElement>;
        return (
            <div className={className} style={style} onClick={this.onClick}>
                {elementCode} 
            </div>
        );
    }
}

export default connect()(CvBlock);
