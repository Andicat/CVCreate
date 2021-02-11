import React from 'react';
import PropTypes from 'prop-types';
import CvBlock from './CvBlock';
//import CVEvents from './events';

import {connect} from 'react-redux';
import {cvBlock_add} from '../redux/cvDataAC';
import Tools from './Tools';

class CV extends React.PureComponent {

    static propTypes = {
        cvData: PropTypes.object,  //из Redux
    };

    static defaultProps = {
        //blocks: [],
    };

    state = {
        //blockToEdit: null,
        //blocks:this.props.blocks.slice(),
    }

    componentDidMount = () => {
        //console.log(this.props);
        //CVEvents.addListener('moveElement',this.moveElement);
    }

    componentWillUnmount = () => {
        //CVEvents.removeListener('moveElement',this.moveElement);
    }

    componentWillMount() {
        // изначально счётчика с идентификатором counterid нет
        // создадим
        //console.log('1 - ',this.props.blocks);
        //this.props.dispatch( cvBlock_add(this.props.blocks) );
        //console.log('2 - ',this.props.blocks);
      }

    incCounter = () => {
        //this.props.dispatch( counterButton_add(this.props.counterid,1) );
      }
    
      decCounter = () => {
        //this.props.dispatch( counterButton_add(this.props.counterid,-1) );
      }

    //elemArr = [<CvBlock key={1}><img src={this.props.src}></img></CvBlock>,<CvBlock key={2}><img src={this.props.src}></img></CvBlock>];
    

    render () {
        let toolCode = null;
        if (this.props.cvData.activeElementId!=null) {
            toolCode = <Tools block={this.props.cvData.activeElementId}></Tools>;
        }
        //console.log('blocks',this.props.cvData.blocks);
        //console.log('props',this.props.cvData.activeBlock);
        var cvBlocksCode = this.props.cvData.blocks.map( b => {
            //let isActive = false;
            //if (this.props.cvData.activeBlockId!=null && this.props.cvData.activeBlockId===i) {
            //    isActive = true;
            //    toolCode = <Tools block={b}></Tools>;
            //}
            //console.log(this.props.cvData.activeBlockId===i);
            //if (this.props.cvData.activeBlock) 
            //{ console.log(this.props.cvData.activeBlock.props.id); }
            //console.log("active block", b===this.props.cvData.activeBlock);
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
      // весь раздел Redux state под именем counters будет доступен
      // данному компоненту как this.props.counters
      cvData: state.cvData,
    };
};
  
export default connect(mapStateToProps)(CV);
