import React from 'react';
import PropTypes from 'prop-types';

import CvBlock from './CvBlock';
import Transform from './Transform';
import OptionPanel from './OptionPanel';
import {cvBlock_activate} from '../redux/cvDataAC';

import {connect} from 'react-redux';

class CV extends React.PureComponent {

    static propTypes = {
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
        console.log('render cv', this.props.activeBlocksId);
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
            let isActive = !!this.props.activeBlocksId.find(ab => ab===b.id);
            return <CvBlock key={b.id} id={b.id} data={b} active={isActive} activeElementId={isActive?activeElementId:null}></CvBlock>
        });
        
        return (
            <div className='desk'>
                <OptionPanel block={activeBlock}></OptionPanel>
                {activeBlock && <Transform block={activeBlock}></Transform>}
                <div className='cv' onClick={this.onClick}>
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
        //cvData: state.cvData,
    };
};
  
export default connect(mapStateToProps)(CV);
