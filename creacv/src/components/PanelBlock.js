import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvBlock_add} from '../redux/cvDataAC';
import {createJSX} from './utils';

class PanelBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
    };

    onClick = (evt) => {
        let elementDOM = evt.target.previousSibling;
        elementDOM.style.position='absolute';
        elementDOM.style.visibility='hidden';
        elementDOM.style.height='auto';
        let autoHeight = elementDOM.offsetHeight;
        let autoWidth = elementDOM.offsetWidth;
        elementDOM.style.position='';
        elementDOM.style.visibility='';
        let deepCopyBlock = JSON.parse(JSON.stringify(this.props.data));
        this.props.dispatch(cvBlock_add({...deepCopyBlock, width:autoWidth, height:autoHeight}));
    }

    render () {
        return (
            <li className='panel__block'>
                <div className='panel__block-view'>
                    {createJSX(this.props.id,this.props.data,false)}
                </div>
                <button className='panel__block-add' onClick={this.onClick}></button>
            </li>
        );
    }
}

export default connect()(PanelBlock);
