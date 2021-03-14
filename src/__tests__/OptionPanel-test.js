

import {renderComponentWithStore, storeWithData} from './utils-test';
import {cvStyle_update,cvBlock_lock} from '../redux/cvDataAC';

import OptionPanel from '../components/OptionPanel';

let component;

let props = {activeBlockOptions: {id: 4, lock: false, link: '', group: false,}};

describe('OptionPanel render&actions', () => {

    it('Изменение цвета текста', () => {
        storeWithData.clearActions();
        component = renderComponentWithStore(OptionPanel,storeWithData,props);
        expect(component.toJSON()).toMatchSnapshot();
        let optionColor = component.root.find( el => el.props.className==='option__color');
        const evt = {'target': {'value': '#666'}};
        optionColor.props.onChange(evt);
        const expectedActions = [
            cvStyle_update(props.activeBlockOptions.id,'s01_color','#666'),
        ];
        expect(storeWithData.getActions()).toEqual(expectedActions);
    });

    it('Блокирование расположения блока', () => {
        storeWithData.clearActions();
        component = renderComponentWithStore(OptionPanel,storeWithData,props);
        expect(component.toJSON()).toMatchSnapshot();
        let optionLock = component.root.find( el => el.props.className==='option__checkbox option__checkbox--lock');
        const evt = {'target': {'checked': true}};
        optionLock.props.onChange(evt);
        const expectedActions = [
            cvBlock_lock(props.activeBlockOptions.id),
        ];
        expect(storeWithData.getActions()).toEqual(expectedActions);

    });
});
