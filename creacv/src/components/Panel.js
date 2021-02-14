import React from 'react';
import PropTypes from 'prop-types';
import PanelMenu from './PanelMenu';

class Panel extends React.PureComponent {

    static propTypes = {
        groups: PropTypes.array,
    };

    static defaultProps = {
        groups: [],
    };

    state = {
        //style:{...this.props.style},
    }

    render () {
        var groupsCode = this.props.groups.map( (g,i) => {
            return <PanelMenu key={i} data={g}/>
            });

        return <aside className="panel">
            <ul className='panel__menu'>
                {groupsCode}
            </ul>
        </aside>;
    }
}

export default Panel;
