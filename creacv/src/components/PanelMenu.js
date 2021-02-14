import React from 'react';
import PropTypes from 'prop-types';
import PanelBlock from './PanelBlock';

import {connect} from 'react-redux';
import { cvBlock_add } from '../redux/cvDataAC';
import { createJSX } from './move';

class PanelMenu extends React.PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    state = {
        active: false,
    }


    onClick = () => {
        this.setState({active:!this.state.active});
        //console.log('open group',this.state.active);
    }


    render () {
        let className = 'panel__group' + (this.state.active?' panel__group--active':'');
        return <li className={className}>
                    <div className="panel__group-name" onClick={this.onClick}>
                        {this.props.data.name}
                    </div>
                    {this.state.active && <ul>
                        {this.props.data.elements.map( (e,i) => { return <PanelBlock key={i} id={i} data={e}/>})}
                    </ul>}
                </li>;
    }
}

export default PanelMenu;

//export default PanelBlock;
