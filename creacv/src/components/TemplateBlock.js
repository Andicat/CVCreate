import React from 'react';
import PropTypes from 'prop-types';

import CvElement from './CvElement';

import {connect} from 'react-redux';
import {cvBlock_add} from '../redux/cvDataAC';
import {getAutoSize} from './utils';

class TemplateBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        transitionClass: PropTypes.string,
    };

    onClick = (evt) => {
        let sizesAuto = getAutoSize(evt.target.previousSibling);
        let deepCopyBlock = JSON.parse(JSON.stringify(this.props.data));
        this.props.dispatch(cvBlock_add({...deepCopyBlock, width:sizesAuto.width, height:sizesAuto.height}));
    }

    render () {
        //console.log('render panel.block',this.props.transitionClass);
        let elementCode = <CvElement key={'' + this.props.id} id={'' + this.props.id} blockId={this.props.id} cv={false} data={this.props.data} active={false}></CvElement>;
        return (    
            <li className={'template-panel__block ' + this.props.transitionClass}>
                <div className='template-panel__block-view'>
                    {elementCode}
                </div>
                <button className='template-panel__block-add' onClick={this.onClick}></button>
            </li>
        );
    }
}

export default connect()(TemplateBlock);
