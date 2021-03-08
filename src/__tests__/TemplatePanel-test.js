"use strict";

import {renderComponentWithStore, storeWithData} from './utils-test';
import {cvBlock_add} from '../redux/cvDataAC';

import TemplatePanel from '../components/TemplatePanel';

let component;

describe('TemplatePanel render', () => {

    it('Mеню шаблонов', () => {
        component = renderComponentWithStore(TemplatePanel,storeWithData);
        expect(component.toJSON()).toMatchSnapshot();
        //откроем группу шаблонов
        let templateGroup = component.root.findAll( el => el.props.className=='template-panel__group-name')[0];
        templateGroup.props.onClick();
    });

    it('Mеню шаблонов - Открытие группы', () => {
        component = renderComponentWithStore(TemplatePanel,storeWithData);
        let templateGroup = component.root.findAll( el => el.props.className=='template-panel__group-name')[0];
        templateGroup.props.onClick();
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('TemplatePanel actions', () => {

    it('Добавление шаблона на страницу', () => {
        storeWithData.clearActions();
        component = renderComponentWithStore(TemplatePanel,storeWithData);
        let templateGroup = component.root.findAll( el => el.props.className=='template-panel__group-name')[0];
        templateGroup.props.onClick();
        let templateAdd = component.root.findAll( el => el.props.className=='template-panel__block-add')[0];
        const evt = {"target":{"previousSibling":document.createElement('div')}};
        templateAdd.props.onClick(evt);
        const expectedActions = [
            cvBlock_add({...storeWithData.getState().cvData.templates[0].elements[0],width:0,height:0}),
        ];
        expect(storeWithData.getActions()).toEqual(expectedActions);
    });
});
