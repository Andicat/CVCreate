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
        activeMenuId:null,
    }

    menuSelected = (id) => {
        this.setState( {activeMenuId:(id===this.state.activeMenuId)?null:id} );
    }

    render () {
        var groupsCode = this.props.groups.map( (g,i) => {
            return <PanelMenu key={i} id={i} data={g} active={(this.state.activeMenuId===i)?true:false} cbSelected={this.menuSelected}/>
            });

        return <aside className="panel">
            <ul className='panel__menu'>
                {groupsCode}
            </ul>
        </aside>;
    }
}

export default Panel;
