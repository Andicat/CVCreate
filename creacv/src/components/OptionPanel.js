import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

import {connect} from 'react-redux';
import {cvBlock_sendBack,
    cvBlock_copy,
    cvBlock_setSize,
    cvBlocks_align,
    cvBlocks_alignSize,
    cvBlocks_distribute,
    cvBlocks_group,
    cvBlock_ungroup, 
    cvBlock_lock} from '../redux/cvDataAC';
import {getAutoSize, CV_ID} from './utils';

class OptionPanel extends React.PureComponent {

    static propTypes = {
        stylePage: PropTypes.object,    
        styleToEdit: PropTypes.object,     
        activeElementId: PropTypes.string,   
        block: PropTypes.object,
        activeBlocksId: PropTypes.array,    
        activeBlockDOM: PropTypes.object,    
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
        this.props.dispatch(cvBlocks_align('top'));
    }

    alignBlocksBottom = () => {
        this.props.dispatch(cvBlocks_align('bottom'));
    }

    alignBlocksLeft = () => {
        this.props.dispatch(cvBlocks_align('left'));
    }

    alignBlocksRight = () => {
        this.props.dispatch(cvBlocks_align('right'));
    }

    alignBlocksVertical = () => {
        this.props.dispatch(cvBlocks_align('vertical'));
    }

    alignBlocksHorisontal = () => {
        this.props.dispatch(cvBlocks_align('horisontal'));
    }

    distributeBlocksVertical = () => {
        this.props.dispatch(cvBlocks_distribute('vertical'));
    }

    distributeBlocksHorisontal = () => {
        this.props.dispatch(cvBlocks_distribute('horisontal'));
    }

    setBlocksSizeWidth = () => {
        this.props.dispatch(cvBlocks_alignSize('width'));
    }

    setBlocksSizeHeight = () => {
        this.props.dispatch(cvBlocks_alignSize('height'));
    }

    groupBlocks = () => {
        this.props.dispatch(cvBlocks_group());
    }

    ungroupBlock = () => {
        this.props.dispatch(cvBlock_ungroup(this.props.block.id));
    }

    lockPositionBlock = (evt) => {
        this.props.dispatch(cvBlock_lock(this.props.block.id,evt.target.checked));
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
            //console.log('direction',this.props.direction);
            codeBlockOptions = (
               <React.Fragment>
                   <div className='options__elem'>
                        <input type='checkbox' id={'lock'} className={'option option__checkbox option__checkbox--lock'} 
                        checked={this.props.block.lock?this.props.block.lock:false} onChange={this.lockPositionBlock}/>
                        <label htmlFor={'lock'}/>
                    </div>
                   {(!this.props.block.ungroup && this.props.activeBlockDOM) && (
                        <div className='options__elem'>
                            <input type='button' className={'option option__autosize'} onClick={this.setBlockSizeAuto}/>
                        </div>)}
                    <div className='options__elem'>
                        <input type='button' className={'option option__back'} onClick={this.sendBlockBack}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__copy'} onClick={this.copyBlock}/>
                    </div>
                    {this.props.block.ungroup && (
                        <div className='options__elem'>
                            <input type='button' className={'option option__ungroup'} onClick={this.ungroupBlock}/>
                        </div>)}
               </React.Fragment>
            );
        } else {
            codeElementOptions = Object.keys(this.props.stylePage).map( (s,i) => (
                <Option key={i} optionName={s} optionValue={this.props.stylePage[s]} blockId={CV_ID}/>));
        }

        if (this.props.activeBlocksId.length > 1) {
            codeBlocksOptions = (
                <React.Fragment>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-top'} onClick={this.alignBlocksTop}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-bottom'} onClick={this.alignBlocksBottom}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-left'} onClick={this.alignBlocksLeft}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-right'} onClick={this.alignBlocksRight}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-vertical'} onClick={this.alignBlocksVertical}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-horisontal'} onClick={this.alignBlocksHorisontal}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__distribute-vertical'} onClick={this.distributeBlocksVertical}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__distribute-horisontal'} onClick={this.distributeBlocksHorisontal}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-width'} onClick={this.setBlocksSizeWidth}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__align-height'} onClick={this.setBlocksSizeHeight}/>
                    </div>
                    <div className='options__elem'>
                        <input type='button' className={'option option__group'} onClick={this.groupBlocks}/>
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
                {codeBlocksOptions}
                <div className='options__block'>
                    {codeBlockOptions}
                </div>
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        stylePage: state.cvData.stylePage,
        styleToEdit: state.cvData.styleToEdit,
        activeElementId: state.cvData.activeElementId,
        //activeblock.id: state.cvData.activeblock.id,
        activeBlocksId: state.cvData.activeBlocksId,
        activeBlockDOM: state.cvData.activeBlockDOM,
    };
};

export default connect(mapStateToProps)(OptionPanel);
