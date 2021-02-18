import React from 'react';
import PropTypes from 'prop-types';
import image from './../img/image.svg';

import {connect} from 'react-redux';
import {cvElement_activate, cvElement_textUpdate} from '../redux/cvDataAC';
import {createStyle} from './utils';

class Element extends React.PureComponent {

    static propTypes = {
        cv: PropTypes.bool,
        id: PropTypes.string.isRequired,
        blockId: PropTypes.number.isRequired,
        data: PropTypes.object,
        active: PropTypes.bool,
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
        let style = createStyle(this.props.data.style);
        let type = this.props.data.type;
        let className = ' cv__element  cv__element--' + type + (this.props.active?' cv__element--active':'');
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
                style = {...style, width:this.props.data.style.size + 'px', height:this.props.data.style.size + 'px', margin:this.props.data.style.size*0.5 + 'px', borderRadius: '50%'};
                elementCode = <div className={className} onClick={this.onClick}>
                                {Array.from({length: this.props.data.style.count}, (v,i) => <div key={i} style={style}></div>)}
                              </div>;;
                break;
            default:
                elementCode = null;
        }
        
        return elementCode;        
    }
}

export default connect()(Element);
