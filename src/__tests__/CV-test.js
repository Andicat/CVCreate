"use strict";

import {renderComponentWithStore, storeEmpty, storeWithData} from './utils-test';

import CV from '../components/CV';

let component;

describe('CV render', () => {

    it('Рендер без данных', () => {
        component = renderComponentWithStore(CV,storeEmpty,);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер с данными', () => {
        component = renderComponentWithStore(CV,storeWithData);
        expect(component.toJSON()).toMatchSnapshot();
        //Открытие панели шаблонов
        const panelButton = component.root.find(el => el.props.className=='template-panel__button-hide');
        panelButton.props.onClick();
        expect(component.toJSON()).toMatchSnapshot();
    });
});
