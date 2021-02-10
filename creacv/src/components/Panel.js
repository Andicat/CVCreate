import React from 'react';
import PropTypes from 'prop-types';
import PanelBlock from './PanelBlock';
import { createJSX } from './move';

class Panel extends React.PureComponent {

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
        //console.log('edit figure');
        //edit(evt);
    }

    render () {
        var blocksCode = this.props.blocks.map( (b,i) => {
            return <PanelBlock key={i} name={b.name} blockData={b}>{createJSX(b)}</PanelBlock>
        });

        //console.log(blocksCode);
        return <aside className="panel" onClick={this.onClick}>
            {blocksCode}
        </aside>;
    }
}

export default Panel;
