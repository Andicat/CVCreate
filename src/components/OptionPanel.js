import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import {CV_ID, BLOCK_ACTION, BLOCKS_ACTION, getAutoSize} from '../modules/utils';

import {connect} from 'react-redux';
import {cvStyle_update,
    cvBlock_sendBack,
    cvBlock_copy,
    cvBlock_setSize,
    cvBlocks_align,
    cvBlocks_alignSize,
    cvBlocks_distribute,
    cvBlocks_group,
    cvBlock_ungroup, 
    cvBlock_lock,
    cvBlock_setLink,
    templates_add } from '../redux/cvDataAC';

//панель возможных опций для блока/блоков
class OptionPanel extends React.PureComponent {

    static propTypes = {
        styleToEdit: PropTypes.object,
        activeElementId: PropTypes.string,
        activeBlockOptions: PropTypes.object,
        activeBlocksId: PropTypes.array,    
        activeBlockDOM: PropTypes.object, 
        stylePage: PropTypes.object,   
    };

    //меняем стиль блока
    setStyle = (blockId,optionName,value) => {
        this.props.dispatch(cvStyle_update(blockId,optionName,value));
    }

    //действия с блоком/блоками
    setAction = (blockId,optionName,value) => {
        switch (optionName) {
            case 'alignTop': {
                this.props.dispatch(cvBlocks_align('top'));
                break;
            }
            case 'alignBottom': {
                this.props.dispatch(cvBlocks_align('bottom'));
                break;
            }
            case 'alignLeft': {
                this.props.dispatch(cvBlocks_align('left'));
                break;
            }
            case 'alignRight': {
                this.props.dispatch(cvBlocks_align('right'));
                break;
            }
            case 'alignVertical': {
                this.props.dispatch(cvBlocks_align('vertical'));
                break;
            }
            case 'alignHorisontal': {
                this.props.dispatch(cvBlocks_align('horisontal'));
                break;
            }
            case 'distributeVertical': {
                this.props.dispatch(cvBlocks_distribute('vertical'));
                break;
            }
            case 'distributeHorisontal': {
                this.props.dispatch(cvBlocks_distribute('horisontal'));
                break;
            }
            case 'alignWidth': {
                this.props.dispatch(cvBlocks_alignSize('width'));
                break;
            }
            case 'alignHeight': {
                this.props.dispatch(cvBlocks_alignSize('height'));
                 break;
            }
            case 'group': {
                this.props.dispatch(cvBlocks_group());
                this.setState({tooltip:null});
                break;
            }
            case 'lock': {
                this.props.dispatch(cvBlock_lock(blockId));
                break;
            }
            case 'autosize': {
                if (this.props.activeBlockDOM) {
                    let sizesAuto = getAutoSize(this.props.activeBlockDOM);
                    this.props.dispatch(cvBlock_setSize(blockId,sizesAuto.height,sizesAuto.width));            
                }
                break;
            }
            case 'back': {
                this.props.dispatch(cvBlock_sendBack(blockId));
                this.setState({tooltip:null});
                break;
            }
            case 'copy': {
                this.props.dispatch(cvBlock_copy(blockId));
                this.setState({tooltip:null});
                break;
            }
            case 'ungroup': {
                this.props.dispatch(cvBlock_ungroup(blockId));
                this.setState({tooltip:null});
                break;
            }
            case 'link': {
                this.props.dispatch(cvBlock_setLink(blockId,value));
                break;
            }
            case 'save': {
                this.props.dispatch(templates_add(blockId));
                break;
            }
            case 'width': {
                this.props.dispatch(cvBlock_setSize(blockId,false,value));
                break;
            }
            case 'height': {
                this.props.dispatch(cvBlock_setSize(blockId,value,false));
                break;
            }
            default:
                //console.log('action', optionName, value);
                return;
        }
    }

    render () {
        let codeElementOptions = null;
        let codeBlockOptions = null;
        let codeBlocksOptions = null;
        let codePageOptions = null;
        let blockAction = [...BLOCK_ACTION];
        
        if (this.props.activeBlocksId.length > 1) { //few active blocks
            codeBlocksOptions = BLOCKS_ACTION.map( (a,i) => (
                <Option key={i} optionName={a} cbOnChange={this.setAction}/>));
        } else if (this.props.activeBlockOptions) { //one active block
            if (this.props.activeBlockOptions.group) {
                blockAction.push('ungroup');
            }
            if (this.props.activeBlockOptions.width) {
                blockAction.push('width');
            }
            if (this.props.activeBlockOptions.height) {
                blockAction.push('height');
            }
            if (!this.props.activeBlockOptions.width && !this.props.activeBlockOptions.height && !this.props.activeBlockOptions.group) {
                blockAction.push('autosize');
            }
            codeBlocksOptions = blockAction.map( (a,i) => {
                let value = null;
                if (a==='lock') {
                    value = !!this.props.activeBlockOptions.lock;
                } else if (a==='link') {
                    value = this.props.activeBlockOptions.link;
                } else if (a==='width') {
                    value = this.props.activeBlockOptions.width;
                } else if (a==='height') {
                    value = this.props.activeBlockOptions.height;
                }
                return <Option key={'block-' + i} optionName={a} optionValue={value} blockId={this.props.activeBlockOptions.id} cbOnChange={this.setAction}/>;
            });
            if (this.props.activeElementId) { //active element
                let styles = Object.keys(this.props.styleToEdit).sort();
                codeElementOptions = styles.map( (s,i) => (
                    <Option key={'option-' + i} optionName={s} optionValue={this.props.styleToEdit[s]} blockId={this.props.activeBlockOptions.id} cbOnChange={this.setStyle}/>)); 
            };
        } else if (this.props.stylePage) { //non active block, but active page
            let styles = Object.keys(this.props.stylePage).sort();
            codePageOptions = styles.map( (s,i) => (
                <Option key={i} optionName={s} optionValue={this.props.stylePage[s]} blockId={CV_ID} cbOnChange={this.setStyle}/>));
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
