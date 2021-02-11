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

function createJSX (elem, activeId, key = 0) {
    let elemCode;
    let elemId = '' + elem.id + key;
    switch (elem.type) {
        case 'image': 
            elemCode = <Image key={elemId} id={elemId} style={elem.style} src={elem.src} active={activeId===elemId}/>;
            break;
        case 'text': 
            elemCode = <Text key={elemId} id={elemId} style={elem.style} text={elem.text} active={activeId===elemId}/>;
            break;
        case 'figure': 
            elemCode = <Figure key={elemId} id={elemId} style={elem.style}/>;
            break;
        case 'group': 
            elemCode = <div key={elemId} className={'cv__group' + (elem.direction?(' cv__group--' + elem.direction):'')}>{elem.elements.map( (e,i) => createJSX({...e, id:elem.id},activeId,i))}</div>;
            break;
        default:
            elemCode = null;
    }
    return elemCode;
};

function renderFunc (type,text,style,className,cbOnClick) {
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

export { move, createJSX, renderFunc };
