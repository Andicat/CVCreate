import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import CvBlock from './CvBlock';
import {createStyle} from './utils';
import {loadFirebase} from './withDataLoad';

class CvLogin extends React.PureComponent {

    componentDidMount() {
        this.loadData();
    }

    state = {
        login: null,
    }

    loadData = async () => {
        //templates
        let loadData = {};
        let loadTemplates = new Promise((resolve) => {
            loadFirebase('LoginList','list',resolve);
        });
        await loadTemplates.then((data) => {
            loadData.templates = data.templates;
            loadData.image = imageUrl;
            this.props.dispatch(templates_load(loadData));
            //setTimeout(() => this.props.history.push('/cv'),2000);
        });


    onSubmit = () => {
        debugger
    }
    
    render () {
        return <form class="cv__login" name="login" onSubmit={this.onSubmit}>
                    <input type="text" name="name" maxlength="30" placeholder="Your name..."/>
                </form>;    
    }
}
  
export default withRouter(CvLogin);
