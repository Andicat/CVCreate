import React from 'react';
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import Page_Auth from './Page_Auth';
import Page_CV from './Page_CV';
import Page_View from './Page_View';
import Page_Link from './Page_Link';
import Page_Settings from './Page_Settings';

class PagesRouter extends React.Component {

    static propTypes = {
        user: PropTypes.string,
    };

    componentDidMount() {
        window.addEventListener('beforeunload', this.onbeforeunload);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.onbeforeunload);
    }

    onbeforeunload = (evt) => {
        evt.preventDefault();
        evt.returnValue = 'Are you sure you save your data?';
    }

    render() {
        return (
            <React.Fragment>
                <Route path='/' exact component={!this.props.user?Page_Auth:Page_CV}/>
                <Route path='/view' component={!this.props.user?Page_Auth:Page_View}/>
                <Route path='/:linkname' component={Page_Link}/>
                <Route path='/settings' component={!this.props.user?Page_Auth:Page_Settings}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        user: state.cvData.user,
    };
};

export default connect(mapStateToProps)(PagesRouter);
