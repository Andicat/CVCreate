import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createOption} from './utils';
import {cvElement_update} from '../redux/cvDataAC';

class Option extends React.PureComponent {

    static propTypes = {
        elementId: PropTypes.string.isRequired,
        optionName: PropTypes.string,
        optionValue: PropTypes.any,
    };

    onChangeValue = (value) => {
        this.props.dispatch(cvElement_update(this.props.elementId,this.props.optionName,value));
    }

    render () {
        let optionCode = createOption(this.props.optionName,this.props.optionValue,this.onChangeValue);
        return (
            <div className='options__elem'>
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
