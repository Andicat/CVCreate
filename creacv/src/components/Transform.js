import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {cvBlock_move, cvBlock_resize, cvBlock_delete} from '../redux/cvDataAC';


class Transform extends React.PureComponent {

    static propTypes = {
        block: PropTypes.object,
        cv: PropTypes.object,
        panel: PropTypes.bool,
    };

    mouseStart;
    mouseShift;
    elem;
    resize = false;
    shiftTop = null;
    shiftLeft = null;
    shiftBorder = 4;

    componentDidMount() {
        window.addEventListener("resize", this.setPosition);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setPosition);
    }

    setPosition = () => {
        debugger
        this.shiftTop = this.props.cv.offsetTop;
        this.shiftLeft = this.props.cv.offsetLeft;
    }

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

    render () {
        if (!this.props.block) {
            return null;
        }
        this.setPosition();
        let style = {top:(this.props.block.positionTop + this.shiftTop - this.shiftBorder) + 'px', left:(this.props.block.positionLeft + this.shiftLeft - this.shiftBorder) + 'px', width:(this.props.block.width + this.shiftBorder*2) + 'px', height:(this.props.block.height + this.shiftBorder*2) + 'px'};
        let className = 'transform' + (this.props.block.lock?' transform--locked':'');
        return (
            <div className={className} style={style}>
                {!this.props.block.lock && (
                    <React.Fragment>
                        <button className='transform__button transform__button--move' onMouseDown={this.onMouseDown}></button>
                        <button className='transform__button transform__button--delete' onClick={this.onClickDelete}></button>
                        <button className='transform__button transform__button--resize' onMouseDown={this.onMouseDownSize}></button>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        show: state.cvData.showPanel,
    };
};

export default connect(mapStateToProps)(Transform);
