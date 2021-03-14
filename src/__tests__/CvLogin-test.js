

import {renderComponentWithStore, storeEmpty} from './utils-test';
import {cv_setUser} from '../redux/cvDataAC';

import CvLogin from '../components/CvLogin';

let component;

describe('CvLogin render', () => {

    it('Рендер без данных', () => {
        component = renderComponentWithStore(CvLogin,storeEmpty);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('CvLogin actions', () => {

    it('onChange', () => {
        component = renderComponentWithStore(CvLogin,storeEmpty);
        let input = component.root.find( el => el.type==='input');
        //изменение текста в элементе
        const evt = {'target': {'value': 'test'}};
        input.props.onChange(evt);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('onSubmit', () => {
        storeEmpty.clearActions();
        component = renderComponentWithStore(CvLogin,storeEmpty);
        let input = component.root.find( el => el.type==='input');
        //изменение текста
        const evtInput = {'target': {'value': 'test'}};
        input.props.onChange(evtInput);

        let form = component.root.find( el => el.type==='form');
        //отправка формы
        const evtForm = new Event('submit');
        form.props.onSubmit(evtForm);
        const expectedActions = [
            cv_setUser('test'),
        ];
        expect(storeEmpty.getActions()).toEqual(expectedActions);
    });
});
