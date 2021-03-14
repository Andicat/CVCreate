

import {renderComponentWithStore, storeEmpty} from './utils-test';
import {cvBlock_activate} from '../redux/cvDataAC';

import CvBlock from '../components/CvBlock';

let component;

let propEditable = {editable: false};
let propActiveIndex = {activeIndex: 1};
let propId = {id: 1};
let propData = {data: {'style': {'s00_font': 'Roboto','s08_padding': {'bottom': 0,'left': 1,'right': 0,'top': 0},'s03_bold': true,'s04_italic': false,'s05_center': false,'s01_color': '#1bac38','s06_uppercase': false,'s07_underline': false,'s02_fontsize': '40'},'type': 'text','text': 'Big text','width': 149,'height': 66,'positionTop': 52.08598862935976,'positionLeft': 290.08598862935975,'id': 2}};
let propActiveElementId = {activeElementId: null};

let props;

describe('CvBlock render', () => {

    it('Рендер блока', () => {
        props = {...propId,...propEditable, ...propActiveIndex, ...propData,...propActiveElementId};
        component = renderComponentWithStore(CvBlock,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('CvBlock actions', () => {

    it('Activate block', () => {
        props = {...propId,...propEditable, ...propActiveIndex, ...propData,...propActiveElementId};
        component = renderComponentWithStore(CvBlock,storeEmpty,props);
        let block = component.root.find( el => String(el.props.className).indexOf('cv__block',0)!==-1);
        const evt = {'ctrlKey': false,'shiftKey': false,'currentTarget': block,'target': {getAttribute: ()=>{return false;},}};
        block.props.onClick(evt);
        const expectedActions = [
            cvBlock_activate(propId.id, block, false),
        ];
        expect(storeEmpty.getActions()).toEqual(expectedActions);
    });
});
