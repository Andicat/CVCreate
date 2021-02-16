import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createJSX} from './utils'
import {cvBlock_activate} from '../redux/cvDataAC';


class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        activeBlockId: PropTypes.number,      //Redux
        activeElementId: PropTypes.string, //Redux
    };

    onClick = (evt) => {
        if (evt.ctrlKey && this.props.activeBlockId) {
            //this.props.dispatch(cvBlock_activateGroup(this.props.id));
        }
        this.props.dispatch(cvBlock_activate(this.props.id));
    }

    render () {
        let isActive = (this.props.activeBlockId===this.props.id);
        let elementsCode =  createJSX(this.props.id,this.props.data,true,isActive?this.props.activeElementId:false);
        let style = {top:this.props.data.positionTop + 'px', left:this.props.data.positionLeft + 'px', width:this.props.data.width + "px", height:this.props.data.height + "px"};
        let className = 'cv__block' + (isActive?' cv__block--active':'');
        return (
            <div className={className} style={style} onClick={this.onClick}>
                {elementsCode}
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        activeBlockId: state.cvData.activeBlockId,
        activeElementId: state.cvData.activeElementId
    };
};

export default connect(mapStateToProps)(CvBlock);
