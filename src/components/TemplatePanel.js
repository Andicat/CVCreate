import React from 'react';
import PropTypes from 'prop-types';
import TemplateGroup from './TemplateGroup';

import {connect} from 'react-redux';

class TemplatePanel extends React.PureComponent {

    static propTypes = {
        transitionClass: PropTypes.string,
        templatesArr: PropTypes.array,
        templatesCustomArr: PropTypes.array,
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
                    {this.props.templatesCustomArr.length &&
                        <TemplateGroup key={groupsCode.length+1} id={groupsCode.length+1} data={{name:'Your templates',elements:this.props.templatesCustomArr}} active={(this.state.activeMenuId===(groupsCode.length+1))?true:false} cbSelected={this.selectMenu}/>
                    }
                    
               </ul>
    }
}

const mapStateToProps = function (state) {
    return {
        templatesArr: state.cvData.templatesArr,
        templatesCustomArr: state.cvData.templatesCustomArr,
    };
};
  
export default connect(mapStateToProps)(TemplatePanel);
