import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {Transition} from 'react-transition-group';
import Media from 'react-media';
import OptionPanel from './OptionPanel';
import TemplatePanel from './TemplatePanel';
import CvDocument from './CvDocument';
import firebase from '@firebase/app';
import 'firebase/auth';

import {saveFileJSON, readFileJSON, saveLocalStorage} from '../modules/utils';
import {cv_load,cvBlock_activate,templates_open_panel, cv_setUser} from '../redux/cvDataAC';

//Компонент работы с документом
class CV extends React.PureComponent {

    static propTypes = {
        transitionClass: PropTypes.string,
        stylePage: PropTypes.object,
        blocks: PropTypes.array,
        activeBlocksId: PropTypes.array,
        showPanel: PropTypes.bool,
    };

    //сохранение в формате json на локальном компьютере
    saveCV = () => {
        let stateToSave = {style: this.props.stylePage,blocks: this.props.blocks};
        saveFileJSON(stateToSave,'CV','.json');
        saveLocalStorage('CV',stateToSave);
    }

    //сохранение в local Storage
    saveLS = () => {
        if (this.props.activeBlocksId.length>0) {
            this.props.dispatch(cvBlock_activate(null,null));
        }
        let stateToSave = {style: this.props.stylePage,blocks: this.props.blocks};
        saveLocalStorage('CV',stateToSave);
    }

    //загрузка из файла json на локальном компьютере
    loadCV = async(evt) => {
        let data = await readFileJSON(evt.target.files[0]);
        this.props.dispatch(cv_load(data.blocks,data.style));
        saveLocalStorage('CV',{style: data.style,blocks: data.blocks});
        evt.target.value = null;
    }

    singOut = (evt) => {
        evt.preventDefault();
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('CV-user');
                this.props.dispatch(cv_setUser(null));
            });
    }

    //открыть меню (мобил.версия)
    openMenuMobile = () => {
        this.menu.classList.toggle('header__menu--show');
    }

    onClickBtnPanel = () => {
        this.props.dispatch(templates_open_panel());
    }

    render () {
        let activeOneId = (this.props.activeBlocksId.length===1) && this.props.activeBlocksId[0];
        let activeBlock = null;
        let activeBlockOptions;
        if (activeOneId) {
            activeBlock = this.props.blocks.find(b => b.id === activeOneId);
            activeBlockOptions = {id: activeBlock.id,
                lock: activeBlock.lock,
                link: activeBlock.link,
                group: activeBlock.group,
                width: (activeBlock.group || !activeBlock.size)?false:activeBlock.width,
                height: (activeBlock.group || !activeBlock.size)?false:activeBlock.height,
            };
        }

        return (
            <React.Fragment>
                <header className={'header ' + this.props.transitionClass}>
                    <span className='header__logo'>Create your CV</span>
                    <ul className='header__menu' ref={(f) => this.menu = f}>
                        <li className='header__menu-item'>
                            <button className='header__button header__button--save' onClick={this.saveCV}>Save</button>
                        </li>
                        <li className='header__menu-item'>
                            <input type='file' name='file-cv' id='file-cv' className='option__file' accept='text/*' onChange={this.loadCV}></input>
                            <label className='header__button header__button--load' htmlFor='file-cv' data-tooltip={true}>Load</label>
                        </li>
                        <li className='header__menu-item'>
                            <NavLink to='/view' className='header__button header__button--show' onClick={this.saveLS}>Show</NavLink>
                        </li>
                        <li className='header__menu-item'>
                            <NavLink to='/settings' className='header__button header__button--settings' onClick={this.showSettings}/>
                        </li>
                        <li className='header__menu-item'>
                            <button className='header__button header__button--logout' onClick={this.singOut}/>
                        </li>
                    </ul>
                    <Media query='(max-width: 767px)'>
                        <button className='header__button header__button--menu' onClick={this.openMenuMobile}/>
                    </Media>
                </header>
                <main className={'main ' + this.props.transitionClass}>
                    <div className='template-panel'>
                        <Transition in={this.props.showPanel} unmountOnExit timeout={{ enter: 500, exit: 500 }}>
                            {stateName => {
                                return <TemplatePanel transitionClass={stateName}/>;
                            }}
                        </Transition>
                        {this.props.showPanel && null}
                        <button className='template-panel__button-hide' onClick={this.onClickBtnPanel}/>
                    </div>
                    <div className='desk'>
                        <OptionPanel activeBlockOptions={activeBlockOptions}/>
                        <CvDocument activeBlock={activeBlock} stylePage={this.props.stylePage}/>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        stylePage: state.cvData.stylePage,
        blocks: state.cvData.blocks,
        activeBlocksId: state.cvData.activeBlocksId,
        showPanel: state.cvData.showPanel,
    };
};

export default connect(mapStateToProps)(CV);
