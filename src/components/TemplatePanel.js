import React from 'react';
import PropTypes from 'prop-types';
import TemplateGroup from './TemplateGroup';
import {connect} from 'react-redux';

class TemplatePanel extends React.PureComponent {

    static propTypes = {
        transitionClass: PropTypes.string,
        templates: PropTypes.array,
        templatesUser: PropTypes.array,
    };

    state = {
        activeMenuId: null,
    }

    selectMenu = (id) => {
        this.setState( {activeMenuId:(id===this.state.activeMenuId)?null:id} );
    }

    render () {
        let isTemplatesUser = this.props.templatesUser?this.props.templatesUser.length>0:false;
        let groupsCode = this.props.templates.map( (g,i) => {
            return <TemplateGroup key={i} id={i} data={g} active={(this.state.activeMenuId===i)?true:false} cbSelected={this.selectMenu}/>
            });
        return <ul className={'template-panel__menu ' + this.props.transitionClass}>
                    {groupsCode}
                    {isTemplatesUser &&
                        <TemplateGroup key={groupsCode.length+1} id={groupsCode.length+1} data={{name:'Your templates',elements:this.props.templatesUser}} custom={true} active={(this.state.activeMenuId===(groupsCode.length+1))?true:false} cbSelected={this.selectMenu}/>
                    }
               </ul>
    }
}

const mapStateToProps = function (state) {
    return {
        templates: state.cvData.templates,
        templatesUser: state.cvData.templatesUser,
    };
};
  
export default connect(mapStateToProps)(TemplatePanel);
