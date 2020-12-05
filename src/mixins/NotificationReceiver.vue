<script>
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/messaging'

export default {
    data: () => ({
        fcmToken: '',
    }),
    mounted() {
        const config = {
            appId: process.env.VUE_APP_FIREBASE_APP_ID,
            apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
            projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
            messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
        };
        firebase.initializeApp(config);

        const messaging = firebase.messaging();

        messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_MESSAGING_KEY);

        messaging.requestPermission()
            .then(async () => {
                console.log('Notification permission granted.');
                this.fcmToken = await messaging.getToken();
                console.log('Token:', this.fcmToken);
            }).catch(err => {
                console.log('Unable to get permission to notify.', err);
            });

        messaging.onMessage(payload => {
            const { title, body } = payload.notification;
            new Notification(title, {
                body,
            });
        });

        // DEPRECATED, plus besoin de gérer la rotation des tokens
        // messaging.onTokenRefresh(async () => {
        //     try {
        //         this.fcmToken = await messaging.getToken();
        //         console.log('Token refreshed: ', this.fcmToken);
        //     } catch(err) {
        //         console.log('Unable to retrieve refreshed token ', err);
        //     }
        // });
    },
}
</script>