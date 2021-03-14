import React from 'react';
import {NavLink} from 'react-router-dom';
import Media from 'react-media';
import Option from './Option';

//документ описания настроек приложения
class CvSettings extends React.PureComponent {

    openMenuMobile = () => {
        this.menu.classList.toggle('header__menu--show');
    }

    render () {
        return (
            <React.Fragment>
                <header className={'header ' + this.props.transitionClass}>
                    <ul className='header__menu' ref={(f) => this.menu = f}>
                        <li className='header__menu-item'>
                            <NavLink to='/' className='header__button header__button--edit'>Back to edit</NavLink>
                        </li>
                    </ul>
                    <Media query='(max-width: 767px)'>
                        <button className='header__button header__button--menu' onClick={this.openMenuMobile}/>
                    </Media>
                </header>
                <main className={'main ' + this.props.transitionClass}>
                    <div className='cv-view'>
                        <div className='cv cv--settings'>
                            <h2>О CVCreate.</h2>
                            <span>В 'CVCreate' можно создать свою страничку резюме (формата А4) с помощью различных блоков. Эту страничку можно сохранить в виде ссылки, в виде PDF-файла.
                                Можно также сохранять свои документы на локальном компьютере, создавать свои шаблоны блоков.</span>
                            <h2>Добавление. Перемещение. Изменение размера. Удаление.</h2>
                            <span>Добавить блок в документ можно из панели шаблонов нажатием кнопки.
                                Выделив мышкой блок в документе, его можно удалить, изменить размер, переместить. Сделать это можно с помощью зажатой левой клавиши мыши и соответсвующей кнопки в углах рамки.
                                Двигать выделенный блок также можно с помощью клавиатуры (Ctrl + стрелки 'вниз','вверх','вправо','влево').</span>
                            <h2>Работа с содержимым блока</h2>
                            <span>Блок содержит в себе один или несколько элементов, выделив один их них можно внести свои изменения через меню опций этого элемента. Текст элемента можно править напрямую в элементе.</span>
                            <h2>Действия с блоком.</h2>
                            <p>Выделив кликом мышки один из блоков, на панеле опций будут следующий варианты действий:</p>
                            <ul>
                                <li>
                                    <Option key={0} optionName={'lock'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Блокировать положение блока в документе. Заблокированный блок не двигается и не меняет размер. Если заблокированный блок находится на заднем фоне, он не будет выходить на передний план при активизации.</span>
                                </li>
                                <li>
                                    <Option key={1} optionName={'autosize'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Установить автоматический размер блока (подстаивается под размер содержимого). Не подходит для блоков, содержащих только фоновый цвет.</span>
                                </li>
                                <li>
                                    <Option key={2} optionName={'back'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Отправить блок на задний план, чтобы он не закрывал собой другие блоки.</span>
                                </li>
                                <li>
                                    <Option key={3} optionName={'copy'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Копировать блок.</span>
                                </li>
                                <li>
                                    <Option key={4} optionName={'link'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Прикрепить к блоку ссылку на сторонний ресурс(емэйл,соц.сети, месенджеры)</span>
                                </li>
                                <li>
                                    <Option key={5} optionName={'save'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Сохранить блок в списке собственных шаблонов.</span>
                                </li>
                            </ul>
                            <h2>Действия с несколькими блоками.</h2>
                            <p>С помощью мышки и зажатой клавиши Ctrl можно выделить несколько блоков. Первый выделенный блок будет выделен<span style={{color: '#a14141'}}>отдельным цветом</span> от остальных. Варианты действий с несколькими блоками:</p>
                            <ul>
                                <li>
                                    <Option key={0} optionName={'alignTop'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Выровнять блоки по верхнему краю относительно первого выделенного блока.</span>
                                </li>
                                <li>
                                    <Option key={1} optionName={'alignBottom'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Выровнять блоки по нижнему краю относительно первого выделенного блока.</span>
                                </li>
                                <li>
                                    <Option key={2} optionName={'alignLeft'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Выровнять блоки по левому краю относительно первого выделенного блока.</span>
                                </li>
                                <li>
                                    <Option key={3} optionName={'alignRight'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Выровнять блоки по правому краю относительно первого выделенного блока.</span>
                                </li>
                                <li>
                                    <Option key={4} optionName={'alignVertical'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Выровнять блоки по вертикали (чтобы их вертикальные центры находилились на одном уровне).</span>
                                </li>
                                <li>
                                    <Option key={5} optionName={'alignHorisontal'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Выровнять блоки по горизонтали (чтобы их горизонтальные центры находилились на одном уровне).</span>
                                </li>
                                <li>
                                    <Option key={6} optionName={'distributeVertical'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Распределить блоки по вертикали равномерно. При этом самый верхний и самый нижний блоки останутся на своих местах.</span>
                                </li>
                                <li>
                                    <Option key={7} optionName={'distributeHorisontal'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Распределить блоки по горизонтали равномерно. При этом самый левый и самый правый блоки останутся на своих местах.</span>
                                </li>
                                <li>
                                    <Option key={8} optionName={'alignWidth'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Установить одинаковую ширину блоков (такую, как у первого выделенного блока).</span>
                                </li>
                                <li>
                                    <Option key={9} optionName={'alignHeight'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Установить одинаковую высоту блоков (такую, как у первого выделенного блока).</span>
                                </li>
                                <li>
                                    <Option key={10} optionName={'group'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Сгруппировать блоки в один. Чтобы потом перемещать/копировать вместе или сохранить в шаблоны.</span>
                                </li>
                                <li>
                                    <Option key={11} optionName={'ungroup'} cbOnChange={() => {return true;}}/>
                                    <span>-</span>
                                    <span>Разгруппировать блок-группу.</span>
                                </li>
                            </ul>
                            <h2>Сохранение/восстановление</h2>
                            <span>Сохранить документ на компьтере можно через кнопку меню приложения 'Save'.
                                Документ сохраняется в спец.формате (json) и его потом можно будет открыть для дальнейшего редактирования через меню 'Load'.</span>
                            <h2>Ссылка/печать</h2>
                            <span>В режиме просмотра (меню 'Show') можно создать постоянную ссылку ('Create link')на документ, которая сохранится в базе приложения и будет доступна в интернете.
                                Ссылку можно обновить, если необходимо ('Update link') и просмотреть текущую версию ('Open link').
                                В режиме просмотра для печати ('View for print' ) можно распечатать документ на принтер или в PDF(станд.сервис Google Chrome). </span>
                        </div>
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default CvSettings;
