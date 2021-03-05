import React from 'react';


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
    alignTop: 'align blocks on top',
    alignBottom: 'align blocks on bottom',
    alignLeft: 'align blocks on left',
    alignRight: 'align blocks on right',
    alignVertical: 'align blocks on vertical',
    alignHorisontal: 'align blocks on horisontal',
    distributeVertical: 'distribute blocks on vertical',
    distributeHorisontal: 'distribute blocks on horisontal',
    alignWidth: 'set same width for blocks',
    alignHeight: 'set same height for blocks',
    group: 'group blocks',
    progress: 'progress',
    height: 'height',
    width: 'width',
    link: 'set link for block',
    save: 'save this block to panel',
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
    optionType = decodeStyle(optionType);

    if (optionType==='copy' || optionType==='back' || optionType==='autosize' || optionType==='ungroup' || optionType==='group' 
                            || optionType==='save'|| optionType.indexOf('align')>=0 || optionType.indexOf('distribute')>=0) {
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
    } else {
        return null;
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
        openDrop(elem.parentNode.parentNode,false);
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
        //debugger
        if (mode && !elem.classList.contains('option__drop-down--show')) {
            elem.classList.add('option__drop-down--show');
            //console.log('open');
        }
        if (!mode) {
            elem.classList.remove('option__drop-down--show');
            //console.log('close');
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
                    <input type='button' className={'option__button option__down option__button--' + optionType} data-tooltip={true} onClick= {(evt) => {openDrop(evt.target.nextSibling,true)}}/>
                    <div className='option__drop-down' onMouseLeave={(evt) => openDrop(evt.currentTarget,false)}>
                        <div className='option__drop-down-line'>
                            <input type="range" className='option__range'min={min} max={max} step={step} value={optionValue} onInput={setValueInput}/>
                        </div>
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
                    <input type='button' className={'option__button option__down option__button--' + optionType} data-tooltip={true} onClick={(evt) => {openDrop(evt.target.nextSibling,true)}}/>
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

function decodeStyle(styleName) {
    //debugger
    return styleName.replace(/.+_/,'');
}

// create style for DOM-element
function createStyle (styles) {
    let styleAttr = {};
    //debugger
    for (let key in styles) {
        let keyDecode = decodeStyle(key);
        switch (keyDecode) {
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
                styleAttr[keyDecode] = styles[key];
        }
    }
    return styleAttr;
};

// get auto size for DOM-element
function getAutoSize (element) {
    let sizes = {};
    let clone = element.cloneNode(true);
    document.body.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.visibility = 'hidden';
    clone.style.height = 'auto';
    clone.style.width = 'auto';
    clone.style.boxSizing = 'border-box';
    sizes.height = clone.scrollHeight;
    sizes.width = clone.scrollWidth;
    document.body.removeChild(clone);
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

async function readFileJSON(file) {
    const reader = new FileReader();
    let dataRes = {};
    reader.readAsText(file);
    const readFile = new Promise((resolve, reject) => {
        reader.onload = function(event) {
        resolve(reader.result)
        }
    });
    await readFile.then((data) => {
        dataRes = JSON.parse(data); 
    });
    return dataRes;
}

/*function decodeStyle(block) {
    //debugger
    if (block.style) {
        let newStyle = {};
        for (let key in block.style) {
            let newStyleName = decodeStyle(key);
            newStyle[newStyleName] = block.style[key];
        }
        block.style = newStyle;
    }
    //block.style[action.styleName] = action.styleValue;
    //block.style = {...block.style};
    if (block.elements) {
        block.elements = block.elements.map(e => decodeStyle(e));
        return {...block};
    }
    return block;
}*/
/*
function readFileJSON (file,cbOnLoad) {

    var readFile= new Promise( (resolve) => {
        var lsData = loadFromLocalStorage('CV');
        resolve(lsData);
    });
    await loadLS.then((data) => {
        if (data) {
            blocks = data.blocks;
            style = data.style;
            user = data.user;
        } 
    });



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
*/
//localStorge
function saveLocalStorage(lsName,data) {
    let lsData = loadFromLocalStorage(lsName);
    let newlsData = {...lsData,...data};
    localStorage.setItem(lsName,JSON.stringify(newlsData));
}

function loadFromLocalStorage(lsName) {
    var ls = localStorage.getItem(lsName);
    if (ls) {
        return JSON.parse(ls);
    }    
}
   
//image
/*let storage = firebase.storage();
            /*let loadImage = new Promise((resolve) => {
                loadStorage('images/image.svg',resolve);
            });
            await loadImage.then((data) => {
                loadData.image = data;
            });*/

            /*
            
//load from storage
async function loadStorage(path,resolve) {
    const storageRef = storage.ref();
    storageRef.child(path).getDownloadURL()
        .then((url) => {
            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
                var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            
            resolve(url);
        })
        .catch((error) => {
        });
} */

export {createOption, createStyle, getAutoSize, saveFileJSON, readFileJSON, saveLocalStorage, loadFromLocalStorage, decodeStyle, CV_ID, OPTIONS_TEXT};
