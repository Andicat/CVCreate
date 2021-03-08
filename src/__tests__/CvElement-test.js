"use strict";

import {renderComponentWithStore, storeEmpty} from './utils-test';
import {cvElement_activate, cvElement_textUpdate} from '../redux/cvDataAC';

import CvElement from '../components/CvElement';

let component;

let propEditable = {editable:false};
let propId = {id:'1'};
let propBlockId = {blockId:1};
let propActiveElementId = {activeElementId:null};
let textStyleDefault = {font:'Roboto', color:'#000000', fontsize:'16', bold:false, italic:false, center:false, uppercase:false, underline:false, padding:{left:1,right:0,top:0,bottom:0}};

let propDataEmpty = {data: {}};
let propDataImage = {data: {type:'image', style:{file:'', opacity:1, borderRadius:'50%', bordercolor: '#E05B49', borderwidth: '3', borderStyle: 'solid'}}};
let propDataText = {data: {type:'text', text:'Text with background', style:{bgcolor:'#8e9fa0',...textStyleDefault, fontsize:'14'}}};
let propDataTextBlock = {data: {type:'group', elements:[
                                {type:'text', text:'Your position', style:{...textStyleDefault, fontsize:'18', bold:true}},
                                {type:'text', text:'Company', style:{...textStyleDefault, fontsize:'18'}},
                                {type:'text', text:'period', style:{...textStyleDefault,italic:true}},
                                {type:'text', text:'your competencies and results', style:{...textStyleDefault}}]}};
let propDataColorBlock = {data: {type:'figure', style:{bgcolor:'#6AABB5', opacity:1, borderRadius:'50%'}}};
let propDataDots = {data: {type:'dots-row', style:{maincolor:'#E05B49', addcolor:'#E6E6E6', radius:10, maincount:5, addcount: 3}}};
let propDataProgress = {data: {type:'progress', style:{maincolor:'#E05B49', addcolor:'#E6E6E6', progress:50}}};

let props;

describe('CvElement render', () => {

    it('Рендер без данных', () => {
        props = {...propEditable, ...propId, ...propBlockId, ...propDataEmpty, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер картинки', () => {
        props = {...propEditable, ...propId, ...propBlockId, ...propDataImage, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер текст', () => {
        props = {...propEditable, ...propId, ...propBlockId, ...propDataText, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер текстового блока', () => {
        props = {...propEditable, ...propId, ...propBlockId, ...propDataTextBlock, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер цветного блока', () => {
        props = {...propEditable, ...propId, ...propBlockId, ...propDataColorBlock, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер блока с кружочками', () => {
        props = {...propEditable, ...propId, ...propBlockId, ...propDataDots, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер блока прогресса', () => {
        props = {...propEditable, ...propId, ...propBlockId, ...propDataProgress, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер текста с возможностью правки', () => {
        props = {editable:true, ...propId, ...propBlockId, ...propDataText, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('Рендер активного элемента', () => {
        props = {...propEditable, ...propId, ...propBlockId, ...propDataText, activeElementId:'1'};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        expect(component.toJSON()).toMatchSnapshot();
    });
});

describe('CvElement actions', () => {

    it('Activate', () => {
        storeEmpty.clearActions();
        props = {editable:true, ...propId, ...propBlockId, ...propDataText, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        let elem = component.root.find( el => el.type=='span');
        //клик по текстовому элементу
        elem.props.onClick();
        const expectedActions = [
            cvElement_activate(propDataText.data.style,propId.id),
        ];
        expect(storeEmpty.getActions()).toEqual(expectedActions);
    });

    it('Change text', () => {
        storeEmpty.clearActions();
        props = {editable:true, ...propId, ...propBlockId, ...propDataText, ...propActiveElementId};
        component = renderComponentWithStore(CvElement,storeEmpty,props);
        let elem = component.root.find( el => el.type=='span');
        //изменение текста в элементе
        const evt = {"target":{"innerText":'test'}};
        elem.props.onBlur(evt);
        const expectedActions = [
            cvElement_textUpdate(propBlockId.blockId,evt.target.innerText),
        ];
        expect(storeEmpty.getActions()).toEqual(expectedActions);
    });
});
