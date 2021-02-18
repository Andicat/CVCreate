import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

import {connect} from 'react-redux';
import {cvBlock_sendBack, cvBlock_copy, cvBlock_setSize, cvBlock_alignTop, cvBlock_alignLeft, cvBlock_alignVertical, cvBlock_alignHorisontal} from '../redux/cvDataAC';
import {getAutoSize} from './utils';

class OptionPanel extends React.PureComponent {

    static propTypes = {
        styleToEdit: PropTypes.object,     
        activeElementId: PropTypes.string,   //Redux
        block: PropTypes.object,
        activeBlocksId: PropTypes.array,    //Redux
        activeBlockDOM: PropTypes.object,    //Redux
    };


    sendBlockBack = () => {
        this.props.dispatch(cvBlock_sendBack(this.props.block.id));
    }

    copyBlock = () => {
        this.props.dispatch(cvBlock_copy(this.props.block.id));
    }

    setBlockSizeAuto = () => {
        let sizesAuto = getAutoSize(this.props.activeBlockDOM);
        this.props.dispatch(cvBlock_setSize(this.props.block.id,sizesAuto.height,sizesAuto.width));
    }

    alignBlocksTop = () => {
        this.props.dispatch(cvBlock_alignTop());
    }

    alignBlocksLeft = () => {
        this.props.dispatch(cvBlock_alignLeft());
    }

    alignBlocksVertical = () => {
        this.props.dispatch(cvBlock_alignVertical());
    }

    alignBlocksHorisontal = () => {
        this.props.dispatch(cvBlock_alignHorisontal());
    }

    render () {
        //console.log('render option panel');
        //debugger
        let codeElementOptions = null;
        let codeBlockOptions = null;
        let codeBlocksOptions = null;

        if (this.props.activeElementId) {
            codeElementOptions = Object.keys(this.props.styleToEdit).map( (s,i) => (
                    <Option key={i} optionName={s} optionValue={this.props.styleToEdit[s]} blockId={this.props.block.id}/>));
        };

        if (this.props.block) {
            codeBlockOptions = (
               <React.Fragment>
                   {this.props.activeBlockDOM && (
                        <div className='options__elem'>
                            <input type='button' className={'option option__autosize'} onClick={this.setBlockSizeAuto}/>
                        </div>)}
                    <div className='options__elem'>
                        <input type='button' className={'option option__back'} onClick={this.sendBlockBack}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__copy'} onClick={this.copyBlock}/>
                    </div>
               </React.Fragment>
            );
        }

        if (this.props.activeBlocksId.length > 1) {
            codeBlocksOptions = (
                <React.Fragment>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-top'} onClick={this.alignBlocksTop}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-left'} onClick={this.alignBlocksLeft}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-vertical'} onClick={this.alignBlocksVertical}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-horisontal'} onClick={this.alignBlocksHorisontal}/>
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
                    {codeBlocksOptions}
                    {codeBlockOptions}
                </div>
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        styleToEdit: state.cvData.styleToEdit,
        activeElementId: state.cvData.activeElementId,
        //activeblock.id: state.cvData.activeblock.id,
        activeBlocksId: state.cvData.activeBlocksId,
        activeBlockDOM: state.cvData.activeBlockDOM,
    };
};

export default connect(mapStateToProps)(OptionPanel);
