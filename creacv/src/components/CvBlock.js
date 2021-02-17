import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createJSX} from './utils'
import {cvBlock_activate, cvBlock_activateMulti} from '../redux/cvDataAC';


class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        active: PropTypes.bool.isRequired,        
        //activeBlocksId: PropTypes.object,       //Redux
        activeElementId: PropTypes.string,      //Redux
    };

    onClick = (evt) => {
        if (evt.ctrlKey && this.props.activeBlocksId.size>0) {
            this.props.dispatch(cvBlock_activateMulti(this.props.id));
        } else {
            this.props.dispatch(cvBlock_activate(this.props.id, evt.currentTarget));
        }
    }

    render () {
        console.log('render block', this.props.id);
        //let isActive = (this.props.activeBlockId===this.props.id);
        //let isActiveMulti = !isActive && this.props.activeBlocksId.has(this.props.id);
        //let elementsCode =  createJSX(this.props.id,this.props.data,true,isActive?this.props.activeElementId:false);
        let elementsCode =  createJSX(this.props.id,this.props.data,true,this.props.activeElementId);
        let style = {top:this.props.data.positionTop + 'px', left:this.props.data.positionLeft + 'px', width:this.props.data.width + 'px', height:this.props.data.height + 'px'};
        //let className = 'cv__block' + (isActive?' cv__block--active':'') + (isActiveMulti?' cv__block--active-multi':'');
        let className = 'cv__block' + (this.props.active?' cv__block--active':'');
        return (
            <div className={className} style={style} onClick={this.onClick}>
                {elementsCode}
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        //activeBlockId: state.cvData.activeBlockId,
        //activeBlocksId: state.cvData.activeBlocksId,
        //active: state.cvData.activeBlockId === this.props.id,
        activeElementId: state.cvData.activeElementId
    };
};

export default connect(mapStateToProps)(CvBlock);
