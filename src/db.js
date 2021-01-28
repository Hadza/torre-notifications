import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/messaging'
import 'firebase/functions'

// Initialize firebase instance
firebase.initializeApp({
            apiKey: "AIzaSyBnxj-lEW_5lPRtErCL3YPLLQIip4vN18A",
            authDomain: "torre-job-notification.firebaseapp.com",
            databaseURL: "https://torre-job-notification-default-rtdb.firebaseio.com",
            projectId: "torre-job-notification",
            storageBucket: "torre-job-notification.appspot.com",
            messagingSenderId: "301338542613",
            appId: "1:301338542613:web:44231455449ce9a011041c"
    })

export const db = firebase.firestore()
export const messaging = firebase.messaging()
export const functions = firebase.functions()
