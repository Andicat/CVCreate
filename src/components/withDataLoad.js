import React from 'react';
import {connect} from 'react-redux';
import {cv_init} from '../redux/cvDataAC';
import imageUrl from '../img/image.svg';
import {loadFromLocalStorage} from './utils';

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
    db.collection(collectionName).doc(docName).set(data)
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

//add in doc in firebase
async function addFirebase(collectionName,docName,data,resolve) {
    db.collection(collectionName).doc(docName).get().then((doc) => {
        if (doc.exists) {
            db.collection(collectionName).doc(docName).set({
                [data]: true
            }, { merge: true }).then(() => {
                resolve();
            });
        } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}

//load from firebase
async function loadFirebase(collectionName,docName,resolve) {
    db.collection(collectionName).doc(docName).get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
                resolve(doc.data());
            } else {
                resolve(false);
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
}

//временно!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function saveTemplates() {
    function createTemplates() {

        let textStyleDefault = {font:'Roboto', color:'#000000', fontsize:'16',
                                bold:false, italic:false, center:false,
                                uppercase:false, underline:false, padding:{left:1,right:0,top:0,bottom:0}};
    
        let imagesArr = [
            {type:'image', style:{file:'', opacity:1}},
            {type:'image', style:{file:'', opacity:1, borderRadius:'50%'}},
            {type:'image', style:{file:'', opacity:1, bordercolor: '#E05B49', borderwidth: '3', borderStyle: 'solid'}},
            {type:'image', style:{file:'', opacity:1, borderRadius:'50%', bordercolor: '#E05B49', borderwidth: '3', borderStyle: 'solid'}},
        ];
    
        let textArr = [
            {type:'text', text:'Text simple', style:{...textStyleDefault, fontsize: '20'}},
            {type:'text', text:'Text with background', style:{bgcolor:'#8e9fa0',...textStyleDefault, fontsize:'14'}},
            {type:'text', text:'Big text', style:{...textStyleDefault, fontsize: '40', bold:true}},
            {type:'group', elements:[
                {type:'text', text:'Your header', style:{...textStyleDefault, fontsize:'20', bold:true}},
                {type:'text', text:'your text', style:{...textStyleDefault}}
            ]},
        ];
        
        let textBlockArr = [
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
        
        let progressArr = [
            /*{type:'group', direction:'row', elements:[
                {type:'text', text:'skill in dots', style:{...textStyleDefault}},
                {type:'dots-row', style:{maincolor:'#E05B49', addcolor:'#E6E6E6', radius:10, maincount:3, addcount: 2}},
            ]},
            {type:'group', direction:'row', elements:[
                {type:'text', text:'skill in progress', style:{...textStyleDefault}},
                {type:'progress', style:{maincolor:'#E05B49', addcolor:'#E6E6E6', progress:50}},
            ]},
            {type:'group', direction:'column', elements:[
                {type:'text', text:'skill in progress', style:{...textStyleDefault}},
                {type:'progress', style:{maincolor:'#E05B49', addcolor:'#E6E6E6', progress:50}},
            ]},*/
            {type:'dots-row', style:{maincolor:'#E05B49', addcolor:'#E6E6E6', radius:10, maincount:5, addcount: 3}},
            {type:'progress', style:{maincolor:'#E05B49', addcolor:'#E6E6E6', progress:50}}
        ];
    
        /*let iconsArr = [
            {type:'image', style:{file:icon, opacity:1}},
        ];*/
    
        let templatesArr = [
            {name: 'Image', elements:imagesArr},
            {name: 'Text', elements:textArr},
            {name: 'Info block', elements:textBlockArr},
            {name: 'Figure', elements:figuresArr},
            {name: 'Progress', elements:progressArr},
            //{name: 'Icons', elements:iconsArr},
        ];
    
        return templatesArr;
    }

    let templatesArr = createTemplates();
    saveFirebase('Data','templates',{templates:templatesArr});
}

let withDataLoad = (propName) => Component => {

    class ComponentWithDataLoad extends React.PureComponent {

        componentDidMount() {
            //saveTemplates();
            this.loadData();
        }

        state = {
            dataReady: false, // готовы ли данные
            combinedProps: null, // исходные пропсы, переданные HOC-у, плюс пропс propName с загруженными данными
        };
        
        loadData = async () => {
            let user;
            let blocks = [];
            let style = {};
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
            
            this.props.dispatch(cv_init(blocks,style,user,templatesData,templatesUser));
            setTimeout( () => this.setState({dataReady:true,combinedProps:{...this.props,[propName]:''}}), 500);
        }

        render() {
            if (!this.state.dataReady) {
                return <Transition in={true} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
                    {stateName => {
                        return <Loader transitionClass={stateName} text={'Loaded'}/>
                    }}
                </Transition>;
            }
            return <Component {...this.state.combinedProps} /> ;
        } 
    }
    return connect()(ComponentWithDataLoad);
}

export { withDataLoad, saveFirebase, loadFirebase, addFirebase};
