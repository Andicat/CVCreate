import React from 'react';

import icon from './../img/icon-add.svg';

const FONT_SIZE_MIN = 6;
const FONT_SIZE_MAX = 60;
const PADDING_MIN = 0;
const PADDING_MAX = 100;

const CV_ID = 1.1;

const OPTIONS_TEXT = {
    font: 'font',
    fontsize: 'font Size',
    bold: 'font Bold',
    italic: 'font Italic',
    underline: 'font Underline',
    uppercase: 'font Uppercase',
    center: 'align text to Center',
    color: 'color of text',
    bgcolor: 'background color',
    file: 'load image',
    maincount: 'count of first dots',
    addcount: 'count of second dots',
    radius: 'radius of dots',
    borderwidth: 'width of border',
    bordercolor: 'color of border',
    padding: 'padding',
    opacity: 'opacity',
    copy: 'copy block',
    back: 'send block on back',
    autosize: 'set block size on Auto',
    lock: 'lock block position',
    ungroup: 'ungroup blocks',
    align_top: 'align blocks on top',
    align_bottom: 'align blocks on bottom',
    align_left: 'align blocks on left',
    align_right: 'align blocks on right',
    align_vertical: 'align blocks on vertical',
    align_horisontal: 'align blocks on horisontal',
    distribute_vertical: 'distribute blocks on vertical',
    distribute_horisontal: 'distribute blocks on horisontal',
    align_width: 'set same width for blocks',
    align_height: 'set same height for blocks',
    group: 'group blocks',
    progress: 'progress',
    height: 'height',
    width: 'width',
    link: 'set link for block',
}

const FONTS = ['PTSans','Roboto','Helvetica','Garamond'];

/*function debounce(cb) {
    var DEBOUNCE_INTERVAL = 1000;
    var lastTimeout = null;
    return function () {
        var parameters = arguments;
        if (lastTimeout) {
            window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
            cb.apply(this, parameters);
        }, DEBOUNCE_INTERVAL);
    };
}*/

//create jsx-code for option
function createOption (optionType,optionValue,cbOnChange) {

    if (optionType==='copy' || optionType==='back' || optionType==='autosize' || optionType==='ungroup' || optionType==='group' 
                            || optionType.indexOf('align')>=0 || optionType.indexOf('distribute')>=0) {
        return codeButton(optionType,cbOnChange);
    } else if (optionType==='bold' || optionType==='italic' || optionType==='uppercase' || optionType==='underline' || optionType==='center' || optionType==='lock') {
        return codeCheckbox(optionType,optionValue);
    } else if (optionType.indexOf('color')>=0) {
        return codeColor(optionValue);
    } else if (optionType==='font') {
        return codeList(optionValue,FONTS);
    } else if (optionType==='fontsize') {
        return codeNumber(optionValue,FONT_SIZE_MIN,FONT_SIZE_MAX);
    } else if (optionType==='progress') {
        return codeRange(optionType,optionValue,0,100,1);
    } else if (optionType==='file') {
        return codeFile();
    } else if (optionType==='padding') {
        return codeGroup(optionType,optionValue,PADDING_MIN,PADDING_MAX);
    } else if (optionType==='opacity') {
        return codeRange(optionType,optionValue,0,1,0.01);
    } else if (optionType==='link') {
        return codeLink(optionType,optionValue);
    } else if (optionType==='maincount' || optionType==='addcount' || optionType==='radius' || optionType==='borderwidth') {
        return codeNumber(optionValue,0,100);
    }

    function setValue(elem,value) {
        if (!elem) return;
        let min = elem.min?Number(elem.min):0;
        let max = elem.max?Number(elem.max):Infinity;
        if (value>=min && value<=max) {
            cbOnChange(value);
            return;
        }
    };

    function setValueInput(evt) {
        cbOnChange(evt.target.value);
    };

    function setValueCheckBox(evt) {
        cbOnChange(evt.target.checked);
    };

    function setImage(evt) {
        const reader = new FileReader();
        const file = evt.target.files[0];

        reader.onloadend = () => {
            cbOnChange(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    function setLink(elem) {
        cbOnChange(elem.value);
        openDrop(elem.parentNode,false);
    };
    
    function setGroupValue(elem,value,groupValue,name) {
        if (!elem) return;
        let min = elem.min?Number(elem.min):0;
        let max = elem.max?Number(elem.max):Infinity;
        if (value>=min && value<=max) {
            let newGroupValue = {...groupValue};
            newGroupValue[name] = value;
            cbOnChange(newGroupValue);
            return;
        }
    };

    function openDrop(elem, mode) {
        if (mode && !elem.classList.contains('option__drop-down--show')) {
            elem.classList.add('option__drop-down--show');
        }
        if (!mode) {
            elem.classList.remove('option__drop-down--show');
        }
        
    };

    function onMouseLeave(evt,elem) {
        if (evt.relatedTarget!==elem) {
            openDrop(elem,false);
        }
    }

    function codeNumber(optionValue,min,max) {
        return <React.Fragment>
                    <input type='button' className='option__button option__button--left' data-tooltip={true} value='&ndash;' onClick= {(evt) => {setValue(evt.target.nextSibling,Number(optionValue)-1)}}/>
                    <input type='text' className='option__number' data-tooltip={true} min={min} max={max} value={optionValue} readOnly></input>
                    <input type='button' className='option__button option__button--right' data-tooltip={true} value='+' onClick= {(evt) => {setValue(evt.target.previousSibling,Number(optionValue)+1)}}/>
                </React.Fragment>
    };

    function codeRange(optionType,optionValue,min,max,step) {
        return <React.Fragment>
                    <input type='button' className={'option__button option__down option__button--' + optionType} data-tooltip={true} onClick= {(evt) => {openDrop(evt.target.nextSibling,true)}} onMouseLeave={(evt) => onMouseLeave(evt,evt.currentTarget.nextSibling)}/>
                    <div className='option__drop-down' onMouseLeave={(evt) => openDrop(evt.currentTarget,false)}>
                        <input type="range" className='option__range'min={min} max={max} step={step} value={optionValue} onInput={setValueInput}/>
                    </div>
                </React.Fragment>
    };

    function codeCheckbox(optionType,optionValue) {
        return <React.Fragment>
                    <input type='checkbox' className={'option__checkbox option__checkbox--' + optionType} id={optionType} checked={optionValue} onChange={setValueCheckBox}/>
                    <label className='option__label' htmlFor={optionType} data-tooltip={true}/>
                </React.Fragment>
    };

    function codeColor(optionValue) {
        return <input type='color' className='option__color' data-tooltip={true} value={optionValue} onChange={setValueInput}></input>
    }

    function codeFile() {
        return <React.Fragment>
                    <input type='file' name='file' id='file' className='option__file' accept='image/*' onChange={setImage}></input>
                    <label className='option__label option__label--file' htmlFor='file' data-tooltip={true}>Load Image</label>
                </React.Fragment>
    };

    function codeLink(optionType,optionValue) {
        return <React.Fragment>
                    <input type='button' className={'option__button option__down option__button--' + optionType} data-tooltip={true} onClick={(evt) => {openDrop(evt.target.nextSibling,true)}} onMouseLeave={(evt) => onMouseLeave(evt,evt.currentTarget.nextSibling)}/>
                    <div className='option__drop-down' onMouseLeave={(evt) => openDrop(evt.currentTarget,false)}>
                        <div className='option__drop-down-line'>
                            <span>Link:</span>
                            <input type="text" className='option__text option__link' defaultValue={optionValue}/>
                            <button className='option__button option__button--ok' onClick={(evt) => {setLink(evt.target.previousSibling)}}/>
                        </div>
                    </div>
                </React.Fragment>   
    };

    function codeButton(optionType,cbOnChange) {
        
        return <input type='button' className={'option__button option__button--' + optionType} data-tooltip={true} onClick={cbOnChange}/>;
    };

    function codeList(optionValue,list) {
        return (<select className='option__select' data-tooltip={true} value={optionValue} onChange={setValueInput}>
                    {list.map( (f,i) => {
                        let style = {fontFamily:f};
                        return <option key={i} style={style}>{f}</option>;
                        })
                    }
                </select>);
    };

    function codeGroup(optionType,optionValue,min,max) {
        
        return <React.Fragment>
                    <input type='button' className={'option__button option__down option__button--' + optionType} data-tooltip={true} onClick={(evt) => {openDrop(evt.target.nextSibling,true)}} onMouseLeave={(evt) => onMouseLeave(evt,evt.currentTarget.nextSibling)}/>
                    <form name={optionType} className='option__drop-down' onMouseLeave={(evt) => openDrop(evt.currentTarget,false)}>
                        {Object.keys(optionValue).map((o,i) => {
                            return <div key={i} className='option__drop-down-line'>
                                        <span>{o}</span>
                                        <input type='button' className='option__button option__button--left' value='&ndash;' onClick= {(evt) => {setGroupValue(evt.target.nextSibling,Number(optionValue[o])-1,optionValue,o)}}/>
                                        <input type='text' className='option__number' min={min} max={max} value={optionValue[o]} readOnly></input>
                                        <input type='button' className='option__button option__button--right' value='+' onClick= {(evt) => {setGroupValue(evt.target.previousSibling,Number(optionValue[o])+1,optionValue,o)}}/>
                                    </div>
                        })}
                    </form>
                </React.Fragment>   
    };
};

// create style for DOM-element
function createStyle (styles) {
    let styleAttr = {};

    for (let key in styles) {
        switch (key) {
            case 'font': 
                styleAttr.fontFamily = styles[key];
                break;
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
            case 'underline':
                styleAttr.textDecoration = styles[key]?'underline':'none';
                break;
            case 'center':
                styleAttr.textAlign = styles[key]?'center':'start';
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
                styleAttr.padding = styles[key].top + 'px ' + styles[key].right + 'px ' + styles[key].bottom + 'px ' + styles[key].left + 'px';
                break;
            default:
                styleAttr[key] = styles[key];
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

function saveFileJSON (data, filename, type) {
    data = JSON.stringify(data);
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
};

function readFileJSON (file,cbOnLoad) {
    const reader = new FileReader();

    reader.onload = function() {
        cbOnLoad(JSON.parse(reader.result));
    };
    
    reader.onerror = function() {
        alert(reader.error);
    };

    if (file) {
        reader.readAsText(file);
    }
};

//localStorge
function saveLocalStorage(LsName,data) {
    localStorage.setItem(LsName,JSON.stringify(data));
}
   


export {createOption, createStyle, getAutoSize, saveFileJSON, readFileJSON, saveLocalStorage, CV_ID, OPTIONS_TEXT};
