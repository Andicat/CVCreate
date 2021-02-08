import React from 'react';
import PropTypes from 'prop-types';
import CvBlock from './CvBlock';
import { createElement } from './move'
//import CVEvents from './events';

import {connect} from 'react-redux';
import { cvBlock_add } from '../redux/cvDataAC';

class CvContainer extends React.PureComponent {

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
        //console.log('props',createElement);
        var blocksCode = this.props.cvData.blocks.map( (b,i) => {
            return <CvBlock key={i}>{createElement(b)}</CvBlock>
        });
        
        return (
            <div className='cv'>
                {blocksCode}
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
  
export default connect(mapStateToProps)(CvContainer);
