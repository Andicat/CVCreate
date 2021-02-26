import React from 'react';
import PropTypes from 'prop-types';
import TemplateGroup from './TemplateGroup';
import CSSTransitionGroup from 'react-transition-group';

class TemplatePanel extends React.PureComponent {

    static propTypes = {
        groups: PropTypes.array,
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

    render () {
        var groupsCode = this.props.groups.map( (g,i) => {
            return <TemplateGroup key={i} id={i} data={g} active={(this.state.activeMenuId===i)?true:false} cbSelected={this.selectMenu}/>
            });

        return <ul className='template-panel__menu'>
                    <CSSTransitionGroup transitionName="example">
                        {groupsCode}
                    </CSSTransitionGroup>    
               </ul>
    }
}

export default TemplatePanel;

