import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './sass/style.scss';
import firebase from '@firebase/app';
import '@firebase/firestore';
import '@firebase/auth';
import '@firebase/storage';


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
let ttt = "dataImages";

const db = firebase.firestore();
var docRef = db.collection(ttt).onSnapshot((querySnapshot) => {
    const meal = [];
    querySnapshot.forEach(documentSnapshot => {
      meal.push({
        ...documentSnapshot.data(),
        key: documentSnapshot.id,
    });
    console.log(meal);
  });
});


/*db.collection("dataImages").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});*/


let rrr;
/*docRef.get().then((doc) => {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        rrr = doc.data();
        console.log(typeof rrr);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});*/




//var database = firebase.database();
//console.error(database);

/*database.child("data").get().then(function(snapshot) {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    }
    else {
      console.log("No data available");
    }
  }).catch(function(error) {
    console.error(error);
  });

//firebase.analytics();*/

/*const storage = firebase.storage();
const storageRef = storage.ref();
const fileRef = storageRef.child('/templates/colors.json');
fileRef.getDownloadURL();

let imageTemplateUrl = '';
let imagesArr = {};


async function loadJSON(url) {
    let response = await fetch(url);
    if (response.ok) { 
        return await response.json();
    } else {
        //showError(response.status);
    }
}


//load templates AJAX 
var prAJAX= new Promise( (resolve,reject) => {
    var files = ["colors.json"];
    files.map( filename => {
        storage
          .ref( `/templates/${filename}` )
          .getDownloadURL()
          .then( url => {
              debugger
              var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onload = (event) => {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();
            //imagesArr = loadJSON(url);
            resolve(true);
          });
    });
});

// Create a reference with an initial file path and name

// Create a reference from a Google Cloud Storage URI
var gsReference = storage.refFromURL('gs://bucket/images/stars.jpg');

// Create a reference from an HTTPS URL
// Note that in the URL, characters are URL escaped!
var httpsReference = storage.refFromURL('https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');  

/*const files = [ 'image.svg' ]; 
files.map( filename => {
    storage
      .ref( `/images/${filename}` )
      .getDownloadURL()
      .then( url => {
        //console.log( "Got download url: ", url );
        imageTemplateUrl = url;
        createApp();
      });
});*/

//Promise.all([prAJAX]).then( result => {setTimeout(createApp,500)});

//function createApp() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('app')
  );
//}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
