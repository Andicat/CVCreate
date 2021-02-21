import React from 'react';

const FONT_SIZE_MIN = 6;
const FONT_SIZE_MAX = 60;
const WIDTH_MIN = 0;
const WIDTH_MAX = 1000;
const HEIGHT_MIN = 0;
const HEIGHT_MAX = 1000;

const CV_ID = 1.1;

//create jsx-code for option
function createOption (optionType,optionValue,cbOnChange) {

    const OPTIONS = {
        fontsize: codeNumber(FONT_SIZE_MIN,FONT_SIZE_MAX,1),
        bold: codeCheckbox(),
        italic: codeCheckbox(),
        uppercase: codeCheckbox(),
        center: codeCheckbox(),
        width: codeNumber(WIDTH_MIN,WIDTH_MAX,1),
        height: codeNumber(HEIGHT_MIN, HEIGHT_MAX,1),
        color: codeColor(),
        bgcolor: codeColor(),
        file: codeFile(),
        count: codeNumber(),
        size: codeNumber(),
        borderwidth: codeNumber(),
        bordercolor: codeColor(),
        padding: codeNumber(),
        opacity: codeRange(0,1,0.01),
    }

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

    function setImage(evt) {
        const reader = new FileReader();
        const file = evt.target.files[0];

        reader.onloadend = () => {
            cbOnChange(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    function codeNumber(min,max,step) {
        return <React.Fragment>
                    <input type='button' className='option option__button option__button--left' value='&ndash;' onClick= {(evt) => {setValue(evt.target.nextSibling,Number(optionValue)-1)}}/>
                    <input type='text' className='option option__number' min={min} max={max} step={step} value={optionValue} onChange={setValueInput}></input>
                    <input type='button' className='option option__button option__button--right' value='+' onClick= {(evt) => {setValue(evt.target.previousSibling,Number(optionValue)+1)}}/>
                </React.Fragment>
    };

    function codeRange(min,max,step) {
        return <input type="range" className='option option__range'min={min} max={max} step={step} value={optionValue} onInput={setValueInput}/>;
    };

    function codeCheckbox() {
        return <React.Fragment>
                    <input type='checkbox' className={'option option__checkbox option__checkbox--' + optionType} id={optionType} checked={optionValue} onChange={setValueCheckBox}/>
                    <label htmlFor={optionType}/>
                </React.Fragment>
    };

    function codeColor() {
        return <input type='color' className='option option__color' value={optionValue} onChange={setValueInput}></input>
    }

    function codeFile() {
        return <React.Fragment>
                    <input type='file' name='file' id='file' className='option option__file' accept='image/*' onChange={setImage}></input>
                    <label htmlFor='file'>Load Image</label>
                </React.Fragment>
    };

    return OPTIONS[optionType];
};

// create style for DOM-element
function createStyle (styles) {
    let styleAttr = {};

    for (let key in styles) {
        switch (key) {
            case 'fontsize': 
                styleAttr.fontSize = styles[key] + 'px';
                break;
            case 'bold':
                styleAttr.fontWeight = styles[key]?'bold':'normal';
                break;
            case 'italic':
                styleAttr.fontStyle = styles[key]?'italic':'normal';
                break;
            case 'uppercase':
                styleAttr.textTransform = styles[key]?'uppercase':'none';
                break;
            case 'center':
                styleAttr.textAlign = styles[key]?'center':'start';
                break;
            case 'width': 
                styleAttr.width = styles[key] + 'px';
                break;
            case 'height': 
                styleAttr.height = styles[key] + 'px';
                break;
            case 'top': 
                styleAttr.top = styles[key] + 'px';
                break;
            case 'left': 
                styleAttr.left = styles[key] + 'px';
                break;
            case 'bgcolor': 
                styleAttr.backgroundColor = styles[key];
                break;
            case 'bordercolor': 
                styleAttr.borderColor = styles[key];
                break;
            case 'borderwidth': 
                styleAttr.borderWidth = styles[key] + 'px';
                break;
            case 'padding': 
                styleAttr.padding = styles[key] + 'px';
                break;
            /*case '': 
                //styleAttr.backgroundColor = styles[key];
                break;*/
            default:
                styleAttr[key] = styles[key];;
        }
    }
    return styleAttr;
};

// get auto size for DOM-element
function getAutoSize (element) {
    let sizes = {};
    element.style.position = 'absolute';
    element.style.visibility = 'hidden';
    element.style.height = 'auto';
    element.style.width = 'auto';
    element.style.boxSizing = 'border-box';
    sizes.height = element.offsetHeight + 1;
    sizes.width = element.offsetWidth + 1;
    element.style.position = '';
    element.style.visibility = '';
    element.style.width = '';
    element.style.height = '';
    element.style.boxSizing = '';

    return sizes;
};

export {createOption, createStyle, getAutoSize, CV_ID};
