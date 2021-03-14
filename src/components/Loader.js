import React from 'react';
import PropTypes from 'prop-types';

//загрузчик данных
class Loader extends React.PureComponent {

    static propTypes = {
        text: PropTypes.string,
        transitionClass: PropTypes.string,
    };

    render() {
        return (
            <div className={'loader ' + this.props.transitionClass }>
                <span className='loader__text'>{this.props.text}</span>
                <i className='loader__layer loader__layer--1'></i>
                <i className='loader__layer loader__layer--2'></i>
                <i className='loader__layer loader__layer--3'></i>
            </div>);
    }

}

export default Loader;
