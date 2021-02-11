import React from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import { cvBlock_add } from '../redux/cvDataAC';

class PanelBlock extends React.PureComponent {

    static propTypes = {
        name: PropTypes.string.isRequired,
        blockData: PropTypes.object.isRequired,
    };

    static defaultProps = {
        name: 'Add block',
    };

    state = {
        //style:{...this.props.style},
    }

    onClick = (evt) => {
        //console.log('add block',this.props.blockData);
        this.props.dispatch(cvBlock_add(this.props.blockData));
        
        //edit(evt);
    }

    render () {
        return (
            <div className='panel__block'>
                <button className='panel__block-add' onClick={this.onClick}>{this.props.name}</button>
                <div className='panel__block-view'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect()(PanelBlock);

//export default PanelBlock;
