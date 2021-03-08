import React from 'react';
import {NavLink} from 'react-router-dom';
import Media from 'react-media';
import Option from './Option';
import {BLOCK_ACTION, BLOCKS_ACTION} from '../modules/utils';

class CvSettings extends React.PureComponent {

    openMenuMobile = () => {
        this.menu.classList.toggle('header__menu--show');
    }
    
    render () {
        let codeBlocksOptions = BLOCKS_ACTION.map( (a,i) => (
            <Option key={i} optionName={a} cbOnChange={this.setAction}/>));
        let codeBlockOptions = BLOCK_ACTION.map( (a,i) => (
                <Option key={i} optionName={a} cbOnChange={this.setAction}/>));
        return (
            <React.Fragment>
                <header className={'header ' + this.props.transitionClass}>
                    <ul className='header__menu' ref={(f) => this.menu = f}>
                        <li className='header__menu-item'>
                            <NavLink to='/' className='header__button header__button--edit'>Back to create</NavLink>    
                        </li>
                    </ul>
                    <Media query="(max-width: 767px)">
                        <button className='header__button header__button--menu' onClick={this.openMenuMobile}/>
                    </Media>
                </header>
                <main className={'main ' + this.props.transitionClass}>
                    <div className='cv-view'>
                        <div className='cv cv-settings'>
                            <h2>Работа с документом</h2>
                            <ul>
                                <li>
                                    <h3>Создание</h3>
                                    <p>В начале работы создается пустой документ и его наименование сохраняется в базе приложения.</p>
                                    <p>Добавляйте новые блоки, мен.</p>

                                </li>
                            </ul>
                            <p></p>
                        <span> опции блоков, блока, трансформации, объединения блоков, сохранение, зазрузка, создание и обновление ссылки.</span>
                        {codeBlocksOptions}
                        {codeBlockOptions}
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default CvSettings;
