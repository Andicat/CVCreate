import React from 'react';
import PropTypes from 'prop-types';

import CvBlock from './CvBlock';
import CvTransform from './CvTransform';
import OptionPanel from './OptionPanel';
import {cvBlock_activate} from '../redux/cvDataAC';

import {connect} from 'react-redux';

class CV extends React.PureComponent {

    static propTypes = {
        blocks: PropTypes.array,  //из Redux
    };

    onClick = (evt) => {
        if (evt.target.className==='cv') {
            this.props.dispatch(cvBlock_activate(null));
        };
    }
    

    render () {
        var cvBlocksCode = this.props.blocks.map( b => {
            return <CvBlock key={b.id} id={b.id} data={b}></CvBlock>
        });
        console.log('render cv',cvBlocksCode);
        
        return (
            <div className='desk'>
                <OptionPanel></OptionPanel>
                <CvTransform></CvTransform>
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
    };
};
  
export default connect(mapStateToProps)(CV);
