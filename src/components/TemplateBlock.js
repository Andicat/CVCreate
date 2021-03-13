import React from 'react';
import PropTypes from 'prop-types';
import CvElement from './CvElement';
import {connect} from 'react-redux';
import {cvBlock_add, templates_delete, templates_open_panel} from '../redux/cvDataAC';
import {getAutoSize} from '../modules/utils';

//шаблон
class TemplateBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        transitionClass: PropTypes.string,
        custom: PropTypes.bool,
    };

    //добавлем блок в документ
    onClickAdd = (evt) => {
        let sizesAuto = getAutoSize(evt.target.previousSibling);
        let deepCopyBlock = JSON.parse(JSON.stringify(this.props.data));
        this.props.dispatch(cvBlock_add({...deepCopyBlock, width:(this.props.data.width?this.props.data.width:sizesAuto.width), height:(this.props.data.height?this.props.data.height:sizesAuto.height)}));
        setTimeout(() => this.props.dispatch(templates_open_panel()),0);
    }

    //удаляем шаблон из списка
    onClickDelete = () => {
        this.props.dispatch(templates_delete(this.props.id));
    }

    render () {
        let elementCode = <CvElement key={'' + this.props.id} id={'' + this.props.id} blockId={this.props.id} cv={false} data={this.props.data} active={false} width={this.props.data.width} height={this.props.data.height}></CvElement>;
        return (    
            <li className={'template-panel__block ' + this.props.transitionClass}>
                <div className='template-panel__block-view'>
                    {elementCode}
                </div>
                <button className='template-panel__block-add' onClick={this.onClickAdd}></button>
                {this.props.custom &&
                    <button className='template-panel__button-delete' onClick={this.onClickDelete}></button>
                }
            </li>
        );
    }
}

export default connect()(TemplateBlock);
