import React from 'react';
import {Route} from 'react-router-dom';

import Page_CV from './Page_CV';
import Page_View from './Page_View';
import Page_Link from './Page_Link';

class PagesRouter extends React.Component {

    render() {
        
        return (
            <React.Fragment>
                <Route path='/' exact component={Page_CV}/>
                <Route path='/view' component={Page_View}/>
                <Route path="/:linkname" component={Page_Link}/>
            </React.Fragment>
        );
    }
}
    
export default PagesRouter;
    