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
        activeMenuId: null,
        show: true,
    }

    selectMenu = (id) => {
        this.setState( {activeMenuId:(id===this.state.activeMenuId)?null:id} );
    }

    showPanel = () => {
        this.setState( {show:!this.state.show} );
    }

    render () {
        var groupsCode = this.props.groups.map( (g,i) => {
            return <PanelMenu key={i} id={i} data={g} active={(this.state.activeMenuId===i)?true:false} cbSelected={this.selectMenu}/>
            });

        return <aside className='panel'>
            {this.state.show && <ul className='panel__menu'>
                {groupsCode}
            </ul>}
            <button className='panel__button-hide' onClick={this.showPanel}/>
        </aside>;
    }
}

export default Panel;
