"use strict";

import {renderComponentWithStore, storeEmpty} from './utils-test';

import Option from '../components/Option';

let component;

let props = {blockId:2,cbOnChange:()=> true};

describe('Option render', () => {

    it('Цвет', () => {
        component = renderComponentWithStore(Option,storeEmpty,{...props,optionName:'color',optionValue:'#666'});
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Число', () => {
        component = renderComponentWithStore(Option,storeEmpty,{...props,optionName:'fontsize',optionValue:'18'});
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Кнопка', () => {
        component = renderComponentWithStore(Option,storeEmpty,{...props,optionName:'copy',optionValue:null});
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Чекбокс', () => {
        component = renderComponentWithStore(Option,storeEmpty,{...props,optionName:'bold',optionValue:true});
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Диапазон', () => {
        component = renderComponentWithStore(Option,storeEmpty,{...props,optionName:'opacity',optionValue:0.5});
        expect(component.toJSON()).toMatchSnapshot();
        let option = component.root.find( el => el.props.className=='option');
        option.props.onClick();
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Ссылка', () => {
        component = renderComponentWithStore(Option,storeEmpty,{...props,optionName:'file',optionValue:null});
        expect(component.toJSON()).toMatchSnapshot();
        let option = component.root.find( el => el.props.className=='option');
        option.props.onClick();
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Список', () => {
        component = renderComponentWithStore(Option,storeEmpty,{...props,optionName:'font',optionValue:null});
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('Option action', () => {

    it('Подсказка', () => {
        component = renderComponentWithStore(Option,storeEmpty,{...props,optionName:'color',optionValue:'#666'});
        let option = component.root.find( el => el.props.className=='option');
        const evt = {'target':{getAttribute:()=>{return true},}};
        option.props.onMouseOver(evt);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
