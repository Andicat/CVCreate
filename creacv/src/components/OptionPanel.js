import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

import {connect} from 'react-redux';
import {cvBlock_sendBack} from '../redux/cvDataAC';

class OptionPanel extends React.PureComponent {

    static propTypes = {
        styleToEdit: PropTypes.object,       //Redux
        activeElementId: PropTypes.string,   //Redux
        activeBlockId: PropTypes.number,     //Redux
    };


    sendBack = () => {
        this.props.dispatch(cvBlock_sendBack(this.props.activeBlockId));
    }

    render () {
        let codeElementOptions = null;
        let codeBlockOptions = null;

        if (this.props.activeElementId) {
            codeElementOptions = Object.keys(this.props.styleToEdit).map( (s,i) => (
                    <Option key={i} optionName={s} optionValue={this.props.styleToEdit[s]}/>));
        };

        if (this.props.activeBlockId) {
            codeBlockOptions = (
                <div className='options__block'>
                    <input type='button' className={'option option__back'} onClick={this.sendBack}/>
                </div>
            );
        }

        if (!codeElementOptions && !codeBlockOptions) {
            return null;
        }
        return (
            <form className="options">
                {codeElementOptions}
                {codeBlockOptions}
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        styleToEdit: state.cvData.styleToEdit,
        activeElementId: state.cvData.activeElementId,
        activeBlockId: state.cvData.activeBlockId, 
    };
};

export default connect(mapStateToProps)(OptionPanel);
