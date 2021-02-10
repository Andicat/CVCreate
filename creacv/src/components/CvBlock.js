import React from 'react';
import PropTypes from 'prop-types';
import {move} from './move'
import {connect} from 'react-redux';
import {cvBlock_move, cvBlock_activate} from '../redux/cvDataAC';


class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number,
        positionTop: PropTypes.string,
        positionLeft: PropTypes.string,
    };

    static defaultProps = {
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
        let style = {top:this.props.positionTop, left:this.props.positionLeft};
        return (
            <div className="cv__block" style={style} onMouseDown={this.onMouseDown} onClick={this.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default connect()(CvBlock);
