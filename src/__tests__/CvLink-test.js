

import {renderComponentWithStore, storeWithData} from './utils-test';

import CvLink from '../components/CvLink';

let component;

let props = {match: {params: {linkname: '111'}}};

describe('CvLink render', () => {

    it('Рендер', () => {
        component = renderComponentWithStore(CvLink,storeWithData,props);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

