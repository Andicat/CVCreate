import React from 'react';
import {Route} from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload';

import Page_Load from './Page_Load';
import Page_CV from './Page_CV';
import Page_View from './Page_View';

class PagesRouter extends React.Component {

    componentDidMount() {
        window.addEventListener("beforeunload", () => this.beforeUnload());
    }
 
    componentWillUnmount() {
        
        window.removeEventListener("beforeunload", this.onUnload);
    }

    //уход со страницы    
    beforeUnload = function(evt) {
        debugger
        //evt.returnValue = 'А у вас есть несохранённые изменения!';
        //this.props.history.push('/')
    }
          
    render() {

        return (
            <React.Fragment>
                
                    <Route path='/' exact component={Page_Load}/>
                    <Route path='/cv' component={Page_CV} />
                    <Route path='/view' component={Page_View} />

            </React.Fragment>
        );
    }
}
    
export default PagesRouter;
    