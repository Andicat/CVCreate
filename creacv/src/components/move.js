import React from 'react';
import Image from "./Image";
import Text from "./Text";
import Figure from "./Figure";

let mouseStart;
let mouseShift;
let elem;

function move (evt) { 
    evt.preventDefault();
    //console.log('mouse down', evt.target.parentNode);
    mouseStart = {
        x: evt.clientX,
        y: evt.clientY
    };
    elem = evt.currentTarget;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

function onMouseMove (moveEvt) {
    moveEvt.preventDefault();
    //console.log('mouse move',moveEvt.target);
    mouseShift = {
        x: moveEvt.clientX - mouseStart.x,
        y: moveEvt.clientY - mouseStart.y 
    };
    mouseStart = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
    };
    elem.style.top = (elem.offsetTop + mouseShift.y) + "px";
    elem.style.left = (elem.offsetLeft + mouseShift.x) + "px";
}

function onMouseUp (upEvt) {
    upEvt.preventDefault();
    //console.log('mouse up', upEvt.currentTarget);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}

function createJSX (id, elem, cv, activeId, key = 0) {
    //console.log('elem',elem);
    let elemCode;
    let elemId = '' + id + key;
    //console.log('elemId',elemId);
    //console.log('style to render',elem.style);
    switch (elem.type) {
        case 'image': 
            elemCode = <Image key={elemId} id={elemId} cv={cv} style={elem.style} src={elem.src} active={activeId===elemId}/>;
            break;
        case 'text':
            //console.log('create text',elem)
            elemCode = <Text key={elemId} id={elemId} cv={cv} style={elem.style} text={elem.text} active={activeId===elemId}/>;
            break;
        case 'figure': 
            elemCode = <Figure key={elemId} id={elemId} cv={cv} style={elem.style}/>;
            break;
        case 'group': 
            elemCode = <div key={elemId} className={'cv__group' + (elem.direction?(' cv__group--' + elem.direction):'')}>{elem.elements.map( (e,i) => createJSX(id,{...e, id:elem.id},cv,activeId,i))}</div>;
            break;
        default:
            elemCode = null;
    }
    return elemCode;
};

function optionRenderFunc (type,text,style,className,cbOnClick) {
    
    let elemCode;
    //let elemId = '' + elem.id + key;
    switch (type) {
        case 'image': 
            elemCode = <img className={className} src={text} style={style} alt='' onClick={cbOnClick}/>;
            break;
        case 'text':
            elemCode = <span className={className} style={style} onClick={cbOnClick}>{text}</span>;
            break;
        case 'figure': 
            elemCode = <div className={className} style={style} onClick={cbOnClick}/>;
            break;
        case 'group': 
            //elemCode = <div key={elemId} className={'cv__group' + (elem.direction?(' cv__group--' + elem.direction):'')}>{elem.elements.map( (e,i) => createJSX({...e, id:elem.id},active,i))}</div>;
            break;
        default:
            elemCode = null;
    }
    return elemCode;
};

function createOption (optionType,optionValue,cbOnChange) {

    function setValue(elem,value) {
        if (elem) {
            elem.value = value;
        }
        cbOnChange(value);
    }

    function setValueInput(evt) {
        cbOnChange(evt.target.value);
    }

    function setValueCheckBox(evt) {
        cbOnChange(evt.target.checked);
    }

    function codeNumber() {
        return <React.Fragment>
                    <input type='button' className='option option--button' value='-' onClick= {(evt) => {setValue(evt.target.nextSibling,Number(optionValue)-1)}}/>
                    <input type='text' className='option option--number' value={optionValue} onChange={setValueInput}></input>
                    <input type='button' className='option option--button' value='+' onClick= {(evt) => {setValue(evt.target.previousSibling,Number(optionValue)+1)}}/>
                </React.Fragment>
    };

    function codeCheckbox() {
        return <input type='checkbox' className='option option--checkbox' checked={optionValue} onChange={setValueCheckBox}></input>
    };

    function codeColor() {
        return <input type='color' className='option option--color' value={optionValue} onChange={setValueInput}></input>
    }

    let elemCode;
    switch (optionType) {
        case 'fontsize': 
            elemCode = codeNumber();
            break;
        case 'bold':
            elemCode = codeCheckbox();
            break;
        case 'width':
            elemCode = codeNumber();
            break;
        case 'height':
            elemCode = codeNumber();
            break;
        case 'color':
            elemCode = codeColor();
            break;
        case 'bgcolor':
            elemCode = codeColor();
            break;
        case 'file':
            elemCode = <input type='file' className='option option--file' value={optionValue} onChange={cbOnChange}></input>;
            break;
        default:
            elemCode = null;
    }
    return elemCode;
};

function createStyle (styles,cd) {
    let styleAttr = {};

    for (let key in styles) {
        switch (key) {
            case 'fontsize': 
                styleAttr.fontSize = styles[key] + 'px';
                break;
            case 'bold':
                styleAttr.fontWeight = styles[key]?'bold':'normal';
                break;
            case 'width': 
                styleAttr.width = styles[key] + 'px';
                break;
            case 'height': 
                styleAttr.height = styles[key] + 'px';
                break;
            case 'bgcolor': 
                styleAttr.backgroundColor = styles[key];
                break;
            case 'file': 
            //debugger
                styleAttr.src = styles[key];
                break;
            default:
                styleAttr[key] = styles[key];;
        }
    }

    //let elemId = '' + elem.id + key;
    
    return styleAttr;
};

export { move, createJSX, optionRenderFunc, createOption, createStyle};
