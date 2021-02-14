import React from 'react';
import PropTypes from 'prop-types';
import {move} from './move'
import {connect} from 'react-redux';
import {createJSX} from './move'
import {cvBlock_move, cvBlock_resize, cvBlock_activate, cvBlock_delete} from '../redux/cvDataAC';


class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        active: PropTypes.bool,
        activeElementId: PropTypes.string,
        data: PropTypes.object.isRequired,
    };

    static defaultProps = {
        active: false,
    };

    mouseStart;
    mouseShift;
    elem;
    resize = false;

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

    onClick = () => {
        this.props.dispatch(cvBlock_activate(this.props.id));
    }

    onClickDelete = () => {
        this.props.dispatch(cvBlock_delete(this.props.id));
    }

    render () {
        //console.log(this.props.positionTop);
        var elementsCode =  createJSX(this.props.id,this.props.data,true,this.props.active?this.props.activeElementId:false);
        let style = {top:this.props.data.positionTop + 'px', left:this.props.data.positionLeft + 'px', width:this.props.data.width + "px", height:this.props.data.height + "px"};
        let className = 'cv__block' + (this.props.active?' cv__block--active':'');
        return (
            <div className={className} style={style} onClick={this.onClick}>
                {elementsCode}
            </div>
        );
    }
}

export default connect()(CvBlock);
