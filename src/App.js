import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';

import PagesRouter from './pages/PagesRouter';

import combinedReducer from './redux/reducers.js';
import {withDataLoad} from './components/withDataLoad';

import './sass/style.scss';

let store = createStore(combinedReducer);

function App() {

    let PagesRouterWithData = withDataLoad()(PagesRouter);

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Provider store={store}>
                <PagesRouterWithData/>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
