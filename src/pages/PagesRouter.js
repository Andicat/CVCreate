import React from 'react';
import {Route} from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload';
import {withDataLoad} from './../components/withDataLoad';

import Page_Load from './Page_Load';
import Page_CV from './Page_CV';
import Page_View from './Page_View';

class PagesRouter extends React.Component {

    componentDidMount() {
        //debugger
       // window.addEventListener("beforeunload", () => this.beforeUnload());
    }
 
    componentWillUnmount() {
        //debugger
        //window.removeEventListener("beforeunload", this.onUnload);
    }

    //уход со страницы    
    beforeUnload = function(evt) {
        //debugger
        //evt.returnValue = 'А у вас есть несохранённые изменения!';
        this.props.history.entries = [];
        this.props.history.index = -1;
        this.props.history.push(`/`);
        //this.props.history.push('/')
    }

    Page_CVWithData = withDataLoad("blocks")(Page_CV);
          
    render() {
        
        let Page_CVWithData=this.Page_CVWithData;
        return (
            <React.Fragment>
                
                    <Route path='/' exact component={Page_CVWithData}/>
                    <Route path='/cv' component={Page_CV} />
                    <Route path='/view' component={Page_View} />

            </React.Fragment>
        );
    }
}
    
export default PagesRouter;
    