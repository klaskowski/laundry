import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDYMjPFneOHrxZ1MZ3vuz0eMjPjs1H0xM8",
    authDomain: "pralnia-cb0e8.firebaseapp.com",
    databaseURL: "https://pralnia-cb0e8.firebaseio.com",
    projectId: "pralnia-cb0e8",
    storageBucket: "",
    messagingSenderId: "896722415486",
    appId: "1:896722415486:web:65301e701af65367"
};
firebase.initializeApp(config);

export default firebase;
export const ordersRef = firebase.database().ref('orders');