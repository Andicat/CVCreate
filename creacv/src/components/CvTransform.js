import React from 'react';
import PropTypes from 'prop-types';
import {move} from './move'
import {connect} from 'react-redux';
import {createJSX} from './move'
import {cvBlock_move, cvBlock_resize, cvBlock_activate, cvBlock_delete} from '../redux/cvDataAC';


class CvTransform extends React.PureComponent {

    static propTypes = {
        block: PropTypes.object.isRequired,
    };

    mouseStart;
    mouseShift;
    elem;
    resize = false;
    coordsShift;

     move = (evt) => { 
        //debugger
        evt.preventDefault();
        this.mouseStart = {
            x: evt.clientX,
            y: evt.clientY
        };
        this.elem = evt.currentTarget.parentNode;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
    }

    onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        this.mouseShift = {
            x: moveEvt.clientX - this.mouseStart.x,
            y: moveEvt.clientY - this.mouseStart.y 
        };
        this.mouseStart = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };
        
        if (this.resize) {
            //debugger
            let width = (this.elem.offsetWidth + this.mouseShift.x) + "px";
            let height = (this.elem.offsetHeight + this.mouseShift.x) + "px";
            this.props.dispatch(cvBlock_resize(this.props.id,this.mouseShift.x,this.mouseShift.y));
        } else {
            let top = (this.elem.offsetTop + this.mouseShift.y) + "px";
            let left = (this.elem.offsetLeft + this.mouseShift.x) + "px";
            this.props.dispatch(cvBlock_move(this.props.id,top,left));
        }
    }

    onMouseUp = (upEvt) => {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }

    onMouseDown = (evt) => {
        this.resize = false;
        this.move(evt);
    }

    onMouseDownSize = (evt) => {
        this.resize = true;
        this.move(evt);
    }

    onClickDelete = () => {
        this.props.dispatch(cvBlock_delete(this.props.block.id));
    }

    getElementCoords = (elem) => {
        var bbox = elem.getBoundingClientRect();
    
        var body = document.body;
        var docEl = document.documentElement;
    
        var scrollTop = window.pageYOffset||docEl.scrollTop||body.scrollTop;
        var scrollLeft = window.pageXOffset||docEl.scrollLeft||body.scrollLeft;
    
        var clientTop = docEl.clientTop||body.clientTop||0;
        var clientLeft = docEl.clientLeft||body.clientLeft||0;
    
        var top = bbox.top + scrollTop - clientTop;
        var left = bbox.left + scrollLeft - clientLeft;
    
        return {
            width: elem.offsetWidth,
            height: elem.offsetHeight,
            left: left,
            top: top,
            bottom: top + elem.offsetHeight,
            right: left + elem.offsetWidth,
        };
    }
    
    getPosition() {
        let deskCoords = this.getElementCoords(document.querySelector('.desk'));
        let cvCoords = this.getElementCoords(document.querySelector('.cv'));
        this.coordsShift = {top:cvCoords.top-deskCoords.top, left:cvCoords.left-deskCoords.left};
        console.log(this.coordsShift);
        console.log(this.props.block.positionTop);
    }

    render () {
        console.log(this.props.block);
        //var elementsCode =  createJSX(this.props.id,this.props.data,true,this.props.active?this.props.activeElementId:false);
        this.getPosition();
        let style = {top:this.props.block.positionTop, left:this.props.block.positionLeft, width:this.props.block.width + "px", height:this.props.block.height + "px"};
        //let style = {top:'10px', left:'10px', width:"100px", height:"100px"};
        let className = 'cv__transform';
        return (
            <div className={className} style={style}>
                <button className='cv__block-button cv__block-button--move' onMouseDown={this.onMouseDown}></button>
                <button className='cv__block-button cv__block-button--delete' onClick={this.onClickDelete}></button>
                <button className='cv__block-button cv__block-button--resize' onMouseDown={this.onMouseDownSize}></button>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
      block: state.cvData.blocks.find( b => b.id==state.cvData.activeBlockId),
    };
};

export default connect(mapStateToProps)(CvTransform);
