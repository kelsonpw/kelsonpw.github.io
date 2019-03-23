import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAOwy2niFxjJ6llJf6SV4ZihwKqoKjGQQE',
  authDomain: 'kelsonpwarn.firebaseapp.com',
  databaseURL: 'https://kelsonpwarn.firebaseio.com',
  projectId: 'kelsonpwarn',
  storageBucket: 'kelsonpwarn.appspot.com',
  messagingSenderId: '126172545799',
};
firebase.initializeApp(config);

const db = firebase.firestore();

export { db, firebase as default };
