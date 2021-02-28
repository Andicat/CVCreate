import React from 'react';
import PropTypes from 'prop-types';
import image from './../img/image.svg';

import {connect} from 'react-redux';
import {cvElement_activate, cvElement_textUpdate} from '../redux/cvDataAC';
import {createStyle} from './utils';

class CvElement extends React.PureComponent {

    static propTypes = {
        editable: PropTypes.bool,
        id: PropTypes.string.isRequired,
        blockId: PropTypes.number.isRequired,
        data: PropTypes.object,
        activeElementId: PropTypes.string,
    };

    static defaultProps = {
        style: {},
    };

    onClick = () => {
        if (this.props.editable) {
            this.props.dispatch(cvElement_activate(this.props.data.style,this.props.id));
        }
    }

    onBlur = (evt) => {
        let textCurr = evt.target.innerText;
        if (this.props.data.text!==textCurr) {
            this.props.dispatch(cvElement_textUpdate(this.props.blockId,textCurr));
        }
    }

    render () {
        //console.log('render element', this.props.editable);
        if (this.props.editable) {
            //console.log('render element', this.props.id);
            //console.log('active element', this.props.activeElementId);
        };
        let isActive = (this.props.activeElementId===this.props.id);
        let style = createStyle(this.props.data.style);
        let positionTop;
        let positionLeft;
        let position;
        if (this.props.data.link) {
            positionTop = style.top?style.top:(this.props.data.positionTop + 'px');
            positionLeft = style.left?style.left:(this.props.data.positionLeft + 'px');
            position = style.position;
            delete style.top;
            delete style.left;
            delete style.position;
        }
        let type = this.props.data.type;
        let className = 'cv__element cv__element--' + type + (isActive?' cv__element--active':'') + (this.props.data.direction?(' cv__element--' + type + '-' + this.props.data.direction):'');
        let elementCode = null;
        switch (type) {
            case 'image':
                let src = (this.props.data.style['file']) || image;
                elementCode = <img className={className} src={src} style={style} alt='' onClick={this.onClick}/>;
                break;
            case 'text':
                elementCode = <span className={className} style={style} suppressContentEditableWarning={this.props.editable} contentEditable={this.props.editable} onClick={this.onClick} onBlur={this.onBlur}>
                                {this.props.data.text}
                              </span>;
                break;
            case 'figure':
                elementCode = <div className={className} style={style} onClick={this.onClick}></div>;;
                break;
            case 'progress':
                let styleProgressBar = {backgroundColor: this.props.data.style.maincolor, width:this.props.data.style.progress+'%'};
                let progressBarCode = <div style={styleProgressBar}></div>;
                let styleProgressBg = {backgroundColor: this.props.data.style.addcolor, width:(100-this.props.data.style.progress)+'%'};
                let progressBgCode = <div style={styleProgressBg}></div>;
                elementCode = <div className={className} style={style} onClick={this.onClick}>
                                {progressBarCode}
                                {progressBgCode}
                              </div>;
                break;
            case 'dots-row':
                let styleMainDots = {backgroundColor: this.props.data.style.maincolor, width:this.props.data.style.radius + 'px', height:this.props.data.style.radius + 'px', margin:'0 ' + this.props.data.style.radius*0.5 + 'px', borderRadius: '50%'};
                let mainDotsCode = Array.from({length: this.props.data.style.maincount}, (v,i) => <div key={i} style={styleMainDots}></div>);
                let styleAddDots = {...styleMainDots, backgroundColor: this.props.data.style.addcolor};
                let addDotsCode = Array.from({length: this.props.data.style.addcount}, (v,i) => <div key={i} style={styleAddDots}></div>);
                elementCode = <div className={className} style={style} onClick={this.onClick}>
                                {mainDotsCode}
                                {addDotsCode}
                              </div>;
                break;
            case 'group':
                let CvElementChild = connect()(CvElement);
                elementCode = <div className={className} style={style}>
                                {this.props.data.elements.map( (e,i) => (
                                    <CvElementChild key={'' + (e.id?e.id:i)} id={'' + (e.id?e.id:i)} blockId={this.props.blockId} editable={this.props.editable} data={e} activeElementId={this.props.activeElementId}></CvElementChild>
                                ))}
                              </div>;
                break;
            case 'link':
                elementCode = <a className={className} style={style} href={this.props.data.href} suppressContentEditableWarning={this.props.editable} contentEditable={this.props.editable} onClick={this.onClick} onBlur={this.onBlur}>
                                {this.props.data.text}
                                </a>;
                break;
            default:
                elementCode = null;
        }

        if (this.props.data.link) {
            let styleLink = {position:position, top:positionTop, left:positionLeft, width:this.props.data.width + 'px', height:this.props.data.height + 'px'};
            return (
                <a className='cv__element--link' href={this.props.data.link} style={styleLink}>
                    {elementCode} 
                </a>
            );
        }
        
        return elementCode;        
    }
}

export default connect()(CvElement);
