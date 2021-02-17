import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {cvBlock_move, cvBlock_resize, cvBlock_delete} from '../redux/cvDataAC';


class CvTransform extends React.PureComponent {

    static propTypes = {
        block: PropTypes.object,
    };

    mouseStart;
    mouseShift;
    elem;
    resize = false;
    coordsShift;

    move = (evt) => { 
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
            this.props.dispatch(cvBlock_resize(this.props.block.id,this.mouseShift.y,this.mouseShift.x));
        } else {
            this.props.dispatch(cvBlock_move(this.props.block.id,this.mouseShift.y,this.mouseShift.x));
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
        this.coordsShift = {top:cvCoords.top-deskCoords.top + Number(this.props.block.positionTop), left:cvCoords.left-deskCoords.left + Number(this.props.block.positionLeft)};
    }

    render () {
        console.log('render cv transform');
        if (!this.props.block) {
            return null;
        }
        this.getPosition();
        let style = {top:this.coordsShift.top + 'px', left:this.coordsShift.left + 'px', width:this.props.block.width + 'px', height:this.props.block.height + 'px'};
        let className = 'cv__transform';
        return (
            <div className={className} style={style}>
                <button className='cv__transform-button cv__transform-button--move' onMouseDown={this.onMouseDown}></button>
                <button className='cv__transform-button cv__transform-button--delete' onClick={this.onClickDelete}></button>
                <button className='cv__transform-button cv__transform-button--resize' onMouseDown={this.onMouseDownSize}></button>
            </div>
        );
    }
}

/*const mapStateToProps = function (state) {
    return {
        //block: state.cvData.blocks.find( b => b.id === state.cvData.activeBlockId),
        //activeBlockId: state.cvData.activeBlockId,
    };
};*/

export default connect()(CvTransform);
