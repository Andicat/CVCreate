import React from 'react';
import {Transition} from "react-transition-group";
import CvSettings from './../components/CvSettings';

class Page_Settings extends React.PureComponent {
      
    render() {
        return (
            <Transition in={true} unmountOnExit timeout={{ enter: 500, exit: 500 }}>
                {stateName => {
                    return <CvSettings transitionClass={stateName}/>
                }}
            </Transition>
        );
    }
}
    
export default Page_Settings;
    