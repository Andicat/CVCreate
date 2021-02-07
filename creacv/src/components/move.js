let mouseStart;
let mouseShift;
let elem;

function move (evt) { 
    evt.preventDefault();
    console.log('mouse down', evt.target.parentNode);
    mouseStart = {
        x: evt.clientX,
        y: evt.clientY
    };
    elem = evt.target;
    console.log(mouseStart);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    //console.log(this.mouseStart);
    /*setAction(evt.target.getAttribute("data-action"));
    if (action) {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        //начальные координаты мышки
        mouseStart = {
            x: evt.clientX,
            y: evt.clientY
        };
        //пределы
        leftMax = image.offsetLeft + image.offsetWidth;
        topMax = image.offsetTop + image.offsetHeight;
        rightMin = cntImage.offsetWidth - image.offsetLeft;
        bottomMin = cntImage.offsetHeight - image.offsetTop;
        limits = {
            bottom: cntImage.offsetHeight - image.offsetHeight,
            right: cntImage.offsetWidth - image.offsetWidth,
        };
        //пропорции картинки
        propWidth = image.offsetWidth;
        propHeight = image.offsetHeight;
    }*/
}

function onMouseMove (moveEvt) {
    moveEvt.preventDefault();
    console.log('mouse move',moveEvt.target);
    mouseShift = {
        x: moveEvt.clientX - mouseStart.x,
        y: moveEvt.clientY - mouseStart.y 
    };
    mouseStart = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
    };
    //console.log('coords',mouseStart);
    elem.style.top = (elem.offsetTop + mouseShift.y) + "px";
    elem.style.left = (elem.offsetLeft + mouseShift.x) + "px";
}

/*evt.target.style.top = Math.min(topShift, limits.bottom) + "px";
evt.target.style.left = Math.min(leftShift, limits.right) + "px";*/
    //смещение мышки относительно начальных координат
    /*let mouseShift = {
        x: moveEvt.clientX - mouseStart.x,
        y: moveEvt.clientY - mouseStart.y 
    };
    //новые стартовые координаты мышки
    mouseStart = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
    };

    //показатели смещения
    var leftShift = Math.max(image.offsetLeft + mouseShift.x,0);
    var rightShift = image.offsetWidth + mouseShift.x;
    var topShift = Math.max(image.offsetTop + mouseShift.y,0);
    var bottomShift = image.offsetHeight + mouseShift.y;

    image.style.top = Math.min(topShift, limits.bottom) + "px";
    image.style.left = Math.min(leftShift, limits.right) + "px";
}*/

function onMouseUp (upEvt) {
    upEvt.preventDefault();
    console.log('mouse up', upEvt.currentTarget);
    document.removeEventListener('mousemove', onMouseMove);
    //setAction(null);
    document.removeEventListener('mouseup', onMouseUp);
}

  /*render () {
    return (
      <div className="container">
          {this.elemArr.map(el => el)}
        
      </div>
    );
  }

}*/

export default move;
