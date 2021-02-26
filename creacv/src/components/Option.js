import React from 'react';
import PropTypes from 'prop-types';

import {createOption, OPTIONS_TEXT} from './utils';

class Option extends React.PureComponent {

    static propTypes = {
        blockId: PropTypes.number.isRequired,
        optionName: PropTypes.string,
        optionValue: PropTypes.any,
        cbSetTooltip: PropTypes.func.isRequired,
        cbOnChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        blockId: 0,
    };

    onChangeValue = (value) => {
        this.props.cbOnChange(this.props.blockId,this.props.optionName,value);
    }

    onMouseOver = () => {
        this.props.cbSetTooltip(OPTIONS_TEXT[this.props.optionName]);
    }

    onMouseOut = () => {
        this.props.cbSetTooltip(null);
    }

     render () {
        let optionCode = createOption(this.props.optionName,this.props.optionValue,this.onChangeValue);
        return (
            <div className='option' onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}>
                {optionCode}
            </div>
        );
    }
}

export default Option;
