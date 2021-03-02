import React from 'react';
import {Transition} from "react-transition-group";
//import {withDataLoad} from './../components/withDataLoad';
import { Beforeunload } from 'react-beforeunload';

import CV from './../components/CV';

class Page_CV extends React.PureComponent {

    componentDidMount() {
        console.log(this.props.history);
        //debugger
        //let aa = 
        //window.location.reload();
        window.addEventListener("beforeunload",this.beforeUnload);
        //window.onhashchange = this.beforeUnload;
    }
 
    componentWillUnmount() {
        debugger
        window.removeEventListener("beforeunload", this.onUnload);
    }

    //уход со страницы    
    beforeUnload = function(evt) {
        //debugger
        //evt.returnValue = 'А у вас есть несохранённые изменения!';
        this.props.history.push('/')
    }

    render() {
        
        return (
            <Beforeunload onBeforeunload={() => "You'll lose your data!"}>
<Transition in={true} unmountOnExit timeout={{ enter: 500, exit: 500 }}>
                {stateName => {
                    return <CV transitionClass={stateName}/>
                }}
            </Transition>
            </Beforeunload>
            
        );
    }
}
    
export default Page_CV;
    