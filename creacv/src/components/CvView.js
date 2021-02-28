import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

import CvBlock from './CvBlock';
import {createStyle} from './utils';

class CvView extends React.PureComponent {

    static propTypes = {
        blocks: PropTypes.array,
        stylePage: PropTypes.object,
    };

    state = {
        viewForPrint: false,
    }

    viewForPrint = () => {
        this.setState({viewForPrint:!this.state.viewForPrint});
    }
    
    render () {
        var cvBlocksCode = this.props.blocks.map( b => {
            return <CvBlock key={b.id} id={b.id} data={b} editable={false}></CvBlock>
        });

        return (
            <React.Fragment>
                {!this.state.viewForPrint && (
                    <header className={'header ' + this.props.transitionClass}>
                        <ul className='header__menu'>
                            <li className='header__menu-item'>
                                <button className='header__button header__button--print' onClick={this.viewForPrint}>View for print</button>
                            </li>
                            <li className='header__menu-item'>
                                <NavLink to='/cv' className='header__button header__button--edit'>Back to edit</NavLink>    
                            </li>
                        </ul>
                    </header>
                )}
                <main className={'main ' + this.props.transitionClass}>
                    {this.state.viewForPrint && (
                        <div className='header__print no-print'>
                            <span>You can save this page to PDF-file. Open a webpage in Chrome, press Ctrl+P to open the Print dialog and change the destination printer to “Save as PDF”. Hit the “Print” button and the webpage will download as a PDF document
                            </span>
                            <NavLink to='/cv' className='header__button header__button--edit'>Back to edit</NavLink>
                        </div>
                    )}
                    <div className='cv-view'>
                        <div className='cv' style={createStyle(this.props.stylePage)}>
                            {cvBlocksCode}
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        blocks: state.cvData.blocks,
        stylePage: state.cvData.stylePage,
    };
};
  
export default connect(mapStateToProps)(CvView);
