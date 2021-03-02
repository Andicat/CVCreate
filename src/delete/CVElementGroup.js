import React from 'react';
import PropTypes from 'prop-types';

import CVElement from '../components/CVElement';

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


getElementCoords = (elem) => {
    var bbox = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset||docEl.scrollTop||body.scrollTop;
    var scrollLeft = window.pageXOffset||docEl.scrollLeft||body.scrollLeft;

    var clientTop = docEl.clientTop||body.clientTop||0;
    var clientLeft = docEl.clientLeft||body.clientLeft||0;

    var top = bbox.top + scrollTop - clientTop;
    var left = bbox.left + scrollLeft - clientLeft;

    return {
        width: elem.offsetWidth,
        height: elem.offsetHeight,
        left: left,
        top: top,
        bottom: top + elem.offsetHeight,
        right: left + elem.offsetWidth,
        scrollTop: scrollTop,
        scrollLeft: scrollLeft,
    };
}

getPosition = () => {
    //let deskCoords1 = this.getElementCoords(document.querySelector('.desk'));
    let deskCoords = this.getElementCoords(document.querySelector('.cv-container'));
    let cvCoords = this.getElementCoords(document.querySelector('.cv'));
    //console.log('desk - ',deskCoords1);
    console.log('cv - ',document.querySelector('.cv').offsetLeft);
    //console.log('cv - ',cvCoords.top);
    this.coordsShift = {top:cvCoords.top-deskCoords.top + Number(this.props.block.positionTop), left:cvCoords.left-deskCoords.left + Number(this.props.block.positionLeft)};
}
