import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import combinedReducer from './redux/reducers.js';
import Panel from './components/Panel';
import CV from './components/CV';

let blocksArr = [
    {name: 'Image', type:'image', style:{width:100}},
    {name: 'Text', type:'text', text:'Your text here', style:{fontsize:'16',bold:true}},
    {name: 'Text with header', type:'group', elements:[
            {type:'text', text:'Your header', style:{fontsize:20,bold:'bold'}},
            {type:'text', text:'your text', style:{fontsize:16}}
        ]},
    {name: 'Figure', type:'figure', style:{bgcolor:'#E05B49',width:100,height:100}},
    {name: 'Skill', type:'group', direction:'row', elements:[
        {type:'text', text:'your skill', style:{fontsize:18, color:'#000000', marginRight: '15px'}},
        {type:'group', direction:'row', elements:[
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}}
        ]},
    ]},
];

let imagesArr = [
    {type:'image', style:{file:''}},
    {type:'image', style:{file:'', borderRadius:'50%'}},
    {type:'image', style:{file:'', border:'3px solid gray'}},
    {type:'image', style:{file:'', borderRadius:'50%', border:'3px solid gray'}},
];

let textStyleDefault = {fontsize:'16', bold:false, italic:false, center:false, uppercase:false, color:'#000000'};

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
    {type:'figure', style:{bgcolor:'#E05B49'}},
    {type:'figure', style:{bgcolor:'#E05B49', borderRadius:'50%'}},
];

let skillsArr = [
    {type:'group', direction:'row', elements:[
        {type:'text', text:'skill in dots', style:{...textStyleDefault}},
        {type:'dots-row', style:{bgcolor:'#E05B49', size:10, count:3}},
        {type:'dots-row', style:{bgcolor:'#E6E6E6', size:10, count:2}},
    ]},
    {type:'group', direction:'row', elements:[
        {type:'text', text:'skill in dots', style:{...textStyleDefault}},
        {type:'dots-row', style:{bgcolor:'#E05B49', size:10, count:3}},
    ]},
    {type:'group', direction:'column', elements:[
        {type:'text', text:'skill in progress', style:{...textStyleDefault}},
        {type:'figure', style:{bgcolor:'#E05B49', height:'7', width:'100'}},
    ]},
];

let templatesArr = [
    {name: 'Images', elements:imagesArr},
    {name: 'Simple Text', elements:textSimpleArr},
    {name: 'Header with text', elements:textBlockArr},
    {name: 'Work experience', elements:expBlockArr},
    {name: 'Figures', elements:figuresArr},
    {name: 'Skills', elements:skillsArr},
    /*{name: 'Text', type:'text', },
    {name: 'Text with header', 
    {name: 'Figure', },
    {name: 'Skill', type:'group', direction:'row', elements:[
        {type:'text', text:'your skill', style:{fontsize:18, color:'#000000', marginRight: '15px'}},
        {type:'group', direction:'row', elements:[
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}}
        ]},
    ]},*/
];

let store=createStore(combinedReducer);

function App() {
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
