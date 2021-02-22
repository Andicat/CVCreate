import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import Action from './Action';

import {connect} from 'react-redux';
import {cvBlock_sendBack,
    cvBlock_copy,
    cvBlock_setSize,
    cvBlocks_align,
    cvBlocks_alignSize,
    cvBlocks_distribute,
    cvBlocks_group,
    cvBlock_ungroup, 
    cvBlock_lock } from '../redux/cvDataAC';
import {getAutoSize} from './utils';

class OptionPanel extends React.PureComponent {

    static propTypes = {
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
                    <Action key={1} actionName={'lock'} actionValue={this.props.block.lock?this.props.block.lock:false} cbOnChange={this.lockPositionBlock}></Action>
                    {(!this.props.block.ungroup && this.props.activeBlockDOM) && (
                        <Action key={2} actionName={'autosize'} cbOnChange={this.setBlockSizeAuto}></Action>
                    )}
                    <Action key={3} actionName={'back'} cbOnChange={this.sendBlockBack}></Action>
                    <Action key={4} actionName={'copy'} cbOnChange={this.copyBlock}></Action>
                    {this.props.block.ungroup && (
                        <Action key={5} actionName={'ungroup'} cbOnChange={this.ungroupBlock}></Action>
                    )}
               </React.Fragment>
            );
        }

        if (this.props.activeBlocksId.length > 1) {
            codeBlocksOptions = (
                <React.Fragment>
                    <Action key={6} actionName={'align_top'} cbOnChange={this.alignBlocksTop}></Action>
                    <Action key={7} actionName={'align_bottom'} cbOnChange={this.alignBlocksBottom}></Action>
                    <Action key={8} actionName={'align_left'} cbOnChange={this.alignBlocksLeft}></Action>
                    <Action key={9} actionName={'align_right'} cbOnChange={this.alignBlocksRight}></Action>
                    <Action key={10} actionName={'align_vertical'} cbOnChange={this.alignBlocksVertical}></Action>
                    <Action key={11} actionName={'align_horisontal'} cbOnChange={this.alignBlocksHorisontal}></Action>
                    <Action key={12} actionName={'distribute_vertical'} cbOnChange={this.distributeBlocksVertical}></Action>
                    <Action key={13} actionName={'distribute_horisontal'} cbOnChange={this.distributeBlocksHorisontal}></Action>
                    <Action key={14} actionName={'align_width'} cbOnChange={this.setBlocksSizeWidth}></Action>
                    <Action key={15} actionName={'align_height'} cbOnChange={this.setBlocksSizeHeight}></Action>
                    <Action key={16} actionName={'group'} cbOnChange={this.groupBlocks}></Action>
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
        styleToEdit: state.cvData.styleToEdit,
        activeElementId: state.cvData.activeElementId,
        activeBlocksId: state.cvData.activeBlocksId,
        activeBlockDOM: state.cvData.activeBlockDOM,
    };
};

export default connect(mapStateToProps)(OptionPanel);
