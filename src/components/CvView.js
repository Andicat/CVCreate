import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Media from 'react-media';
import {cv_setLink} from '../redux/cvDataAC';
import CvBlock from './CvBlock';
import {createStyle, saveLocalStorage} from '../modules/utils';
import {saveFirebase} from './withDataLoad';

//просмотр документа
class CvView extends React.PureComponent {

    static propTypes = {
        blocks: PropTypes.array,
        stylePage: PropTypes.object,
        user: PropTypes.string,
        link: PropTypes.string,
    };

    state = {
        viewForPrint: false,
        linkIsUpdated: false,
    }

    //просмотр для печати
    viewForPrint = () => {
        this.setState({viewForPrint:!this.state.viewForPrint});
    }

    //создаем ссылку в базе приложения
    createLink = async () => {
        let linkName = this.props.user;
        let stateToSave = {style:this.props.stylePage,blocks:this.props.blocks};
        saveFirebase('Links',linkName,stateToSave,false);
        saveLocalStorage('CV',{link:linkName});
        this.props.dispatch(cv_setLink(linkName));
    }

    //обновляем ссылку в базе приложения
    updateLink = async (evt) => {
        let linkName = this.props.user;
        let stateToSave = {style:this.props.stylePage,blocks:this.props.blocks};
        evt.target.parentNode.classList.add('exiting');
        let timer = setTimeout(()=>{
                            this.setState({linkIsUpdated:true});
                            clearTimeout(timer);
                            return;}
                    ,500);
        saveFirebase('Links',linkName,stateToSave,false);
    }

    //открыть меню (мобил.версия)
    openMenuMobile = () => {
        this.menu.classList.toggle('header__menu--show');
    }
    
    render () {
        let cvBlocksCode = this.props.blocks.map( b => {
            return <CvBlock key={b.id} id={b.id} data={b} editable={false}></CvBlock>
        });

        let linkCode;
        if (this.props.link) {
            linkCode = <React.Fragment>
                            {!this.state.linkIsUpdated &&
                                <li className='header__menu-item'>
                                    <button className='header__button header__button--link-update' onClick={this.updateLink}>Update link</button>
                                </li>
                            }
                            <li className='header__menu-item'>
                                <NavLink to={'/' + this.props.link} className='header__button header__button--show' target="_blank">Open link ({this.props.link})</NavLink>
                            </li>
                        </React.Fragment>
        } else {
            linkCode = <li className='header__menu-item'>
                            <button className='header__button header__button--link-create' onClick={this.createLink}>Create Link</button>
                        </li>
        }

        return (
            <React.Fragment>
                {!this.state.viewForPrint && (
                    <header className={'header ' + this.props.transitionClass}>
                        <ul className='header__menu' ref={(f) => this.menu = f}>
                            <Media query="(min-width: 768px)">
                                <li className='header__menu-item'>
                                    <button className='header__button header__button--print' onClick={this.viewForPrint}>View for print</button>
                                </li>
                            </Media>
                            <li className='header__menu-item'>
                                <NavLink to='/' className='header__button header__button--edit'>Back to edit</NavLink>    
                            </li>
                            {linkCode}
                        </ul>
                        <Media query="(max-width: 767px)">
                            <button className='header__button header__button--menu' onClick={this.openMenuMobile}/>
                        </Media>
                    </header>
                )}
                <main className={'main ' + this.props.transitionClass}>
                    {this.state.viewForPrint && (
                        <div className='header__print no-print'>
                            <span>You can save this page to PDF-file. Open a webpage in Chrome, press Ctrl+P to open the Print dialog and change the destination printer to “Save as PDF”. Hit the “Print” button and the webpage will download as a PDF document
                            </span>
                            <NavLink to='/' className='header__button header__button--edit'>Back to edit</NavLink>
                        </div>
                    )}
                    <div className={'cv-view' + (this.state.viewForPrint?' cv-view-print':'')}>
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
        user: state.cvData.user,
        link: state.cvData.link,
    };
};

export default connect(mapStateToProps)(CvView);
