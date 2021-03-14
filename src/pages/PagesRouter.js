import React from 'react';
import {Route} from 'react-router-dom';

import Page_CV from './Page_CV';
import Page_View from './Page_View';
import Page_Link from './Page_Link';
import Page_Settings from './Page_Settings';

class PagesRouter extends React.Component {

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
                <Route path='/' exact component={Page_CV}/>
                <Route path='/view' component={Page_View}/>
                <Route path='/:linkname' component={Page_Link}/>
                <Route path='/settings' component={Page_Settings}/>
            </React.Fragment>
        );
    }
}

export default PagesRouter;
