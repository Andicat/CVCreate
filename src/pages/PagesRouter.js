import React from 'react';
import {Route} from 'react-router-dom';

//import Page_Load from './Page_Load';
import Page_CV from './Page_CV';
import Page_View from './Page_View';

class PagesRouter extends React.Component {
          
    render() {

        return (
            <React.Fragment>
            <Route path='/' exact component={Page_CV}/>
            <Route path='/view' component={Page_View} />
            </React.Fragment>
        );
    }
}
    
export default PagesRouter;
    