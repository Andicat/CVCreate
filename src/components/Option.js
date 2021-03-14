import React from 'react';
import PropTypes from 'prop-types';
import {createOption, createTooltipText} from '../modules/utils';

//опция, настройка
class Option extends React.PureComponent {

    static propTypes = {
        blockId: PropTypes.number.isRequired,
        optionName: PropTypes.string,
        optionValue: PropTypes.any,
        cbOnChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        blockId: 0,
    };

    state = {
        tooltip: null,
    }

    //при изменении значения
    onChangeValue = (value) => {
        this.props.cbOnChange(this.props.blockId,this.props.optionName,value);
    }

    //показ подсказки при наведении мыши
    onMouseOver = (evt) => {
        if (evt.target.getAttribute('data-tooltip')) {
            this.setState({tooltip: createTooltipText(this.props.optionName)});
        }
    }

    //убираем подсказку
    onMouseOut = () => {
        this.setState({tooltip: null});
    }

    render () {
        let optionCode = createOption(this.props.optionName,this.props.optionValue,this.onChangeValue);
        if (!optionCode) {
            return null;
        }
        return (
            <div className='option' onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} onClick={this.onMouseOut}>
                {optionCode}
                {this.state.tooltip &&
                    <span className='option__tooltip'>{this.state.tooltip}</span>
                }
            </div>

        );
    }
}

export default Option;
