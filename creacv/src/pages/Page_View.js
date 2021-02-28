import React from 'react';
import {Transition} from "react-transition-group";

import CvView from './../components/CvView';

//import appData from '../appData';

class Page_View extends React.PureComponent {
          
    render() {
        return (
            <Transition in={true} unmountOnExit timeout={{ enter: 500, exit: 500 }}>
                {stateName => {
                    return <CvView transitionClass={stateName}/>
                }}
            </Transition>
        );
    }
}
    
export default Page_View;
    