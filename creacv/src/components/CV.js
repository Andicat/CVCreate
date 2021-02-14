import React from 'react';
import PropTypes from 'prop-types';

import CvBlock from './CvBlock';
import OptionPanel from './OptionPanel';

import {connect} from 'react-redux';

class CV extends React.PureComponent {

    static propTypes = {
        cvData: PropTypes.object,  //из Redux
    };

    render () {
        //console.log('render cv',this.props.cvData);
        let toolCode = null;
        if (this.props.cvData.activeElementId!=null) {
            toolCode = <OptionPanel></OptionPanel>;
        }
        var cvBlocksCode = this.props.cvData.blocks.map( b => {
            return <CvBlock key={b.id} id={b.id} data={b} active={(this.props.cvData.activeBlockId===b.id)?true:false} activeElementId={this.props.cvData.activeElementId}></CvBlock>
        });
        
        return (
            <div className='desk'>
                {toolCode}
                <div className='cv'>
                    {cvBlocksCode}
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
      cvData: state.cvData,
    };
};
  
export default connect(mapStateToProps)(CV);
