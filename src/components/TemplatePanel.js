import React from 'react';
import PropTypes from 'prop-types';
import TemplateGroup from './TemplateGroup';

import {connect} from 'react-redux';

class TemplatePanel extends React.PureComponent {

    static propTypes = {
        transitionClass: PropTypes.string,
        templatesArr: PropTypes.array,
    };

    state = {
        activeMenuId: null,
    }

    selectMenu = (id) => {
        this.setState( {activeMenuId:(id===this.state.activeMenuId)?null:id} );
    }

    render () {
        //console.log('render template panel',this.props);
        var groupsCode = this.props.templatesArr.map( (g,i) => {
            return <TemplateGroup key={i} id={i} data={g} active={(this.state.activeMenuId===i)?true:false} cbSelected={this.selectMenu}/>
            });

        return <ul className={'template-panel__menu ' + this.props.transitionClass}>
                    {groupsCode}
               </ul>
    }
}

const mapStateToProps = function (state) {
    return {
        templatesArr: state.templatesData.templatesArr,
    };
};
  
export default connect(mapStateToProps)(TemplatePanel);
