import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

import {connect} from 'react-redux';
import {CV_ID} from './utils';

class CvAction extends React.PureComponent {

    static propTypes = {
        style: PropTypes.object,
        cbSave: PropTypes.func.isRequired,
        cbLoad: PropTypes.func.isRequired,    
    };

    render () {
        let codeOptions = null;        
        if (this.props.style) {
            codeOptions = Object.keys(this.props.style).map( (s,i) => (
                <Option key={i} optionName={s} optionValue={this.props.style[s]} blockId={CV_ID}/>));
        } 
        let codeActions = <React.Fragment>
                                <div className='options__elem'>
                                    <input type='button' className={'option option__save'} onClick={this.props.cbSave}/>
                                </div>
                                <div className='options__elem'>
                                    <input type='button' className={'option option__download'} onClick={this.props.cbLoad}/>
                                </div>
                          </React.Fragment>;
        
        if (!codeOptions && !codeActions) {
            return null;
        }
        return (
            <form className='options options__cv'>
                {codeOptions}
                <div className='options__block'>
                    {codeActions}
                </div>
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        style: state.cvData.stylePage,
    };
};

export default connect(mapStateToProps)(CvAction);
