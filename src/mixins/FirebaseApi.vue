<script>
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/messaging'

// https://juliensalinas.com/fr/vuejs-django-firebase-pwa-notifications-push/
export default {
    methods: {
        saveNotificationToken(token) {
            console.log('Fake sending token:', token);
        },
    },
    mounted() {
        const config = {
            appId: process.env.VUE_APP_FIREBASE_APP_ID,
            authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
            apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
            projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
        };
        firebase.initializeApp(config);

        const messaging = firebase.messaging();

        messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_MESSAGING_KEY);

        messaging.requestPermission()
            .then(async () => {
                console.log('Notification permission granted.');
                const token = await messaging.getToken();
                console.log('New token created:', token);
                this.saveNotificationToken(token);
            }).catch(err => {
                console.log('Unable to get permission to notify.', err);
            });

        messaging.onMessage(payload => {
            console.log(payload);
        });

        // DEPRECATED, plus besoin de gérer la rotation des tokens
        // messaging.onTokenRefresh(async () => {
        //     try {
        //         const token = await messaging.getToken();
        //         console.log('Token refreshed: ', newToken);
        //         this.saveNotificationToken(newToken);
        //     } catch(err) {
        //         console.log('Unable to retrieve refreshed token ', err);
        //     }
        // });
    },
}
</script>