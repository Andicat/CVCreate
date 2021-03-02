import React from 'react';
import {Transition} from "react-transition-group";

import CV from './../components/CV';

class Page_CV extends React.PureComponent {
          
    render() {
        console.log(this.props.history);
        return (
            <Transition in={true} unmountOnExit timeout={{ enter: 500, exit: 500 }}>
                {stateName => {
                    return <CV transitionClass={stateName}/>
                }}
            </Transition>
        );
    }
}
    
export default Page_CV;
    