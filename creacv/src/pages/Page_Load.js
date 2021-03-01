import React from 'react';
import {withRouter} from 'react-router';

import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';
import '@firebase/database';

class Page_Load extends React.PureComponent {

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        firebaseConfig = {
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
        db = firebase.firestore();

        loadDoc = new Promise((resolve) => {
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
            this.props.history.push('/cv');
        });
    }

    

    
    
      // HOC возвращает каждый раз НОВЫЙ, обёрнутый компонент
      // поэтому оборачивать в HOC лучше не внутри render, чтобы не рендерить каждый раз НОВЫЙ компонент
      //MobileCompanyWithData=withDataLoad(this.fetchConfig,"companyData")(MobileCompany);
    
      /*render() {
    
        let MobileCompanyWithData=this.MobileCompanyWithData;
        return <MobileCompanyWithData /> ;
    
      }*/



      






    
          
    render() {
        return (
            <div>
                <h1>загрузка данных</h1>
            </div>
        );
    }

}
    
export default withRouter(Page_Load);
    