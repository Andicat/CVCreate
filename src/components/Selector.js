import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {cvBlock_activate, cvBlock_activateMulti} from '../redux/cvDataAC';
import {getElementCoords} from '../modules/utils';

//Выделение блоков мышью.
class Selector extends React.PureComponent {

    static propTypes = {
        cv: PropTypes.object,
        blocks: PropTypes.array,
        activeBlocksId: PropTypes.array,
    };

    state = {
        top: null,
        left: null,
        width: null,
        height: null,
    };

    pointStart;
    mouseStart;
    cvSizes;

    componentDidMount() {
        window.addEventListener('touchstart', this.onMouseDown,{passive: false});
        window.addEventListener('mousedown', this.onMouseDown);
    }

    componentWillUnmount() {
        window.removeEventListener('touchstart', this.onMouseDown,{passive: false});
        window.removeEventListener('mousedown', this.onMouseDown);
    }

    onMouseDown = (evt) => {
        if (evt.target!==this.props.cv.current) {
            return;
        }
        this.props.dispatch(cvBlock_activate(null,null));
        this.cvSizes = getElementCoords(this.props.cv.current);
        evt.preventDefault();
        if (window.TouchEvent && evt instanceof TouchEvent) {
            evt = evt.changedTouches[0];
        }
        this.mouseStart = {
            x: evt.clientX,
            y: evt.clientY
        };
        this.pointStart = {
            top: evt.clientY - this.cvSizes.top,
            left: evt.clientX - this.cvSizes.left,
        };
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('touchmove', this.onMouseMove,{ passive: false });
        window.addEventListener('touchend', this.onMouseUp);
    }

    onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        if (window.TouchEvent && moveEvt instanceof TouchEvent) {
            moveEvt = moveEvt.changedTouches[0];
        }
        this.mouseStart = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };
        let top = this.pointStart.top;
        let left = this.pointStart.left;
        let width = moveEvt.clientX - this.pointStart.left - this.cvSizes.left;
        let height = moveEvt.clientY - this.pointStart.top - this.cvSizes.top;
        if (width<0) {
            left = this.pointStart.left + width;
            width = -width;
        }
        if (height<0) {
            top = this.pointStart.top + height;
            height = -height;
        }
        this.setState({top: top, left: left, width: width, height: height});
        this.selectBlock();
    }

    onMouseUp = (upEvt) => {
        this.setState({width: null, height: null});
        upEvt.preventDefault();
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('touchmove', this.onMouseMove,{ passive: false });
        window.removeEventListener('touchend', this.onMouseUp);
    }

    selectBlock = () => {
        this.props.blocks.forEach(block => {
            let blockSelected = this.props.activeBlocksId.findIndex(ab => ab===block.id)>-1;
            if (block.positionTop>=this.state.top && block.positionLeft>=this.state.left && (block.positionLeft-this.state.left+block.width)<=this.state.width && (block.positionTop-this.state.top+block.height)<=this.state.height) {
                if (!blockSelected) {
                    this.props.dispatch(cvBlock_activateMulti(block.id));
                }
            } else if (blockSelected) {
                this.props.dispatch(cvBlock_activateMulti(block.id));
            }
        });
    }

    render () {
        if (!this.state.width || !this.state.height) {
            return null;
        }
        let style = {top: this.state.top + 'px', left: this.state.left + 'px', width: this.state.width + 'px', height: this.state.height + 'px'};
        return (
            <div className='selector' style={style}/>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        blocks: state.cvData.blocks,
        activeBlocksId: state.cvData.activeBlocksId,
    };
};

export default connect(mapStateToProps)(Selector);
