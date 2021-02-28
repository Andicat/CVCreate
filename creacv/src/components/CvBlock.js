import React from 'react';
import PropTypes from 'prop-types';

import CvElement from './CvElement';

import {connect} from 'react-redux';
import {cvBlock_activate, cvBlock_activateMulti} from '../redux/cvDataAC';


class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        activeIndex: PropTypes.number.isRequired,        
        activeElementId: PropTypes.string,
        editable: PropTypes.bool,
    };

    onClick = (evt) => {
        if (evt.ctrlKey || evt.shiftKey) {
            evt.preventDefault();
            this.props.dispatch(cvBlock_activateMulti(this.props.id));
        } else {
            evt.preventDefault();
            this.props.dispatch(cvBlock_activate(this.props.id, evt.currentTarget));
        }
    }

    render () {
        //console.log('render block',this.props.editable);
        let style = {top:this.props.data.positionTop + 'px', left:this.props.data.positionLeft + 'px', width:this.props.data.width + 'px', height:this.props.data.height + 'px'};
        let className = 'cv__block' + (this.props.activeIndex>=0?' cv__block--active':'') + (this.props.activeIndex===0?' cv__block--active-first':'') + (this.props.data.lock?' cv__block--lock':'');
        let elementCode = <CvElement id={'' + this.props.id} blockId={this.props.id} editable={this.props.editable} data={this.props.data} activeElementId={this.props.activeElementId}></CvElement>;

        return (
            <div className={className} style={style} onClick={this.onClick}>
                {elementCode} 
            </div>
        );
    }
}

export default connect()(CvBlock);
