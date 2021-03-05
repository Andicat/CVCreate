import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import {CV_ID} from './utils';

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
import {getAutoSize} from './utils';

class OptionPanel extends React.PureComponent {

    static propTypes = {
        styleToEdit: PropTypes.object,
        activeElementId: PropTypes.string,
        activeBlockOptions: PropTypes.object,
        activeBlocksId: PropTypes.array,    
        activeBlockDOM: PropTypes.object, 
        stylePage: PropTypes.object,   
    };

    BLOCK_ACTION = [
        'lock',
        'autosize',
        'back',
        'copy',
        'link',
        'save',
    ];

    BLOCKS_ACTION = [
        'align_top',
        'align_bottom',
        'align_left',
        'align_right',
        'align_vertical',
        'align_horisontal',
        'distribute_vertical',
        'distribute_horisontal',
        'align_width',
        'align_height',
        'group',
    ];

    setStyle = (blockId,optionName,value) => {
        this.props.dispatch(cvStyle_update(blockId,optionName,value));
    }

    setAction = (blockId,optionName,value) => {
        switch (optionName) {
            case 'align_top': {
                this.props.dispatch(cvBlocks_align('top'));
                break;
            }
            case 'align_bottom': {
                this.props.dispatch(cvBlocks_align('bottom'));
                break;
            }
            case 'align_left': {
                this.props.dispatch(cvBlocks_align('left'));
                break;
            }
            case 'align_right': {
                this.props.dispatch(cvBlocks_align('right'));
                break;
            }
            case 'align_vertical': {
                this.props.dispatch(cvBlocks_align('vertical'));
                break;
            }
            case 'align_horisontal': {
                this.props.dispatch(cvBlocks_align('horisontal'));
                break;
            }
            case 'distribute_vertical': {
                this.props.dispatch(cvBlocks_distribute('vertical'));
                break;
            }
            case 'distribute_horisontal': {
                this.props.dispatch(cvBlocks_distribute('horisontal'));
                break;
            }
            case 'align_width': {
                this.props.dispatch(cvBlocks_alignSize('width'));
                break;
            }
            case 'align_height': {
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
            default:
                //console.log('action', optionName, value);
                return;
        }
    }

    render () {
        //debugger
        //console.log('render option panel', this.props);
        let codeElementOptions = null;
        let codeBlockOptions = null;
        let codeBlocksOptions = null;
        let codePageOptions = null;
        let blockAction = [...this.BLOCK_ACTION];
        
        if (this.props.activeBlocksId.length > 1) { //few active blocks
            codeBlocksOptions = this.BLOCKS_ACTION.map( (a,i) => (
                <Option key={i} optionName={a} cbOnChange={this.setAction}/>));
        } else if (this.props.activeBlockOptions) { //one active block
            if (this.props.activeBlockOptions.group) {
                blockAction.push('ungroup');
            } else {
               // blockAction.push('autosize');
            }
            codeBlocksOptions = blockAction.map( (a,i) => {
                let value = null;
                if (a==='lock') {
                    value = !!this.props.activeBlockOptions.lock;
                } else if (a==='link') {
                    value = this.props.activeBlockOptions.link;
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
