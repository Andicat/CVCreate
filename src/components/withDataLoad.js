import React from 'react';
import {connect} from 'react-redux';
import {cv_init} from '../redux/cvDataAC';
import imageUrl from '../img/image.svg';
import {loadFromLocalStorage} from '../modules/utils';

import Loader from './Loader';
import {Transition} from "react-transition-group";
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';

let firebaseConfig = {
    apiKey: 'AIzaSyAq9TFZvy9lyxxV3vrJXGXT5M_Ivwf7-RY',
    authDomain: 'creacv-a2bd7.firebaseapp.com',
    projectId: 'creacv-a2bd7',
    storageBucket: 'creacv-a2bd7.appspot.com',
    messagingSenderId: '1093581926352',
    appId: '1:1093581926352:web:7d1b8619531df14b8253d5',
    measurementId: 'G-08QQHJN47T'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

//save doc in firebase
function saveFirebase(collectionName,docName,data) {
    db.collection(collectionName).doc(docName).set(data);
}

//add data in doc in firebase
async function addFirebase(collectionName,docName,data) {
    db.collection(collectionName).doc(docName).get().then((doc) => {
        if (doc.exists) {
            db.collection(collectionName).doc(docName).set({[data]: true}, { merge: true });
        }
    });
}

//load from firebase
async function loadFirebase(collectionName,docName,resolve) {
    db.collection(collectionName).doc(docName).get().then((doc) => {
        if (doc.exists) {
            resolve(doc.data());
        } else {
            resolve(false);
        }
    });
}

let withDataLoad = (propName) => Component => {

    class ComponentWithDataLoad extends React.PureComponent {

        componentDidMount() {
            this.loadData();
        }

        state = {
            dataReady: false,
            combinedProps: null,
        };
        
        loadData = async () => {
            let user;
            let link;
            let blocks = [];
            let style;
            let templatesData = {};
            let templatesUser = [];
            
            //local storage
            var loadLS= new Promise( (resolve) => {
                var lsData = loadFromLocalStorage('CV');
                resolve(lsData);
            });
            await loadLS.then((data) => {
                if (data) {
                    blocks = data.blocks;
                    style = data.style;
                    user = data.user;
                    link = data.link;
                } 
            });

            //templates
            let loadTemplates = new Promise((resolve) => {
                loadFirebase('Data','templates',resolve);
            });
            await loadTemplates.then((data) => {
                if (data) {
                    templatesData.templates = data.templates;
                    templatesData.image = imageUrl;
                   
                }
            });

            //user templates
            if (user) {
                let loadUserTemplates = new Promise((resolve) => {
                    loadFirebase('Templates',user,resolve);
                });
                await loadUserTemplates.then((data) => {
                    if (data) {
                        templatesUser = data.templates;  
                    }
                });
            }
            this.props.dispatch(cv_init(blocks,style,user,link,templatesData,templatesUser));
            setTimeout( () => this.setState({dataReady:true,combinedProps:{...this.props,[propName]:''}}), 500);
        }

        render() {
            if (!this.state.dataReady) {
                return <Transition in={true} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
                    {stateName => {
                        return <Loader transitionClass={stateName} text={'Loading'}/>
                    }}
                </Transition>;
            }
            return <Component {...this.state.combinedProps} /> ;
        } 
    }
    return connect()(ComponentWithDataLoad);
}

export { withDataLoad, saveFirebase, loadFirebase, addFirebase};
