"use strict";

import {renderComponentWithStore, storeEmpty, storeWithData, storeWithLink} from './utils-test';
import {cv_setLink} from '../redux/cvDataAC';

import CvView from '../components/CvView';

let component;

describe('CvView render', () => {

    it('Рендер без данных', () => {
        component = renderComponentWithStore(CvView,storeEmpty);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер с данными', () => {
        component = renderComponentWithStore(CvView,storeWithData);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер с уже существующей ссылкой', () => {
        component = renderComponentWithStore(CvView,storeWithLink);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер для печати', () => {
        component = renderComponentWithStore(CvView,storeWithData);
        let buttonPrint = component.root.find( el => el.props.className=='header__button header__button--print');
        buttonPrint.props.onClick();
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('CvView actions', () => {

    it('createLink', () => {
        component = renderComponentWithStore(CvView,storeWithData);
        let buttonLinkCreate = component.root.find( el => el.props.className=='header__button header__button--link-create');
        buttonLinkCreate.props.onClick();
        const expectedActions = [
            cv_setLink(storeWithData.getState().cvData.user),
        ];
        expect(storeWithData.getActions()).toEqual(expectedActions);
    });
});
