import React from 'react';
import {Transition} from 'react-transition-group';

import Auth from './../components/Auth';

class Page_Auth extends React.PureComponent {

    render() {
        return (
            <Transition in={true} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
                {stateName => {
                    return <Auth transitionClass={stateName}/>;
                }}
            </Transition>
        );
    }
}

export default Page_Auth;
