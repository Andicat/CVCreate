import React from 'react';
import PropTypes from 'prop-types';
import { createElement } from './move'

class PanelBlocks extends React.PureComponent {

    static propTypes = {
        blocks: PropTypes.array,
    };

    static defaultProps = {
        blocks: [],
    };

    state = {
        //style:{...this.props.style},
    }

    onClick = (evt) => {
        console.log('edit figure');
        //edit(evt);
    }

    render () {
        let blocksCode = this.props.blocks.map( b => createElement(b));
        console.log(blocksCode);
        return <div className="panel-blocks" onClick={this.onClick}>
            {blocksCode}
        </div>;
    }
}

export default PanelBlocks;
