import React from 'react';
import Image from "./Image";
import CVEvents from './events';

class Container extends React.PureComponent {

    static propTypes = {
        //element: PropTypes.object,
    };

    componentDidMount = () => {
        CVEvents.addListener('moveElement',this.moveElement);
    }

    componentWillUnmount = () => {
        CVEvents.removeListener('moveElement',this.moveElement);
    }

    moveElement = (elem) => {
        console.log('move element',elem);
    }

    elemArr = [<Image key={1} id={1}></Image>,<Image key={2} id={2}></Image>];

  //mouseStart = {};
  //mouseShift = {};


  onMouseDown = (evt) => { 
    evt.preventDefault();
    console.log('mouse down', evt.currentTarget);
    evt.currentTarget.addEventListener('mousemove', this.onMouseMove);
    evt.currentTarget.addEventListener('mouseup', this.onMouseUp);
    this.mouseStart = {
      x: evt.clientX,
      y: evt.clientY
  };
  console.log(this.mouseStart);
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

onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();
    console.log('mouse move',moveEvt.target);
    this.mouseShift = {
      x: moveEvt.clientX - this.mouseStart.x,
      y: moveEvt.clientY - this.mouseStart.y 
  };
  this.mouseStart = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
};
console.log('coords', )
//image.style.top = Math.min(topShift, limits.bottom) + "px";
//image.style.left = Math.min(leftShift, limits.right) + "px";*/
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
    image.style.left = Math.min(leftShift, limits.right) + "px";*/
}

onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    console.log('mouse up');
    upEvt.currentTarget.removeEventListener('mousemove', this.onMouseMove);
    //setAction(null);
    upEvt.currentTarget.removeEventListener('mouseup', this.onMouseUp);
}

  render () {
    return (
      <div className="container">
          {this.elemArr.map(el => el)}
        
      </div>
    );
  }

}

export default Container;
