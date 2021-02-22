import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createOption, OPTIONS_TEXT} from './utils';

class Action extends React.PureComponent {

    static propTypes = {
        actionName: PropTypes.string,
        actionValue: PropTypes.any,
        cbOnChange: PropTypes.func,
    };

    state = {
        showTooltip: false,
    }

    onMouseOver = () => {
        this.setState({showTooltip:true});
    }

    onMouseOut = () => {
        this.setState({showTooltip:false});
    }

    render () {
        //console.log('render option',this.props.elementId);

        let optionCode = createOption(this.props.actionName,this.props.actionValue,this.props.cbOnChange);
        return (
            <div className='options__elem' onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {optionCode}
                {this.state.showTooltip && <div className='option__tooltip'>{OPTIONS_TEXT[this.props.actionName]}</div>}
            </div>
        );
    }
}

export default connect()(Action);
