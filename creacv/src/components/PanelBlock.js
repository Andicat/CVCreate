import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {cvBlock_add} from '../redux/cvDataAC';
import {createJSX, getAutoSize} from './utils';

class PanelBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
    };

    onClick = (evt) => {
        let sizesAuto = getAutoSize(evt.target.previousSibling);
        let deepCopyBlock = JSON.parse(JSON.stringify(this.props.data));
        this.props.dispatch(cvBlock_add({...deepCopyBlock, width:sizesAuto.width, height:sizesAuto.height}));
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
