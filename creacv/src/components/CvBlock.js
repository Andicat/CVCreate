import React from 'react';
import PropTypes from 'prop-types';

import Element from "./Element";

import {move} from './move'
import {connect} from 'react-redux';
import {createJSX} from './move'
import {cvBlock_move, cvBlock_activate} from '../redux/cvDataAC';


class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        active: PropTypes.bool,
        activeElementId: PropTypes.string,
        data: PropTypes.object.isRequired,
        positionTop: PropTypes.string,
        positionLeft: PropTypes.string,
    };

    static defaultProps = {
        active: false,
        positionTop: '30%',
        positionLeft: '30%',
    };

    onMouseDown = (evt) => {
        this.props.dispatch(cvBlock_move(this));
        move(evt);
    }

    onClick = () => {
        this.props.dispatch(cvBlock_activate(this));
    }

    render () {
        
        //var block = <Element key={this.props.data.id} id={this.props.data.id} type={this.props.data.type} style={this.props.data.style} text={this.props.data.text}></Element>;
        //console.log('1',block);
        var elementsCode = createJSX(this.props.data,this.props.activeElementId);
        //console.log('2',elementsCode);
        //console.log('3',this.props.activeBlock.props.id);
        //console.log('data',this.props.data);
        let style = {top:this.props.positionTop, left:this.props.positionLeft};
        let className = 'cv__block' + (this.props.active?' cv__block--active':'');
        return (
            <div className={className} style={style} onMouseDown={this.onMouseDown} onClick={this.onClick}>
               
                {elementsCode}
            </div>
        );
    }
}

export default connect()(CvBlock);
