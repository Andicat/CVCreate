import React from 'react';
import PropTypes from 'prop-types';

import CVElement from './CVElement';

class CVElementGroup extends React.PureComponent {

    static propTypes = {
        cv: PropTypes.bool,
        blockId: PropTypes.number.isRequired,
        data: PropTypes.object,
        activeElementId: PropTypes.string,
    };

    static defaultProps = {
        cv: false,
    };

    render () {
        let  className = 'cv__group' + (this.props.data.direction?(' cv__group--' + this.props.data.direction):'');
        return (
            <div className={className}>
                {this.props.data.elements.map( (e,i) => {
                    let elementId = this.props.blockId + '-' + i;
                    return <CVElement  key={elementId} id={elementId} blockId={this.props.blockId} cv={this.props.cv} data={e} active={elementId===this.props.activeElementId}></CVElement>
                })}
            </div>);
    }
}

export default CVElementGroup;
