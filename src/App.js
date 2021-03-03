import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';

import PagesRouter from './pages/PagesRouter';

import combinedReducer from './redux/reducers.js';

import './sass/style.scss';

let store = createStore(combinedReducer);


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
