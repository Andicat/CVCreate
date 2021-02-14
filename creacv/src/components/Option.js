import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createOption, setValue} from './move';
import {cvElement_update} from '../redux/cvDataAC';

class Option extends React.PureComponent {

    static propTypes = {
        elementId: PropTypes.string.isRequired,
        optionName: PropTypes.string,
        optionValue: PropTypes.any,
    };

    onChange = (value) => {
        //debugger
        //console.log('change option',this.props.optionName);
        //console.log(evt.target.type);
        //let value = setValue(evt.target);
        //console.log(value);
        this.props.dispatch(cvElement_update(this.props.elementId,this.props.optionName,value));
    }

    render () {
        //console.log('render option',this.props.optionValue);
        let optionCode = createOption(this.props.optionName,this.props.optionValue,this.onChange);
        return (
            <div className='options__elem'>
                {optionCode}
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
      // весь раздел Redux state под именем counters будет доступен
      // данному компоненту как this.props.counters
      elementId: state.cvData.activeElementId, 
    };
  };
  

export default connect(mapStateToProps)(Option);
