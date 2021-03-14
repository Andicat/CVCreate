

import {renderComponentWithStore, storeEmpty, storeWithData} from './utils-test';

import CvDocument from '../components/CvDocument';

let component;

describe('CvDocument render', () => {

    it('Рендер без данных', () => {
        component = renderComponentWithStore(CvDocument,storeEmpty,);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер с данными', () => {
        component = renderComponentWithStore(CvDocument,storeWithData);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер с активным блоком', () => {
        let props = {activeBlock: {'style': {'s00_font': 'Roboto','s08_padding': {'bottom': 0,'left': 1,'right': 0,'top': 0},'s03_bold': true,'s04_italic': false,'s05_center': false,'s01_color': '#1bac38','s06_uppercase': false,'s07_underline': false,'s02_fontsize': '40'},'type': 'text','text': 'Big text','width': 149,'height': 66,'positionTop': 52.08598862935976,'positionLeft': 290.08598862935975,'id': 2}};
        component = renderComponentWithStore(CvDocument,storeWithData,props);
        let blockCv = component.root.find( el => el.props.className==='cv');
        const evt = {'currentTarget': blockCv};
        blockCv.props.onClick(evt);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
