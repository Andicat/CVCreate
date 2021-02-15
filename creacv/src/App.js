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

let textSimpleArr = [
    {type:'text', text:'Large text', style:{fontsize:'24', bold:false, color:'#000000'}},
    {type:'text', text:'Medium text', style:{fontsize:'16', bold:false, color:'#000000'}},
    {type:'text', text:'Small text', style:{fontsize:'12', bold:false, color:'#000000'}},
];

let textBlockArr = [
    {type:'group', elements:[
        {type:'text', text:'Your header', style:{fontsize:20, bold:true, color:'#000000'}},
        {type:'text', text:'your text', style:{fontsize:16, color:'#000000'}}
    ]},
    {type:'group', elements:[
        {type:'text', text:'Your header', style:{fontsize:24, bold:true, color:'#000000'}},
        {type:'text', text:'your text', style:{fontsize:18, color:'#000000'}}
    ]},
];

let figuresArr = [
    {type:'figure', style:{bgcolor:'#E05B49'}},
    {type:'figure', style:{bgcolor:'#E05B49', borderRadius:'50%'}},
];

let skillsArr = [
    {type:'group', direction:'row', elements:[
        {type:'text', text:'your skill', style:{fontsize:18, color:'#000000', marginRight: '15px'}},
        {type:'group', direction:'row', elements:[
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}}
        ]},
    ]},
    {type:'group', direction:'row', elements:[
        {type:'text', text:'your skill', style:{fontsize:18, color:'#000000', marginRight: '15px'}},
        {type:'group', direction:'row', style:{color:'#000000'}, elements:[
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{bgcolor:'#E05B49', width:10, height:10, borderRadius:'50%', marginRight: '5px'}}
        ]},
    ]},
];

let templatesArr = [
    {name: 'Images', elements:imagesArr},
    {name: 'Simple Text', elements:textSimpleArr},
    {name: 'Block Text', elements:textBlockArr},
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
