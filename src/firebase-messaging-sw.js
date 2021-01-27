importScripts('https://www.gstatic.com/firebasejs/7.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.0/firebase-messaging.js');

const config = {
    apiKey: "AIzaSyBnxj-lEW_5lPRtErCL3YPLLQIip4vN18A",
    authDomain: "torre-job-notification.firebaseapp.com",
    databaseURL: "https://torre-job-notification-default-rtdb.firebaseio.com",
    projectId: "torre-job-notification",
    storageBucket: "torre-job-notification.appspot.com",
    messagingSenderId: "301338542613",
    appId: "1:301338542613:web:44231455449ce9a011041c"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('BackgroundMessageHandler registered')
    console.log('payload',payload)
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: 'favicon.ico',
        vibrate: [300, 100, 300, 100, 300, 100, 300],
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});
