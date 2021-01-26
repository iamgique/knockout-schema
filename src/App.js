import React, { Component } from 'react';
import Home from "./components/Home";
import RegisterBox from "./components/RegisterBox";
import Registered from "./components/Registered";
import Schema from "./components/Schema";

import firebase from 'firebase';

import './assets/style/knockout.css';

class App extends Component {
  constructor(props){
      super(props);
      var config = {
        apiKey: process.env.REACT_APP_API_KEY,
        authDomain: process.env.REACT_APP_AUTH_DOMAIN,
        databaseURL: process.env.REACT_APP_DATABASE_URL,
        projectId: process.env.REACT_APP_PROJECT_ID,
        storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
        messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
        appId: process.env.REACT_APP_APP_ID,
        measurementId: process.env.REACT_APP_MEASUREMENT_ID
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(config);  
      }
      
  }

  render() {
    return (
      <>
        <Home />
        <RegisterBox db={firebase} />
        <Registered db={firebase} />
        <Schema db={firebase} />
      </>
  );
  }
}

export default App;
