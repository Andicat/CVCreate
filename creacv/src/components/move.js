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

function createElement (elem, key = 1) {
    let elemCode;
    switch (elem.type) {
        case 'image': 
            elemCode = <Image key={key} style={elem.style} src={elem.src}/>;
            break;
        case 'text': 
            elemCode = <Text key={key} style={elem.style} text={elem.text}/>;
            break;
        case 'figure': 
            elemCode = <Figure key={key} style={elem.style}/>;
            break;
        case 'group': 
            elemCode = elem.elements.map( (e,i) => createElement(e,i));
            break;
        default:
            elemCode = null;
    }
    return elemCode;
};

export { move, createElement };
