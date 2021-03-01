import React from 'react';
import {withRouter} from 'react-router';

import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/database';

class Page_Load extends React.PureComponent {

    componentDidMount() {
        this.loadImages();
        this.loadData();
    }

    loadImages = async () => {
        var files = ["icon-add","icon-back"];
        var filesCount = 0;
        for ( let i = 0; i < files.length; i++ ) {
            let loadImg = new Promise((resolve) => {
                let src = require('./../img/icon-add.svg');
                var img = new Image();
                img.src = src;
                img.onload = () => resolve(console.log('image loaded'));
            });
            await loadImg;
            filesCount++;
            if (filesCount == files.length) {
                return;
            }
        }
    }

    loadData = async () => {
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

        

        var storage = firebase.storage();
        var pathReference = storage.ref('images/image.svg');
        var img = new Image();
        img.src = "img/" + pathReference.name;
        debugger

        // Create a reference from a Google Cloud Storage URI
        var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg');

    
        
        let db = firebase.firestore();

        let loadDoc = new Promise((resolve) => {
            db.collection("CV").doc('Katya').get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                    resolve(doc.data());
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        });
        loadDoc.then((data) => { 
            setTimeout(() => this.props.history.push('/cv'),2000);
        });
    }

    render() {
        return <div className='loader'>
                    <span className='loader__text'>Loading</span>
                    <i className='loader__layer loader__layer--1'></i>
                    <i className='loader__layer loader__layer--2'></i>
                    <i className='loader__layer loader__layer--3'></i>
               </div>;
    }
}
    
export default withRouter(Page_Load);
    