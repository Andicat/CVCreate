import React from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

import {connect} from 'react-redux';

class OptionPanel extends React.PureComponent {

    static propTypes = {
        styleToEdit: PropTypes.object,       //Redux
        activeElementId: PropTypes.string,   //Redux
    };

    render () {
        if (!this.props.activeElementId) {
            return null;
        }
        return (
            <form className="options">
                {Object.keys(this.props.styleToEdit).map( (s,i) => (
                    <Option key={i} optionName={s} optionValue={this.props.styleToEdit[s]}/>
                ))}
            </form>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        styleToEdit: state.cvData.styleToEdit,
        activeElementId: state.cvData.activeElementId, 
    };
};

export default connect(mapStateToProps)(OptionPanel);
