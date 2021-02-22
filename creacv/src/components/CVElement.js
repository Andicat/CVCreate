import React from 'react';
import PropTypes from 'prop-types';
import image from './../img/image.svg';

import {connect} from 'react-redux';
import {cvElement_activate, cvElement_textUpdate} from '../redux/cvDataAC';
import {createStyle} from './utils';

class CVElement extends React.PureComponent {

    static propTypes = {
        cv: PropTypes.bool,
        id: PropTypes.string.isRequired,
        blockId: PropTypes.number.isRequired,
        data: PropTypes.object,
        activeElementId: PropTypes.string,
    };

    static defaultProps = {
        cv: false,
        style: {},
    };

    onClick = () => {
        if (this.props.cv) {
            this.props.dispatch(cvElement_activate(this.props.data.style,this.props.id));
        }
    }

    onBlur = (evt) => {
        let textCurr = evt.target.innerText;
        if (this.props.data.text!==textCurr) {
            this.props.dispatch(cvElement_textUpdate(this.props.blockId,this.props.id,textCurr));
        }
    }

    render () {
        if (this.props.cv) {
            //console.log('render element', this.props.activeElementId);
        };
        let isActive = (this.props.activeElementId===this.props.id);
        let style = createStyle(this.props.data.style);
        let type = this.props.data.type;
        let className = ' cv__element cv__element--' + type + (isActive?' cv__element--active':'') + (this.props.data.direction?(' cv__element--' + type + '-' + this.props.data.direction):'');
        let elementCode = null;
        switch (type) {
            case 'image':
                let src = (this.props.data.style['file']) || image;
                elementCode = <img className={className} src={src} style={style} alt='' onClick={this.onClick}/>;
                break;
            case 'text':
                elementCode = <span className={className} style={style} suppressContentEditableWarning={true} contentEditable={this.props.cv} onClick={this.onClick} onBlur={this.onBlur}>
                                {this.props.data.text}
                              </span>;
                break;
            case 'figure':
                elementCode = <div className={className} style={style} onClick={this.onClick}></div>;;
                break;
            case 'dots-row':
                style = {...style, width:this.props.data.style.radius + 'px', height:this.props.data.style.radius + 'px', margin:this.props.data.style.radius*0.5 + 'px', borderRadius: '50%'};
                elementCode = <div className={className} onClick={this.onClick}>
                                {Array.from({length: this.props.data.style.count}, (v,i) => <div key={i} style={style}></div>)}
                              </div>;
                break;
            case 'group':
                let CVElementChild = connect()(CVElement);
                elementCode = <div className={className} style={style}>
                                {this.props.data.elements.map( (e,i) => (
                                    <CVElementChild key={'' + (e.id?e.id:i)} id={'' + (e.id?e.id:i)} blockId={this.props.blockId} cv={this.props.cv} data={e} activeElementId={this.props.activeElementId}></CVElementChild>
                                ))}
                              </div>;
                break;
            default:
                elementCode = null;
        }
        
        return elementCode;        
    }
}

export default connect()(CVElement);
