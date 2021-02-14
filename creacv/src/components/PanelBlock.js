import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { cvBlock_add } from '../redux/cvDataAC';
import { createJSX } from './move';

class PanelBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
    };

    onClick = () => {
        //console.log('add block',this.props.data);
        this.props.dispatch(cvBlock_add(this.props.data));
        
        //edit(evt);
    }

    render () {
        //console.log('render block',this.props.data)
        //{}
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

//export default PanelBlock;
