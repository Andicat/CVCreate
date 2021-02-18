import React from 'react';
import PropTypes from 'prop-types';

import CVElement from './CVElement';
import CVElementGroup from './CVElementGroup';

import {connect} from 'react-redux';
import {cvBlock_activate, cvBlock_activateMulti} from '../redux/cvDataAC';


class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        active: PropTypes.bool.isRequired,        
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
        console.log('render block', this.props.id, this.props.active);
        //let isActive = (this.props.activeBlockId===this.props.id);
        //let isActiveMulti = !isActive && this.props.activeBlocksId.has(this.props.id);
        //let elementsCode =  createJSX(this.props.id,this.props.data,true,isActive?this.props.activeElementId:false);
        //let elementsCode =  createJSX(this.props.id,this.props.data,true,this.props.activeElementId);
        let style = {top:this.props.data.positionTop + 'px', left:this.props.data.positionLeft + 'px', width:this.props.data.width + 'px', height:this.props.data.height + 'px'};
        //let className = 'cv__block' + (isActive?' cv__block--active':'') + (isActiveMulti?' cv__block--active-multi':'');
        let className = 'cv__block' + (this.props.active?' cv__block--active':'');
        let elementCode = null;
        if (this.props.data.type==='group') {
            elementCode = <CVElementGroup  blockId={this.props.id} cv={true} data={this.props.data} activeElementId={this.props.activeElementId}></CVElementGroup>;
        } else {
            let elementId = this.props.id + '-' + 0;
            elementCode = <CVElement  key={elementId} id={elementId} blockId={this.props.id} cv={true} data={this.props.data} active={elementId===this.props.activeElementId}></CVElement>;
        }
        return (
            <div className={className} style={style} onClick={this.onClick}>
                {elementCode} 
            </div>
        );
    }
}

export default connect()(CvBlock);
