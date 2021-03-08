import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {cvElement_activate, cvElement_textUpdate} from '../redux/cvDataAC';
import {createStyle, decodeStyle} from '../modules/utils';
import sprite from '../img/sprite.svg';

class CvElement extends React.PureComponent {

    static propTypes = {
        editable: PropTypes.bool,
        id: PropTypes.string.isRequired,
        blockId: PropTypes.number.isRequired,
        data: PropTypes.object,
        activeElementId: PropTypes.string,
        templateImageUrl: PropTypes.string,
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
        //console.log('render cv element',this.props.id);
        let isActive = (this.props.activeElementId===this.props.id);
        let style = createStyle(this.props.data.style);
        let positionTop;
        let positionLeft;
        let position;
        let styleText;
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
        let decodedStyle;
        switch (type) {
            case 'image':
                decodedStyle = {};
                for (let s in this.props.data.style) {
                    decodedStyle[decodeStyle(s)] = this.props.data.style[s];
                }
                let src = (decodedStyle['file']) || this.props.templateImageUrl;
                elementCode = <img className={className} src={src} style={style} alt='' data-elem={true} onClick={this.onClick}/>;
                break;
            case 'text':
                let text = this.props.data.text;
                styleText = {color: style.color, fontFamily: style.fontFamily,
                    fontSize: style.fontSize, fontStyle:style.fontStyle,
                    fontWeight: style.fontWeight, padding: style.padding,
                    textAlign: style.textAlign, textDecoration:style.textDecoration,
                    textTransform: style.textTransform};
                if (this.props.data.list) {
                    elementCode = <ul style={{fontSize:style.fontSize, paddingLeft:style.fontSize}}>
                                    <li className={className} style={{color:style.colorlist}}>
                                        <span style={styleText} suppressContentEditableWarning={this.props.editable} contentEditable={this.props.editable} data-elem={true} onClick={this.onClick} onBlur={this.onBlur}>
                                            {text}
                                        </span>
                                    </li>
                                </ul>;
                } else {
                    elementCode = <span className={className} style={style} suppressContentEditableWarning={this.props.editable} contentEditable={this.props.editable} data-elem={true} onClick={this.onClick} onBlur={this.onBlur}>
                                    {text}
                                </span>;
                }
                break;
            case 'figure':
                elementCode = <div className={className} style={style} data-elem={true} onClick={this.onClick}></div>;;
                break;
            case 'progress':
                decodedStyle = {};
                for (let s in this.props.data.style) {
                    decodedStyle[decodeStyle(s)] = this.props.data.style[s];
                }
                let styleProgressBar = {backgroundColor: decodedStyle.maincolor, width:decodedStyle.progress+'%'};
                let progressBarCode = <div style={styleProgressBar}></div>;
                let styleProgressBg = {backgroundColor: decodedStyle.addcolor, width:(100-decodedStyle.progress)+'%'};
                let progressBgCode = <div style={styleProgressBg}></div>;
                elementCode = <div className={className} style={style} data-elem={true} onClick={this.onClick}>
                                {progressBarCode}
                                {progressBgCode}
                              </div>;
                break;
            case 'dots-row':
                decodedStyle = {};
                for (let s in this.props.data.style) {
                    decodedStyle[decodeStyle(s)] = this.props.data.style[s];
                }
                let styleMainDots = {backgroundColor: decodedStyle.maincolor, width:decodedStyle.radius + 'px', height:decodedStyle.radius + 'px', margin:'0 ' + decodedStyle.radius*0.5 + 'px', borderRadius: '50%'};
                let mainDotsCode = Array.from({length: decodedStyle.maincount}, (v,i) => <div key={i} style={styleMainDots}></div>);
                let styleAddDots = {...styleMainDots, backgroundColor: decodedStyle.addcolor};
                let addDotsCode = Array.from({length: decodedStyle.addcount}, (v,i) => <div key={i} style={styleAddDots}></div>);
                elementCode = <div className={className} style={style} data-elem={true} onClick={this.onClick}>
                                {mainDotsCode}
                                {addDotsCode}
                              </div>;
                break;
            case 'icon':
                    decodedStyle = {};
                    for (let s in this.props.data.style) {
                        decodedStyle[decodeStyle(s)] = this.props.data.style[s];
                    }
                    let styleElem = {position: style.position, width:style.width, height:style.height, top:style.top, left:style.left};
                    let styleIcon = {fill: decodedStyle.fill, width:decodedStyle.size +'px', height:decodedStyle.size +'px'};
                    styleText = {color: style.color, fontFamily: style.fontFamily,
                                    fontSize: style.fontSize, fontStyle:style.fontStyle,
                                    fontWeight: style.fontWeight, padding: style.padding,
                                    textAlign: style.textAlign, textDecoration:style.textDecoration,
                                    textTransform: style.textTransform};
                    let textIcon = this.props.data.text;
                    if (textIcon instanceof Array) {
                        textIcon = textIcon.map( (w,i) => <span key={i}>{w}{i<textIcon.length-1&&<br/>}</span>);
                    }
                    elementCode = <div className={className} style={styleElem} data-elem={true} onClick={this.onClick}>
                                    <svg style={styleIcon}>
                                        <use href={sprite + '#' + this.props.data.svg}></use>
                                    </svg>
                                    <span style={styleText} suppressContentEditableWarning={this.props.editable} contentEditable={this.props.editable} data-elem={true} onClick={this.onClick} onBlur={this.onBlur}>
                                        {textIcon}
                                    </span>
                                  </div>;
                    break;
            case 'group':
                let CvGroupElement = connect(mapStateToProps)(CvElement);
                elementCode = <div className={className} style={style}>
                                {this.props.data.elements.map( (e,i) => (
                                    <CvGroupElement key={'' + (e.id?e.id:i)} id={'' + (e.id?e.id:i)} blockId={this.props.blockId} editable={this.props.editable} data={e} activeElementId={this.props.activeElementId}></CvGroupElement>
                                ))}
                              </div>;
                break;
            case 'link':
                elementCode = <a className={className} style={style} href={this.props.data.href} suppressContentEditableWarning={this.props.editable} contentEditable={this.props.editable} data-elem={true} onClick={this.onClick} onBlur={this.onBlur}>
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

const mapStateToProps = function (state) {
    return {
        templateImageUrl: state.cvData.templateImageUrl,
    };
};

export default connect(mapStateToProps)(CvElement);
