import React from 'react';
import PropTypes from 'prop-types';
import {Transition} from "react-transition-group";
import {connect} from 'react-redux';
import CvElement from './CvElement';
import {cvBlock_activate, cvBlock_activateMulti} from '../redux/cvDataAC';

class CvBlock extends React.PureComponent {

    static propTypes = {
        id: PropTypes.number.isRequired,
        data: PropTypes.object.isRequired,
        activeIndex: PropTypes.number,        
        activeElementId: PropTypes.string,
        editable: PropTypes.bool,
        newBlock: PropTypes.bool,
    };

    blockRef = React.createRef();

    componentDidMount() {
        if (this.props.newBlock) {
            this.props.dispatch(cvBlock_activate(this.props.id, this.blockRef.current));
        }
    }

    onClick = (evt) => {
        if (evt.ctrlKey || evt.shiftKey) {
            this.props.dispatch(cvBlock_activateMulti(this.props.id));
        } else {
            let activatedElement = evt.target.getAttribute('data-elem');
            this.props.dispatch(cvBlock_activate(this.props.id, evt.currentTarget, activatedElement));
        }
    }

    render () {
        //console.log('render cv block',this.props.id);
        let style = {top:this.props.data.positionTop + 'px', left:this.props.data.positionLeft + 'px', width:this.props.data.width + 'px', height:this.props.data.height + 'px'};
        let className = 'cv__block' + ((this.props.activeIndex>=0)?' cv__block--active':'')
                        + ((this.props.activeIndex===0)?' cv__block--active-first':'')
                        + (this.props.data.lock?' cv__block--lock':'');
        let elementCode = <CvElement id={'' + this.props.id} blockId={this.props.id} editable={this.props.editable} data={this.props.data} activeElementId={this.props.activeElementId}></CvElement>;

        return (
            <Transition in={true} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
                {stateName => {
                    return <div className={className + ' ' + stateName} style={style} onClick={this.onClick} ref={this.blockRef}>
                    {elementCode} 
                </div>
            }}
        </Transition>
            
        );
    }
}

const mapStateToProps = function (state) {
    return {
        newBlock: state.cvData.newBlock,
    };
};

export default connect(mapStateToProps)(CvBlock);
