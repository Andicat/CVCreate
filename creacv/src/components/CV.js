import React from 'react';
import PropTypes from 'prop-types';

import CvBlock from './CvBlock';
import CvTransform from './CvTransform';
import OptionPanel from './OptionPanel';
import {cvBlock_activate} from '../redux/cvDataAC';

import {connect} from 'react-redux';

class CV extends React.PureComponent {

    static propTypes = {
        blocks: PropTypes.array,
        activeBlocksId: PropTypes.object,
        cvData: PropTypes.object,
    };

    onClick = (evt) => {
        if (evt.target.className==='cv') {
            this.props.dispatch(cvBlock_activate(null));
        };
    }
    

    render () {

        console.log('render cv', this.props.activeBlocksId);
        let activeOneId = (this.props.activeBlocksId.size==1) && [...this.props.activeBlocksId][0];
        let activeBlock = null;
        if (activeOneId) {
            activeBlock = this.props.blocks.find(b => b.id === activeOneId);
        }
        //console.log('active block',activeOneId);
        //console.log('block 2',this.props.cvData.blocks.find(b => b.id === activeOneId));
        var cvBlocksCode = this.props.blocks.map( b => {
            return <CvBlock key={b.id} id={b.id} data={b} active={this.props.activeBlocksId.has(b.id)}></CvBlock>
        });
        //console.log('render cv',cvBlocksCode);
        
        return (
            <div className='desk'>
                <OptionPanel></OptionPanel>
                {activeBlock && <CvTransform block={activeBlock}></CvTransform>}
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
        cvData: state.cvData,
    };
};
  
export default connect(mapStateToProps)(CV);
