import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combinedReducer from './redux/reducers.js';
import Tools from './components/Tools';
import PanelBlocks from './components/PanelBlocks';
import CvContainer from './components/CvContainer';

let blocksArr = [
    {type:'image', src:'', style:{width:'100px', height:'100px', backgroundColor:'blue'}},
    {type:'text', text:'text simple', style:{fontsize:'12px',color:'black'}},
    {type:'group', elements:[
            {type:'text', text:'header', style:{fontsize:'18px',color:'red'}},
            {type:'text', text:'text color', style:{fontsize:'12px',color:'blue'}},
            {type:'text', text:'text simple', style:{fontsize:'12px',color:'black'}}
        ]},
    {type:'figure', style:{backgroundColor:'orange',width:'200px',height:'150px'}},
    {type:'group', elements:[
        {type:'text', text:'skill', style:{fontsize:'18px', fontWeight:'600', color:'black'}},
        {type:'group', elements:[
            {type:'figure', style:{backgroundColor:'orange',width:'10px',height:'10px', borderRadius:'50%'}},
            {type:'figure', style:{backgroundColor:'orange',width:'10px',height:'10px', borderRadius:'50%'}},
            {type:'figure', style:{backgroundColor:'orange',width:'10px',height:'10px', borderRadius:'50%'}}
        ]},
    ]},
];

let store=createStore(combinedReducer);

function App() {
    return (
        <Provider store={store}>
            <div>
                <Tools/>
                <PanelBlocks blocks={blocksArr}/>
                <CvContainer/>
            </div>
        </Provider>
    );
}

export default App;
