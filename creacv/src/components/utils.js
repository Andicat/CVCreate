import React from 'react';
import Image from "./Image";
import Text from "./Text";
import Figure from "./Figure";

//create jsx-code for block
function createJSX (id, elem, cv, activeId, key = 0) {
    let elemCode;
    let elemId = '' + id + key;
    switch (elem.type) {
        case 'image': 
            elemCode = <Image key={elemId} id={elemId} cv={cv} style={elem.style} src={elem.src} active={activeId===elemId}/>;
            break;
        case 'text':
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

    function setImage(evt) {
       /* debugger
        let file = evt.target.files[0];
        let fileName = file.name.toLowerCase();
        loadImage(files[i], evt.target);
        var reader = new FileReader(file);

    reader.addEventListener('load', function () {
      if (target === avatarFileChooser) {
        avatarPreview.src = reader.result;
      }
      if (target === photoFileChooser) {
        var photoPreview = photoPreviewTemplate.cloneNode(true);

        photoPreview.style.backgroundImage = 'url(' + reader.result + ')';
        photoPreview.style.backgroundRepeat = 'no-repeat';
        photoPreview.style.backgroundSize = 'cover';

        photoContainer.appendChild(photoPreview);
      }
    });

    reader.readAsDataURL(file);
        /*if (this.props.style['file']) {
            let img = new Image();
            img.src = this.props.style['file'];
        }
        let src = null || (this.props.src);
        */
        cbOnChange(evt.target.checked);
    }


    function codeNumber() {
        return <React.Fragment>
                    <input type='button' className='option option__button' value='&ndash;' onClick= {(evt) => {setValue(evt.target.nextSibling,Number(optionValue)-1)}}/>
                    <input type='text' className='option option__number' value={optionValue} onChange={setValueInput}></input>
                    <input type='button' className='option option__button' value='+' onClick= {(evt) => {setValue(evt.target.previousSibling,Number(optionValue)+1)}}/>
                </React.Fragment>
    };

    function codeCheckbox() {
        return <React.Fragment>
                    <input type='checkbox' id={optionType} className='option option__checkbox' checked={optionValue} onChange={setValueCheckBox}/>
                    <label htmlFor={optionType}/>
                </React.Fragment>
    };

    function codeColor() {
        return <input type='color' className='option option__color' value={optionValue} onChange={setValueInput}></input>
    }

    function codeFile() {
        return <React.Fragment>
                    <input type='file' name="file" id="file" className='option option__file' value={optionValue} onChange={setImage}></input>
                    <label htmlFor="file">Load file</label>
                </React.Fragment>
    };

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
            elemCode = codeFile();
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

export {createJSX, optionRenderFunc, createOption, createStyle};
