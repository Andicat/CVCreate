import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {createOption, OPTIONS_TEXT} from './utils';

class Action extends React.PureComponent {

    static propTypes = {
        actionName: PropTypes.string,
        actionValue: PropTypes.any,
        cbOnChange: PropTypes.func,
        cbSetTooltip: PropTypes.func,
    };

    state = {
        //showTooltip: false,
    }

    onMouseOver = () => {
        if (this.props.cbSetTooltip) {
            this.props.cbSetTooltip(OPTIONS_TEXT[this.props.actionName]);    
        }
    }

    onMouseOut = () => {
        if (this.props.cbSetTooltip) {
            this.props.cbSetTooltip(null);
        }
    }

    render () {
        //console.log('render option',this.props.elementId);

        let optionCode = createOption(this.props.actionName,this.props.actionValue,this.props.cbOnChange);
        return (
            <div className='option' onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {optionCode}
            </div>
        );
    }
}

export default connect()(Action);
