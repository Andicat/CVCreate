import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createOption, OPTIONS_TEXT} from './utils';
import {cvStyle_update} from '../redux/cvDataAC';

class Option extends React.PureComponent {

    static propTypes = {
        blockId: PropTypes.number.isRequired,
        elementId: PropTypes.string,
        optionName: PropTypes.string,
        optionValue: PropTypes.any,
        cbSetTooltip: PropTypes.func,
    };

    state = {
        //showTooltip: false,
    }

    onChangeValue = (value) => {
        if (this.props.cbSetTooltip) {
            this.props.dispatch(cvStyle_update(this.props.blockId, this.props.elementId,this.props.optionName,value));
        }
    }

    onMouseOver = () => {
        if (this.props.cbSetTooltip) {
            this.props.cbSetTooltip(OPTIONS_TEXT[this.props.optionName]);
        }
    }

    onMouseOut = () => {
        this.props.cbSetTooltip(null);
    }

    //{this.state.showTooltip && <div className='option__tooltip'>{OPTIONS_TEXT[this.props.optionName]}</div>}

    render () {
        //console.log('render option',this.props.elementId);
        let optionCode = createOption(this.props.optionName,this.props.optionValue,this.onChangeValue);
        return (
            <div className='option' onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {optionCode}
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
