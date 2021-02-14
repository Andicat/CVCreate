import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

import {connect} from 'react-redux';
import {createOption} from './move';
import {cvElement_update} from '../redux/cvDataAC';

class OptionPanel extends React.PureComponent {

    static propTypes = {
        style: PropTypes.object.isRequired, 
        elementId: PropTypes.string.isRequired, //из Redux
    };

    render () {
        return (
            <form className="options">
                {Object.keys(this.props.style).map( (s,i) => (
                    <Option key={i} optionName={s} optionValue={this.props.style[s]}/>
                ))}
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        style: state.cvData.styleToEdit,
        elementId: state.cvData.activeElementId, 
    };
};

export default connect(mapStateToProps)(OptionPanel);
