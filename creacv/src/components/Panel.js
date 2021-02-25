import React from 'react';
import PropTypes from 'prop-types';
import PanelMenu from './PanelMenu';

import {connect} from 'react-redux';
import {panel_show} from '../redux/cvDataAC';

class Panel extends React.PureComponent {

    static propTypes = {
        groups: PropTypes.array,
        show: PropTypes.bool
    };

    static defaultProps = {
        groups: [],
    };

    state = {
        activeMenuId: null,
    }

    selectMenu = (id) => {
        this.setState( {activeMenuId:(id===this.state.activeMenuId)?null:id} );
    }

    showPanel = () => {
        this.props.dispatch(panel_show(!this.props.show));
    }

    render () {
        var groupsCode = this.props.groups.map( (g,i) => {
            return <PanelMenu key={i} id={i} data={g} active={(this.state.activeMenuId===i)?true:false} cbSelected={this.selectMenu}/>
            });

        return <aside className='panel'>
            {this.props.show && <ul className='panel__menu'>
                {groupsCode}
            </ul>}
            <button className='panel__button-hide' onClick={this.showPanel}/>
        </aside>;
    }
}

const mapStateToProps = function (state) {
    return {
        show: state.cvData.showPanel,
    };
};

export default connect(mapStateToProps)(Panel);

