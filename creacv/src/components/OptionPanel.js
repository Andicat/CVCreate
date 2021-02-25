import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import Action from './Action';
import {CV_ID} from './utils';

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
        activeBlock: PropTypes.object,
        activeBlocksId: PropTypes.array,    
        activeBlockDOM: PropTypes.object, 
        stylePage: PropTypes.object,   
    };

    state = {
        tooltip: null,
    }

    setTooltip = (text) => {
        this.setState({tooltip:text});
    }

    sendBlockBack = () => {
        this.props.dispatch(cvBlock_sendBack(this.props.activeBlock.id));
    }

    copyBlock = () => {
        this.props.dispatch(cvBlock_copy(this.props.activeBlock.id));
    }

    setBlockSizeAuto = () => {
        let sizesAuto = getAutoSize(this.props.activeBlockDOM);
        this.props.dispatch(cvBlock_setSize(this.props.activeBlock.id,sizesAuto.height,sizesAuto.width));
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
        this.props.dispatch(cvBlock_ungroup(this.props.activeBlock.id));
    }

    lockPositionBlock = (evt) => {
        this.props.dispatch(cvBlock_lock(this.props.activeBlock.id,evt));
    }

    render () {
        //console.log('render option panel', this.props);
        let codeElementOptions = null;
        let codeBlockOptions = null;
        let codeBlocksOptions = null;
        let codePageOptions = null;
        
        if (this.props.activeElementId) {
            codeElementOptions = Object.keys(this.props.styleToEdit).map( (s,i) => (
                    <Option key={i} optionName={s} optionValue={this.props.styleToEdit[s]} blockId={this.props.activeBlock.id} cbSetTooltip={this.setTooltip}/>));
        };

        if (this.props.activeBlock) {
            codeBlockOptions = (
               <React.Fragment>
                    <Action key={1} actionName={'lock'} actionValue={this.props.activeBlock.lock?this.props.activeBlock.lock:false} cbOnChange={this.lockPositionBlock} cbSetTooltip={this.setTooltip}></Action>
                    {(!this.props.activeBlock.ungroup && this.props.activeBlockDOM) && (
                        <Action key={2} actionName={'autosize'} cbOnChange={this.setBlockSizeAuto} cbSetTooltip={this.setTooltip}></Action>
                    )}
                    <Action key={3} actionName={'back'} cbOnChange={this.sendBlockBack} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={4} actionName={'copy'} cbOnChange={this.copyBlock} cbSetTooltip={this.setTooltip}></Action>
                    {this.props.activeBlock.ungroup && (
                        <Action key={5} actionName={'ungroup'} cbOnChange={this.ungroupBlock} cbSetTooltip={this.setTooltip}></Action>
                    )}
               </React.Fragment>
            );
        } else if (this.props.stylePage) {
            codePageOptions = Object.keys(this.props.stylePage).map( (s,i) => (
                <Option key={i} optionName={s} optionValue={this.props.stylePage[s]} blockId={CV_ID} cbSetTooltip={this.setTooltip}/>));
        }
        

        if (this.props.activeBlocksId.length > 1) {
            codeBlocksOptions = (
                <React.Fragment>
                    <Action key={6} actionName={'align_top'} cbOnChange={this.alignBlocksTop} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={7} actionName={'align_bottom'} cbOnChange={this.alignBlocksBottom} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={8} actionName={'align_left'} cbOnChange={this.alignBlocksLeft} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={9} actionName={'align_right'} cbOnChange={this.alignBlocksRight} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={10} actionName={'align_vertical'} cbOnChange={this.alignBlocksVertical} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={11} actionName={'align_horisontal'} cbOnChange={this.alignBlocksHorisontal} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={12} actionName={'distribute_vertical'} cbOnChange={this.distributeBlocksVertical} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={13} actionName={'distribute_horisontal'} cbOnChange={this.distributeBlocksHorisontal} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={14} actionName={'align_width'} cbOnChange={this.setBlocksSizeWidth} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={15} actionName={'align_height'} cbOnChange={this.setBlocksSizeHeight} cbSetTooltip={this.setTooltip}></Action>
                    <Action key={16} actionName={'group'} cbOnChange={this.groupBlocks} cbSetTooltip={this.setTooltip}></Action>
                </React.Fragment>
            );
        }

        return (
            <div className='option-panel'>
                {((codePageOptions && !codeBlocksOptions) || codeElementOptions) && 
                    <div className='option-panel__group option-panel__group--style'>
                        {codePageOptions}
                        {codeElementOptions}
                    </div>
                }
                {codeBlocksOptions && 
                    <div className='option-panel__group option-panel__group--blocks'>
                        {codeBlocksOptions}
                    </div>
                }
                {codeBlockOptions && 
                    <div className='option-panel__group option-panel__group--block'>
                        {codeBlockOptions}
                    </div>
                }
                {this.state.tooltip && 
                    <span className='option-panel__tooltip'>{this.state.tooltip}</span>
                }
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        stylePage: state.cvData.stylePage,
        styleToEdit: state.cvData.styleToEdit,
        activeElementId: state.cvData.activeElementId,
        activeBlocksId: state.cvData.activeBlocksId,
        activeBlockDOM: state.cvData.activeBlockDOM,
    };
};

export default connect(mapStateToProps)(OptionPanel);
