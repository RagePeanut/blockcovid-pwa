<script>
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/messaging'

import { persistStorage } from '../utils/misc';

export default {
    data: () => ({
        fcmToken: null,
        updatedFcmToken: null,
        canReceiveNotifications: null,
    }),
    watch: {
        async canReceiveNotifications() {
            if(this.canReceiveNotifications && !this.fcmToken) {
                this.fcmToken = await firebase.messaging().getToken({
                    vapidKey: process.env.VUE_APP_FIREBASE_MESSAGING_KEY,
                });
                console.log('Token:', this.fcmToken);
                const storedToken = localStorage.getItem('fcm_token');
                if(storedToken !== this.fcmToken) {
                    await persistStorage();
                    localStorage.setItem('fcm_token', this.fcmToken);
                    // Si il y avait déjà une token dans le storage, et que la token a donc changé,
                    // on set updatedFcmToken à sa valeur afin que des méthodes watch puissent y réagir
                    if(storedToken) {
                        this.updatedFcmToken = this.fcmToken;
                    }
                }
            }
        }
    },
    methods: {
        async requestPermission() {
            const permission = await Notification.requestPermission();
            if(permission === 'granted') {
                this.canReceiveNotifications = true;
                console.log('Notification permission granted.');
            // Certains navigateurs (ex: Firefox) dismiss la demande de permission d'afficher des notifications
            // en attendant que l'utilisateur réponde à la demande en renvoyant "default" en permission.
            // On doit donc explicitement tester si elle est bien à "denied".
            } else if(permission === 'denied') {
                this.canReceiveNotifications = false;
                console.log('Unable to get permission to notify.');
            }
            // Si le navigateur le supporte, on écoute les changements sur la permission d'afficher des notifications
            // afin de pouvoir y réagir via une méthode watch dans un component
            if(!navigator.permissions) return;
            const self = this;
            navigator.permissions.query({ name: 'notifications' }).then(permission => {
                permission.onchange = function() {
                    self.canReceiveNotifications = this.state === 'granted';
                }
            });
        }
    },
    mounted() {
        const config = {
            appId: process.env.VUE_APP_FIREBASE_APP_ID,
            apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
            projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
            messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
        };
        firebase.initializeApp(config);

        const messaging = firebase.messaging();

        this.requestPermission();

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