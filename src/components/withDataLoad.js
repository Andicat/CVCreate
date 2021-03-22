import React from 'react';
import {connect} from 'react-redux';
import {cv_init} from '../redux/cvDataAC';
import imageUrl from '../img/image.svg';
import {loadFromLocalStorage} from '../modules/utils';

import Loader from './Loader';
import {Transition} from 'react-transition-group';
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

//Templates (для создания новых шаблонов)
function saveTemplates() {
    function createTemplates() {

        let textStyleDefault = {font: 'Roboto', color: '#000000', fontsize: '16',
            bold: false, italic: false, center: false,
            uppercase: false, underline: false, padding: {left: 0,right: 0,top: 0,bottom: 0}};

        let imagesArr = [
            {type: 'image', style: {file: '', opacity: 1}},
            {type: 'image', style: {file: '', opacity: 1, borderRadius: '50%'}},
            {type: 'image', style: {file: '', opacity: 1, bordercolor: '#E05B49', borderwidth: '3', borderStyle: 'solid'}},
            {type: 'image', style: {file: '', opacity: 1, borderRadius: '50%', bordercolor: '#E05B49', borderwidth: '3', borderStyle: 'solid'}},
        ];

        let textArr = [
            {type: 'text', text: 'Text simple', style: {...textStyleDefault, fontsize: '20'}},
            {type: 'text', text: 'Text with background', style: {bgcolor: '#8e9fa0',...textStyleDefault, fontsize: '14'}},
            {type: 'text', text: 'Big text', style: {...textStyleDefault, fontsize: '40', bold: true}},
            {type: 'group', elements: [
                {type: 'text', text: 'Your header', style: {...textStyleDefault, fontsize: '20', bold: true}},
                {type: 'text', text: 'your text', style: {...textStyleDefault}}
            ]},
        ];

        let textBlockArr = [
            {type: 'group', elements: [
                {type: 'text', text: 'Your position', style: {...textStyleDefault, fontsize: '18', bold: true}},
                {type: 'text', text: 'Company', style: {...textStyleDefault, fontsize: '18'}},
                {type: 'text', text: 'period', style: {...textStyleDefault,italic: true}},
                {type: 'text', text: 'your competencies and results', style: {...textStyleDefault}}
            ]},
            {type: 'text', list: true, text: 'List item', style: {...textStyleDefault, fontsize: '16',colorlist: '#666666'}},
        ];

        let figuresArr = [
            {type: 'figure', size: true, width: 80, height: 80, style: {bgcolor: '#E05B49', opacity: 1}},
            {type: 'figure', size: true, width: 80, height: 80, style: {bgcolor: '#6AABB5', opacity: 1, borderRadius: '50%'}},
            {type: 'figure', size: true, width: 160, height: 5, style: {bgcolor: '#E05B49', opacity: 1}},
        ];

        let progressArr = [
            {type: 'dots-row', width: 160, style: {maincolor: '#E05B49', addcolor: '#E6E6E6', radius: 10, maincount: 5, addcount: 3}},
            {type: 'progress', size: true, width: 160, height: 10, style: {maincolor: '#E05B49', addcolor: '#E6E6E6', progress: 50}}
        ];

        let contactBlockArr = [
            {type: 'icon', svg: 'phone', text: 'Your phone', style: {fill: '#666666',size: 25,...textStyleDefault, fontsize: '18',padding: {left: 5,right: 0,top: 0,bottom: 0}}},
            {type: 'icon', svg: 'address', text: 'Your address', style: {fill: '#666666',size: 25,...textStyleDefault, fontsize: '18',padding: {left: 5,right: 0,top: 0,bottom: 0}}},
            {type: 'icon', svg: 'email', text: 'Your email', style: {fill: '#666666',size: 25,...textStyleDefault, fontsize: '18', padding: {left: 5,right: 0,top: 0,bottom: 0}}},
            {type: 'icon', svg: 'telegram', text: 'Your telegram', style: {fill: '#666666',size: 25,...textStyleDefault, fontsize: '18', padding: {left: 5,right: 0,top: 0,bottom: 0}}},
            {type: 'icon', svg: 'skype', text: 'Your skype', style: {fill: '#666666',size: 25,...textStyleDefault, fontsize: '18', padding: {left: 5,right: 0,top: 0,bottom: 0}}},
            {type: 'icon', svg: 'linkedin', text: 'Your Linkedin', style: {fill: '#666666',size: 25,...textStyleDefault, fontsize: '18', padding: {left: 5,right: 0,top: 0,bottom: 0}}},
        ];

        let templatesArr = [
            {name: 'Image', elements: imagesArr},
            {name: 'Text', elements: textArr},
            {name: 'Info block', elements: textBlockArr},
            {name: 'Color block', elements: figuresArr},
            {name: 'Progress', elements: progressArr},
            {name: 'Contacts', elements: contactBlockArr},
        ];

        return templatesArr;
    }

    function codeStyle(block) {
        let newBlock = {...block};
        if (block.style) {
            let newStyle = {};
            let styleIndex = 0;
            for (let key in block.style) {
                let zerofilledIndex = ('000' + styleIndex).slice(-3);
                newStyle['s' + zerofilledIndex + '_' + key] = block.style[key];
                styleIndex++;
            }
            newBlock.style = newStyle;
        }
        if (block.elements) {
            let newElements = block.elements.map(e => codeStyle(e));
            newBlock.elements = newElements;

            return newBlock;
        }
        return newBlock;
    }

    let templatesArr = createTemplates();
    let templatesArrConverted = templatesArr.map(t => codeStyle(t));
    saveFirebase('Data','templates',{templates: templatesArrConverted});
}

let withDataLoad = (propName) => Component => {

    class ComponentWithDataLoad extends React.PureComponent {

        componentDidMount() {
            saveTemplates();
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
            var loadLSData= new Promise( (resolve) => {
                var lsData = loadFromLocalStorage('CV');
                resolve(lsData);
            });

            await loadLSData.then((data) => {
                if (data) {
                    blocks = data.blocks;
                    style = data.style;
                    link = data.link;
                }
            });

            var loadLSUser = new Promise( (resolve) => {
                var lsData = loadFromLocalStorage('CV-user');
                resolve(lsData);
            });
            await loadLSUser.then((data) => {
                if (data) {
                    user = data.user.uid;
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
            setTimeout( () => this.setState({dataReady: true,combinedProps: {...this.props,[propName]: ''}}), 500);
        }

        render() {
            if (!this.state.dataReady) {
                return <Transition in={true} unmountOnExit timeout={{ enter: 1000, exit: 1000 }}>
                    {stateName => {
                        return <Loader transitionClass={stateName} text={'Loading'}/>;
                    }}
                </Transition>;
            }
            return <Component {...this.state.combinedProps}/>;
        }
    }
    return connect()(ComponentWithDataLoad);
};

export { withDataLoad, saveFirebase, loadFirebase, addFirebase};
