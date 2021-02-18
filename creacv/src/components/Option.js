import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createOption} from './utils';
import {cvElement_update} from '../redux/cvDataAC';

class Option extends React.PureComponent {

    static propTypes = {
        blockId: PropTypes.number.isRequired,
        elementId: PropTypes.string.isRequired,
        optionName: PropTypes.string,
        optionValue: PropTypes.any,
    };

    state = {
        showTooltip: false,
    }

    onChangeValue = (value) => {
        this.props.dispatch(cvElement_update(this.props.blockId, this.props.elementId,this.props.optionName,value));
    }

    onMouseOver = () => {
        this.setState({showTooltip:true});
    }

    onMouseOut = () => {
        this.setState({showTooltip:false});
    }

    render () {
        //console.log('render option',this.props.optionName);
        let optionCode = createOption(this.props.optionName,this.props.optionValue,this.onChangeValue);
        return (
            <div className='options__elem' onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {optionCode}
                {this.state.showTooltip && <div className='option__tooltip'>{this.props.optionName}</div>}
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        elementId: state.cvData.activeElementId, 
    };
  };

export default connect(mapStateToProps)(Option);
