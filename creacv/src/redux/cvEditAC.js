const CV_EDIT = 'CV_BLOCK_ADD';
//const COUNTER_BUTTON_ADD='COUNTER_BUTTON_ADD';

const cvBlock_add = function(newBlock) {
  return {
    type: CV_EDIT,
    newBlock:newBlock,
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
  cvBlock_add,CV_EDIT,
}
