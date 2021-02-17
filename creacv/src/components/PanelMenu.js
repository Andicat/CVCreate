import React from 'react';
import PropTypes from 'prop-types';
import PanelBlock from './PanelBlock';

class PanelMenu extends React.PureComponent {

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
        return <li className='panel__group'>
                    <div className={'panel__group-name' +  (this.props.active?' panel__group-name--active':'')} onClick={this.onClick}>
                        {this.props.data.name}
                    </div>
                    {this.props.active && <ul>
                        {this.props.data.elements.map( (e,i) => { return <PanelBlock key={i} id={i} data={e}/>})}
                    </ul>}
                </li>;
    }
}

export default PanelMenu;
