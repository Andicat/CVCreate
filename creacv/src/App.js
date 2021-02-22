import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import combinedReducer from './redux/reducers.js';
import Panel from './components/Panel';
import CV from './components/CV';

let store = createStore(combinedReducer);

function App() {

    let imagesArr = [
        {type:'image', style:{file:'', opacity:1}},
        {type:'image', style:{file:'', opacity:1, borderRadius:'50%'}},
        {type:'image', style:{file:'', opacity:1, bordercolor: '#E05B49', borderwidth: '3', borderStyle: 'solid'}},
        {type:'image', style:{file:'', opacity:1, borderRadius:'50%', bordercolor: '#E05B49', borderwidth: '3', borderStyle: 'solid'}},
    ];

    let textStyleDefault = {fontsize:'16', bold:false, italic:false, center:false, uppercase:false, color:'#000000', padding:0};
    
    let textSimpleArr = [
        {type:'text', text:'Text with background', style:{bgcolor:'#E05B49',...textStyleDefault, fontsize:'20'}},
        {type:'text', text:'Text simple', style:{...textStyleDefault, fontsize: '20'}},
        {type:'text', text:'Small text', style:{...textStyleDefault, fontsize:'12'}},
    ];
    
    let textBlockArr = [
        {type:'group', elements:[
            {type:'text', text:'Your header', style:{...textStyleDefault, fontsize:'20', bold:true}},
            {type:'text', text:'your text', style:{...textStyleDefault}}
        ]},
        {type:'group', elements:[
            {type:'text', text:'Your header', style:{...textStyleDefault, fontsize:'24', bold:true}},
            {type:'text', text:'your text', style:{...textStyleDefault, fontsize:'18'}}
        ]},
    ];
    
    let expBlockArr = [
        {type:'group', elements:[
            {type:'text', text:'Your position', style:{...textStyleDefault, fontsize:'18', bold:true}},
            {type:'text', text:'Company', style:{...textStyleDefault, fontsize:'18'}},
            {type:'text', text:'period', style:{...textStyleDefault,italic:true}},
            {type:'text', text:'your competencies and results', style:{...textStyleDefault}}
        ]},
    ];
    
    let figuresArr = [
        {type:'figure', style:{bgcolor:'#E05B49', opacity:1}},
        {type:'figure', style:{bgcolor:'#6AABB5', opacity:1, borderRadius:'50%'}},
    ];
    
    let skillsArr = [
        {type:'group', direction:'row', elements:[
            {type:'text', text:'skill in dots', style:{...textStyleDefault}},
            {type:'dots-row', style:{bgcolor:'#E05B49', radius:10, count:3}},
            {type:'dots-row', style:{bgcolor:'#E6E6E6', radius:10, count:2}},
        ]},
        {type:'group', direction:'row', elements:[
            {type:'text', text:'skill in dots', style:{...textStyleDefault}},
            {type:'dots-row', style:{bgcolor:'#E05B49', radius:10, count:3}},
        ]},
        {type:'group', direction:'column', elements:[
            {type:'text', text:'skill in progress', style:{...textStyleDefault}},
            {type:'figure', style:{bgcolor:'#E05B49', height:'7px', width:'100'}},
        ]},
    ];
    
    let templatesArr = [
        {name: 'Images', elements:imagesArr},
        {name: 'Simple Text', elements:textSimpleArr},
        {name: 'Header with text', elements:textBlockArr},
        {name: 'Work experience', elements:expBlockArr},
        {name: 'Figures', elements:figuresArr},
        {name: 'Skills', elements:skillsArr},
    ];
    
    return (
        <Provider store={store}>
            <React.Fragment>
                <header>Create your CV</header>
                <main>
                    <Panel groups={templatesArr}/>
                    <CV/>
                </main>
            </React.Fragment>
        </Provider>
    );
}

export default App;
