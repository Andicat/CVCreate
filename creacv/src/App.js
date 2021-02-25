import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import CV from './components/CV';

import combinedReducer from './redux/reducers.js';

import './sass/style.scss';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/database';


var firebaseConfig = {
    apiKey: "AIzaSyAq9TFZvy9lyxxV3vrJXGXT5M_Ivwf7-RY",
    authDomain: "creacv-a2bd7.firebaseapp.com",
    projectId: "creacv-a2bd7",
    storageBucket: "creacv-a2bd7.appspot.com",
    messagingSenderId: "1093581926352",
    appId: "1:1093581926352:web:7d1b8619531df14b8253d5",
    measurementId: "G-08QQHJN47T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


let store = createStore(combinedReducer);

function App() {

    return (
        <Provider store={store}>
            <CV/>
        </Provider>
    );
}

export {App, db};
