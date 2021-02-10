import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import combinedReducer from './redux/reducers.js';
import Tools from './components/Tools';
import Panel from './components/Panel';
import CV from './components/CV';

let blocksArr = [
    {name: 'Image', type:'image', style:{width:'100px'}},
    {name: 'Text', type:'text', text:'Your text here', style:{fontsize:'14px'}},
    {name: 'Text with header', type:'group', elements:[
            {type:'text', text:'Your header', style:{fontsize:'24px',fontWeight:'600'}},
            {type:'text', text:'your text', style:{fontsize:'14px'}}
        ]},
    {name: 'Figure', type:'figure', style:{backgroundColor:'#E05B49',width:'100px',height:'100px'}},
    {name: 'Skill', type:'group', direction:'row', elements:[
        {type:'text', text:'your skill', style:{fontsize:'18px', color:'black', marginRight: '15px'}},
        {type:'group', direction:'row', elements:[
            {type:'figure', style:{backgroundColor:'#E05B49',width:'10px',height:'10px', borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{backgroundColor:'#E05B49',width:'10px',height:'10px', borderRadius:'50%', marginRight: '5px'}},
            {type:'figure', style:{backgroundColor:'#E05B49',width:'10px',height:'10px', borderRadius:'50%', marginRight: '5px'}}
        ]},
    ]},
];

let store=createStore(combinedReducer);

function App() {
    return (
        <Provider store={store}>
            <React.Fragment>
                <header>Create your CV</header>
                <main>
                    <Panel blocks={blocksArr}/>
                    <CV/>

                </main>
                
                
                
            </React.Fragment>
        </Provider>
    );
}

export default App;
