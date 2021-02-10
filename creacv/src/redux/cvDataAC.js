const CV_BLOCK_ADD = 'CV_BLOCK_ADD';
const CV_BLOCK_DELETE = 'CV_BLOCK_DELETE';
const CV_BLOCK_MOVE = 'CV_BLOCK_MOVE';
const CV_BLOCK_ACTIVATE = 'CV_BLOCK_ACTIVATE';

const cvBlock_add = function(block) {
  return {
    type: CV_BLOCK_ADD,
    block:block,
  };
}

const cvBlock_delete = function(block) {
  return {
    type: CV_BLOCK_ADD,
    block:block,
  };
}

const cvBlock_move = function(block) {
  return {
    type: CV_BLOCK_MOVE,
    block:block,
  };
}

const cvBlock_activate = function(block) {
  return {
    type: CV_BLOCK_ACTIVATE,
    block:block,
  };
}

export {
  cvBlock_add, CV_BLOCK_ADD,
  cvBlock_delete, CV_BLOCK_DELETE,
  cvBlock_move, CV_BLOCK_MOVE,
  cvBlock_activate, CV_BLOCK_ACTIVATE,
}
