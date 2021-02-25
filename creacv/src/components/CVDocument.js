import React from 'react';
import PropTypes from 'prop-types';
import CvBlock from './CvBlock';
import Transform from './Transform';

import {cvBlock_activate} from '../redux/cvDataAC';

import {connect} from 'react-redux';
import {createStyle} from './utils';

class CVDocument extends React.PureComponent {

    static propTypes = {
        blocks: PropTypes.array,
        activeBlock: PropTypes.object,
        activeBlocksId: PropTypes.array,
    };

    onClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.props.dispatch(cvBlock_activate(null,null));
        };
    }

    render () {
        //console.log('render cv-doc', this.props.blocks);
        var cvBlocksCode = this.props.blocks.map( b => {
            let activeIndex = this.props.activeBlocksId.findIndex(ab => ab===b.id);
            return <CvBlock key={b.id} id={b.id} data={b} activeIndex={activeIndex} activeElementId={activeIndex>=0?this.props.activeElementId:null}></CvBlock>
        });
        
        return (
            <div className='cv-container'>
                {(this.props.activeBlock && this.cv) && <Transform block={this.props.activeBlock} cv={this.cv}></Transform>}
                <div className='cv' style={createStyle(this.props.stylePage)} onClick={this.onClick} ref={(f) => this.cv = f}>
                    {cvBlocksCode}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        blocks: state.cvData.blocks,
        activeBlocksId: state.cvData.activeBlocksId,
        activeElementId: state.cvData.activeElementId
    };
};
  
export default connect(mapStateToProps)(CVDocument);
