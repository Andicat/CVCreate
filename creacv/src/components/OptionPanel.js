import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

import {connect} from 'react-redux';
import {cvBlock_sendBack, cvBlock_copy, cvBlock_setSize} from '../redux/cvDataAC';
import {getAutoSize} from './utils';

class OptionPanel extends React.PureComponent {

    static propTypes = {
        styleToEdit: PropTypes.object,       //Redux
        activeElementId: PropTypes.string,   //Redux
        activeBlockId: PropTypes.number,     //Redux
        activeBlocksId: PropTypes.object,    //Redux
        activeBlockDOM: PropTypes.object,    //Redux
    };


    sendBlockBack = () => {
        this.props.dispatch(cvBlock_sendBack(this.props.activeBlockId));
    }

    copyBlock = () => {
        this.props.dispatch(cvBlock_copy(this.props.activeBlockId));
    }

    setBlockSizeAuto = () => {
        let sizesAuto = getAutoSize(this.props.activeBlockDOM);
        this.props.dispatch(cvBlock_setSize(this.props.activeBlockId,sizesAuto.height,sizesAuto.width));
    }

    render () {

        let codeElementOptions = null;
        let codeBlockOptions = null;
        let codeBlocksOptions = null;

        if (this.props.activeElementId) {
            codeElementOptions = Object.keys(this.props.styleToEdit).map( (s,i) => (
                    <Option key={i} optionName={s} optionValue={this.props.styleToEdit[s]}/>));
        };

        if (this.props.activeBlockId) {
            codeBlockOptions = (
               <React.Fragment>
                    <div className='options__elem'>
                        <input type='button' className={'option option__autosize'} onClick={this.setBlockSizeAuto}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__back'} onClick={this.sendBlockBack}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__copy'} onClick={this.copyBlock}/>
                    </div>
               </React.Fragment>
            );
        }

        if (this.props.activeBlocksId) {
            codeBlocksOptions = (
                <React.Fragment>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-top'} onClick={this.alignBlocksTop}/>
                    </div>
                </React.Fragment>
            );
        }

        if (!codeElementOptions && !codeBlockOptions && !codeBlocksOptions) {
            return null;
        }
        return (
            <form className='options'>
                {codeElementOptions}
                <div className='options__block'>
                    {codeBlockOptions}
                    {codeBlocksOptions}
                </div>
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        styleToEdit: state.cvData.styleToEdit,
        activeElementId: state.cvData.activeElementId,
        activeBlockId: state.cvData.activeBlockId,
        activeBlocksId: state.cvData.activeBlocksId,
        activeBlockDOM: state.cvData.activeBlockDOM,
    };
};

export default connect(mapStateToProps)(OptionPanel);
