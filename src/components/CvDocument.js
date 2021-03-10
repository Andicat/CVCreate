import React from 'react';
import PropTypes from 'prop-types';
import {Transition} from "react-transition-group";
import {connect} from 'react-redux';
import CvBlock from './CvBlock';
import Transform from './Transform';
import {cvBlock_activate} from '../redux/cvDataAC';
import {createStyle} from '../modules/utils';

//документ
class CvDocument extends React.PureComponent {

    static propTypes = {
        blocks: PropTypes.array,
        activeBlock: PropTypes.object,
        activeBlocksId: PropTypes.array,
        showPanel: PropTypes.bool,
        stylePage: PropTypes.object,
    };

    //активируем документ
    onClick = (evt) => {
        if (evt.target === evt.currentTarget) {
            this.props.dispatch(cvBlock_activate(null,null));
        }
    }

    render () {
        let cvBlocksCode = this.props.blocks.map( b => {
            let activeIndex = this.props.activeBlocksId.findIndex(ab => ab===b.id);
            return <CvBlock key={b.id} id={b.id} data={b} activeIndex={activeIndex} activeElementId={activeIndex>=0?this.props.activeElementId:null} editable={true}></CvBlock>
        });
        
        return (
            <div className='cv-container' onClick={this.onClick}>
                {(this.props.activeBlock && this.cv) && (
                    <Transition in={this.props.showPanel} timeout={{ enter: 1000, exit: 1000 }}>
                        {stateName => {
                            return <Transform block={this.props.activeBlock} cv={this.cv} transitionClass={stateName}/>
                        }}
                    </Transition>
                )}
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
  
export default connect(mapStateToProps)(CvDocument);
