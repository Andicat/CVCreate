import React from 'react';
import PropTypes from 'prop-types';

import CvBlock from './CvBlock';
import Transform from './Transform';
import OptionPanel from './OptionPanel';
import {cvBlock_activate} from '../redux/cvDataAC';

import {connect} from 'react-redux';
import {createStyle} from './utils';

class CV extends React.PureComponent {

    static propTypes = {
        stylePage: PropTypes.object,  
        blocks: PropTypes.array,
        activeBlocksId: PropTypes.array,
        activeElementId: PropTypes.string,
        //cvData: PropTypes.object,
    };

    onClick = (evt) => {
        if (evt.target.className==='cv') {
            this.props.dispatch(cvBlock_activate(null));
        };
    }
    

    render () {
        console.log('render cv', this.props.blocks);
        let style = createStyle(this.props.stylePage);
        let activeOneId = (this.props.activeBlocksId.length===1) && this.props.activeBlocksId[0];
        let activeBlock = null;
        let activeElementId = null;
        if (activeOneId) {
            activeBlock = this.props.blocks.find(b => b.id === activeOneId);
            activeElementId = this.props.activeElementId;
        }
        //console.log('active block',activeOneId);
        //console.log('block 2',this.props.cvData.blocks.find(b => b.id === activeOneId));
        var cvBlocksCode = this.props.blocks.map( b => {
            let activeIndex = this.props.activeBlocksId.findIndex(ab => ab===b.id);
            //activeIndex = activeIndex?activeIndex:-1;
            //console.log('active id',activeIndex);
            return <CvBlock key={b.id} id={b.id} data={b} activeIndex={activeIndex} activeElementId={activeIndex>=0?activeElementId:null}></CvBlock>
        });
        
        return (
            <div className='desk'>
                <OptionPanel block={activeBlock}></OptionPanel>
                {activeBlock && <Transform block={activeBlock}></Transform>}
                <div className='cv' style={style} onClick={this.onClick}>
                    {cvBlocksCode}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        stylePage: state.cvData.stylePage,
        blocks: state.cvData.blocks,
        activeBlocksId: state.cvData.activeBlocksId,
        activeElementId: state.cvData.activeElementId
        //cvData: state.cvData,
    };
};
  
export default connect(mapStateToProps)(CV);
