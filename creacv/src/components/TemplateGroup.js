import React from 'react';
import PropTypes from 'prop-types';
import TemplateBlock from './TemplateBlock';
import {Transition} from "react-transition-group";

class TemplateGroup extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        cbSelected: PropTypes.func.isRequired,
        active: PropTypes.bool.isRequired,
    };

    onClick = () => {
        this.props.cbSelected(this.props.id);
    }

    render () {
        return <li className='template-panel__group'>
                    <div className={'template-panel__group-name' +  (this.props.active?' template-panel__group-name--active':'')} onClick={this.onClick}>
                        {this.props.data.name}
                    </div>
                    <ul>
                        {this.props.data.elements.map( (e,i) => { 
                            return <Transition key={i} in={this.props.active} unmountOnExit timeout={{ enter: 50*(i+1), exit: 50*(i+1) }}>
                                    {stateName => {
                                        return <TemplateBlock key={i} id={i} data={e} transitionClass={stateName}/>
                                    }}
                                </Transition>
                        })}
                    </ul>
                </li>;
    }
}

export default TemplateGroup;
