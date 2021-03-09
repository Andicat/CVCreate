import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {cvBlock_move, cvBlock_resize, cvBlock_delete} from '../redux/cvDataAC';

//Трансформационная рамка для блока. 
//Отвечает за перемещение, удаление,...
class Transform extends React.PureComponent {

    static propTypes = {
        block: PropTypes.object,
        cv: PropTypes.object,
        transitionClass: PropTypes.string,
    };

    mouseStart;
    mouseShift;
    elem;
    resize;
    
    state = {
        shiftTop: this.props.cv.offsetTop,
        shiftLeft: this.props.cv.offsetLeft,
        shiftBorder : 4,
    };

    componentDidMount() {
        window.addEventListener("resize", this.setPosition);
        window.addEventListener('touchstart', this.startMove,{passive: false});
        window.addEventListener("mousedown", this.startMove);
        window.addEventListener('keydown', this.moveKey);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.setPosition);
        window.removeEventListener('touchstart', this.startMove,{passive: false});
        window.removeEventListener("mousedown", this.startMove);
        window.removeEventListener('keydown', this.moveKey);
    }

    componentDidUpdate() {
        this.setPosition();
    }

    //обновляем положение рамки
    setPosition = () => {
        this.setState({shiftTop: this.props.cv.offsetTop, shiftLeft: this.props.cv.offsetLeft});
    }

    //передвигаем блок
    startMove = (evt) => {
        if (evt.target!==this.moveBtn && evt.target!==this.resizeBtn) {
            return;
        }
        this.resize = (evt.target===this.resizeBtn);
        evt.preventDefault();
        if (window.TouchEvent && evt instanceof TouchEvent) {
            evt = evt.changedTouches[0];
        }
        this.mouseStart = {
            x: evt.clientX,
            y: evt.clientY
        };
        
        document.addEventListener('mousemove', this.move);
        document.addEventListener('mouseup', this.moveEnd);
        window.addEventListener('touchmove', this.move,{ passive: false });
        window.addEventListener('touchend', this.moveEnd);
    }

    move = (moveEvt) => {
        moveEvt.preventDefault();
        if (window.TouchEvent && moveEvt instanceof TouchEvent) {
            moveEvt = moveEvt.changedTouches[0];
        }
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

    moveKey = (evt) => {
        if (this.props.block.lock) {
            return;
        }
        if (!evt.ctrlKey) {
            return;
        }
        if (evt.keyCode === 37) { //left
            evt.preventDefault();
            this.props.dispatch(cvBlock_move(this.props.block.id,0,-1));
        };
        if (evt.keyCode === 38) { //up
            evt.preventDefault();
            this.props.dispatch(cvBlock_move(this.props.block.id,-1,0));
        };
        if (evt.keyCode === 39) { //right
            evt.preventDefault();
            this.props.dispatch(cvBlock_move(this.props.block.id,0,1));
        };
        if (evt.keyCode === 40) { //down
            evt.preventDefault();
            this.props.dispatch(cvBlock_move(this.props.block.id,1,0));
        };
    }

    moveEnd = (upEvt) => {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', this.move);
        document.removeEventListener('mouseup', this.moveEnd);
        window.removeEventListener('touchmove', this.move,{ passive: false });
        window.removeEventListener('touchend', this.moveEnd);
    }

    //удаляем блок
    onClickDelete = () => {
        this.props.dispatch(cvBlock_delete(this.props.block.id));
    }

    render () {
        if (!this.props.block) {
            return null;
        }
        let style = {top:(this.props.block.positionTop + this.state.shiftTop - this.state.shiftBorder) + 'px', left:(this.props.block.positionLeft + this.state.shiftLeft - this.state.shiftBorder) + 'px', width:(this.props.block.width + this.state.shiftBorder*2) + 'px', height:(this.props.block.height + this.state.shiftBorder*2) + 'px'};
        let className = 'transform '  + this.props.transitionClass + (this.props.block.lock?' transform--locked':'') + (this.props.block.link?' transform--linked':'');
        return (
            <div className={className} style={style} ref={(f) => this.frame = f}>
                {!this.props.block.lock && (
                    <React.Fragment>
                        <button className='transform__button transform__button--move' ref={(f) => this.moveBtn = f}></button>
                        <button className='transform__button transform__button--delete' onClick={this.onClickDelete}></button>
                        {!this.props.block.group &&
                            <button className='transform__button transform__button--resize'ref={(f) => this.resizeBtn = f}></button>
                        }
                    </React.Fragment>
                )}
            </div>
        );
    }
}

export default connect()(Transform);
