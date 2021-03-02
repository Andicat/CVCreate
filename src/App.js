import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import PagesRouter from './pages/PagesRouter';

import combinedReducer from './redux/reducers.js';

import './sass/style.scss';

let config = {
    key: 'root',
    storage: storage,
}

let configureReducer = persistReducer(config, combinedReducer)

let store = createStore(configureReducer);


function App() {

    return (
        <BrowserRouter>
            <Provider store={store}>
                <PagesRouter/>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
