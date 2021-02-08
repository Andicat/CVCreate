const CV_BLOCK_ADD='CV_BLOCK_ADD';
//const COUNTER_BUTTON_ADD='COUNTER_BUTTON_ADD';

const cvBlock_add = function(counterid) {
  return {
    type: CV_BLOCK_ADD,
    counterid:counterid,
  };
}

/*const counterButton_add=function(counterid,addvalue) {
  return {
    type: COUNTER_BUTTON_ADD,
    counterid:counterid,
    addvalue:addvalue,
  };
}*/

export {
  cvBlock_add,CV_BLOCK_ADD,
}
