importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.1.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: 'AIzaSyDGkQvDdnEJhyk-zsPHjP2ul_-JNySyT_g',
    projectId: 'blockcovid-b739c',
    appId: '1:380908073690:web:ea8e7426cff1497ff22be3',
    messagingSenderId: '380908073690',
});

const messaging = firebase.messaging();