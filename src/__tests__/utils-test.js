"use strict"

import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import {decodeStyle} from '../modules/utils';

const mockStore = configureStore();

jest.spyOn(document.body, 'appendChild');
jest.spyOn(document.body, 'removeChild');

let storeEmpty = mockStore({
    cvData: {
        user: null,
        link: null,
        stylePage: {bgcolor:'#ffffff'},
        blocks: [],
        activeBlockDOM: null,
        activeBlocksId: [],
        activeElementId: null,
        styleToEdit: {},
        showPanel: true,
        newBlock: false,
        templates: [],
        templatesUser: [],
        templateImageUrl: null,
    },
});

let storeWithData = mockStore({
    cvData: {
        user:'test',
        blocks:[
            {"style":{"s00_font":"Roboto","s08_padding":{"bottom":0,"left":1,"right":0,"top":0},"s03_bold":true,"s04_italic":false,"s05_center":false,"s01_color":"#1bac38","s06_uppercase":false,"s07_underline":false,"s02_fontsize":"40"},"type":"text","text":"Big text","width":149,"height":66,"positionTop":52.08598862935976,"positionLeft":290.08598862935975,"id":2},
            {"style":{"s01_opacity":1,"s00_file":""},"type":"image","width":182,"height":142,"positionTop":44.43650934333691,"positionLeft":60.43650934333691,"id":3},
            {"elements":[{"type":"text","text":"Your header","style":{"s06_uppercase":false,"s08_padding":{"top":0,"right":0,"left":1,"bottom":0},"s01_color":"#000000","s04_italic":false,"s05_center":false,"s03_bold":true,"s07_underline":false,"s02_fontsize":"20","s00_font":"Roboto"},"id":"4-0"},{"type":"text","text":"your text","style":{"s06_uppercase":false,"s05_center":false,"s08_padding":{"left":1,"top":0,"right":0,"bottom":0},"s01_color":"#000000","s00_font":"Roboto","s03_bold":false,"s02_fontsize":"16","s07_underline":false,"s04_italic":false},"id":"4-1"}],"type":"group","width":119,"height":62,"positionTop":142.173880178947,"positionLeft":303.173880178947,"id":4},
            {"type":"dots-row","style":{"s01_addcolor":"#E6E6E6","s04_addcount":3,"s00_maincolor":"#E05B49","s02_radius":10,"s03_maincount":5},"width":179,"height":50,"positionTop":248.88890908532193,"positionLeft":72.88890908532193,"id":5},
            {"style":{"s01_opacity":1,"s02_borderRadius":"50%","s00_bgcolor":"#6AABB5"},"type":"figure","width":171,"height":161,"positionTop":238.66776857728195,"positionLeft":322.66776857728195,"id":6},
            {"elements":[{"text":"Your position","style":{"s07_underline":false,"s06_uppercase":false,"s05_center":false,"s02_fontsize":"18","s03_bold":true,"s08_padding":{"bottom":0,"left":1,"right":0,"top":0},"s04_italic":false,"s01_color":"#000000","s00_font":"Roboto"},"type":"text","id":"7-0"},{"text":"Company","type":"text","style":{"s03_bold":false,"s07_underline":false,"s08_padding":{"top":0,"left":1,"bottom":0,"right":0},"s05_center":false,"s04_italic":false,"s06_uppercase":false,"s01_color":"#000000","s02_fontsize":"18","s00_font":"Roboto"},"id":"7-1"},{"style":{"s01_color":"#000000","s07_underline":false,"s06_uppercase":false,"s04_italic":true,"s02_fontsize":"16","s08_padding":{"top":0,"left":1,"bottom":0,"right":0},"s00_font":"Roboto","s05_center":false,"s03_bold":false},"type":"text","text":"period","id":"7-2"},{"type":"text","text":"your competencies and results","style":{"s03_bold":false,"s02_fontsize":"16","s01_color":"#000000","s08_padding":{"bottom":0,"top":0,"right":0,"left":1},"s05_center":false,"s07_underline":false,"s04_italic":false,"s00_font":"Roboto","s06_uppercase":false},"id":"7-3"}],"type":"group","width":252,"height":111,"positionTop":92.93198415890942,"positionLeft":487.9319841589094,"id":7}],
        activeBlocksId:[4],
        activeElementId:"4-0",
        stylePage:{bgcolor: '#ffffff'},
        styleToEdit:{"s06_uppercase":false,"s08_padding":{"top":0,"right":0,"left":1,"bottom":0},"s01_color":"#000000","s04_italic":false,"s05_center":false,"s03_bold":true,"s07_underline":false,"s02_fontsize":"20","s00_font":"Roboto"},
        templates: [{"name":"Image","elements":[{"type":"image","style":{"s00_file":"","s01_opacity":1}},{"style":{"s00_file":"","s01_opacity":1,"s02_borderRadius":"50%"},"type":"image"},{"type":"image","style":{"s03_borderwidth":"3","s00_file":"","s04_borderStyle":"solid","s02_bordercolor":"#E05B49","s01_opacity":1}},{"style":{"s03_bordercolor":"#E05B49","s05_borderStyle":"solid","s04_borderwidth":"3","s01_opacity":1,"s02_borderRadius":"50%","s00_file":""},"type":"image"}]},
                    {"name":"Text","elements":[{"type":"text","text":"Text simple","style":{"s05_center":false,"s06_uppercase":false,"s04_italic":false,"s00_font":"Roboto","s01_color":"#000000","s07_underline":false,"s08_padding":{"left":1,"top":0,"bottom":0,"right":0},"s03_bold":false,"s02_fontsize":"20"}},{"text":"Text with background","type":"text","style":{"s02_color":"#000000","s08_underline":false,"s01_font":"Roboto","s03_fontsize":"14","s00_bgcolor":"#8e9fa0","s05_italic":false,"s06_center":false,"s07_uppercase":false,"s09_padding":{"right":0,"left":1,"top":0,"bottom":0},"s04_bold":false}},{"text":"Big text","style":{"s04_italic":false,"s02_fontsize":"40","s00_font":"Roboto","s01_color":"#000000","s08_padding":{"bottom":0,"top":0,"right":0,"left":1},"s05_center":false,"s03_bold":true,"s07_underline":false,"s06_uppercase":false},"type":"text"},{"elements":[{"type":"text","text":"Your header","style":{"s01_color":"#000000","s04_italic":false,"s03_bold":true,"s00_font":"Roboto","s05_center":false,"s07_underline":false,"s06_uppercase":false,"s02_fontsize":"20","s08_padding":{"right":0,"top":0,"bottom":0,"left":1}}},{"style":{"s05_center":false,"s03_bold":false,"s00_font":"Roboto","s06_uppercase":false,"s07_underline":false,"s01_color":"#000000","s02_fontsize":"16","s04_italic":false,"s08_padding":{"left":1,"top":0,"bottom":0,"right":0}},"type":"text","text":"your text"}],"type":"group"}]},
                    {"name":"Info block","elements":[{"elements":[{"type":"text","style":{"s07_underline":false,"s08_padding":{"bottom":0,"right":0,"left":1,"top":0},"s01_color":"#000000","s05_center":false,"s04_italic":false,"s00_font":"Roboto","s02_fontsize":"18","s06_uppercase":false,"s03_bold":true},"text":"Your position"},{"style":{"s05_center":false,"s00_font":"Roboto","s04_italic":false,"s08_padding":{"bottom":0,"right":0,"top":0,"left":1},"s03_bold":false,"s06_uppercase":false,"s02_fontsize":"18","s07_underline":false,"s01_color":"#000000"},"type":"text","text":"Company"},{"text":"period","type":"text","style":{"s02_fontsize":"16","s07_underline":false,"s00_font":"Roboto","s04_italic":true,"s03_bold":false,"s05_center":false,"s06_uppercase":false,"s08_padding":{"right":0,"left":1,"bottom":0,"top":0},"s01_color":"#000000"}},{"text":"your competencies and results","style":{"s06_uppercase":false,"s02_fontsize":"16","s05_center":false,"s04_italic":false,"s08_padding":{"right":0,"left":1,"bottom":0,"top":0},"s03_bold":false,"s00_font":"Roboto","s07_underline":false,"s01_color":"#000000"},"type":"text"}],"type":"group"}]},
                    {"name":"Figure","elements":[{"style":{"s01_opacity":1,"s00_bgcolor":"#E05B49"},"type":"figure"},{"type":"figure","style":{"s00_bgcolor":"#6AABB5","s02_borderRadius":"50%","s01_opacity":1}}]},
                    {"name":"Progress","elements":[{"type":"dots-row","style":{"s02_radius":10,"s04_addcount":3,"s03_maincount":5,"s01_addcolor":"#E6E6E6","s00_maincolor":"#E05B49"}},{"type":"progress","style":{"s01_addcolor":"#E6E6E6","s00_maincolor":"#E05B49","s02_progress":50}}]}],
    },
});

let storeWithLink = mockStore({
    cvData: {
        user:'test',
        blocks:[{"style":{"s00_font":"Roboto","s08_padding":{"bottom":0,"left":1,"right":0,"top":0},"s03_bold":true,"s04_italic":false,"s05_center":false,"s01_color":"#1bac38","s06_uppercase":false,"s07_underline":false,"s02_fontsize":"40"},"type":"text","text":"Big text","width":149,"height":66,"positionTop":52.08598862935976,"positionLeft":290.08598862935975,"id":2}],
        activeBlocksId:[],
        stylePage: {bgcolor: '#ffffff'},
        templates: [],
        link: 'test',
    },
});

function renderComponentWithStore(Component, store, props) {
    window.matchMedia = jest.fn().mockImplementation(query => {
        return {
            matches: true,
            media: query === "(min-width: 768px)" ? true:false,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(), 
        };
    });
    let componentRendered = renderer.create(
        <BrowserRouter>
            <Provider store={store}>
                <Component {...props}/>
            </Provider>
        </BrowserRouter>
    );
    return componentRendered;
}

describe('Utils', () => {
    test('Декодирование свойств', () => {

        expect(decodeStyle('s000_font')).toBe('font');
        expect(decodeStyle('s006_opacity')).toBe('opacity');
        expect(decodeStyle('s010_bold')).toBe('bold');
        
    });  
});

export {renderComponentWithStore, storeEmpty, storeWithData, storeWithLink}