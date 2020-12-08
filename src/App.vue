<template>
    <v-app>
        <v-main>
            <router-view @success="handleSuccess"
                         @error="queueErrorSnackbar"/>
            <v-snackbar v-model="snackbarShown"
                        :color="snackbar.color"
                        class="pb-4">
                {{ snackbar.message }}
                <template v-slot:action>
                    <v-btn @click="hideCurrentSnackbar"
                           text>
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import NotificationReceiver from "./mixins/NotificationReceiver.vue";
import OnlineStatus from './mixins/OnlineStatus';
import SnackbarQueue from './mixins/SnackbarQueue';
import offlineQrCodes from './utils/offlineQrCodes';

export default {
    name: 'App',
    mixins: [
        NotificationReceiver,
        OnlineStatus,
        SnackbarQueue,
    ],
    watch: {
        online() {
            if(this.online) {
                this.queueInfoSnackbar('Votre connection a été rétablie');
                // Gestion du passage en online alors que l'application a été lancée en offline
                if(!localStorage.getItem('fcm_token')) {
                    this.getToken();
                } else {
                    this.handleOfflineQrCodes();
                }
            } else {
                this.queueWarningSnackbar('Vous n\'êtes plus connecté à Internet');
            }
        },
        async updatedFcmToken() {
            try {
                const uuid = localStorage.getItem('uuid');
                if(uuid) {
                    await this.$api.updateToken(this.fcmToken, uuid);
                // Ne devrait arriver que si le citoyen a manuellement supprimé
                // son uuid dans le storage
                } else {
                    await this.$api.register(this.fcmToken);
                }
            } catch(err) {
                console.log(err);
                this.queueErrorSnackbar(err.message);
            }
        },
        async fcmToken() {
            if(localStorage.getItem('uuid')) return;
            try {
                await this.$api.register(this.fcmToken);
                // Gestion du passage en online alors que l'application a été lancée en offline
                this.handleOfflineQrCodes();
            } catch(err) {
                console.log(err);
                this.queueErrorSnackbar(err.message);
            }
        },
        canReceiveNotifications() {
            if(!this.canReceiveNotifications) {
                this.queueErrorSnackbar('Cette application nécessite que vous activiez les notifications');
            }
        },
    },
    methods: {
        async handleOfflineQrCodes() {
            const qrCodes = await offlineQrCodes.getAll();
            if(qrCodes.length > 0) {
                let errorCount = 0;
                for(let qr of qrCodes) {
                    try {
                        await this.$api.sendQrCode(qr.content, qr.date);
                        offlineQrCodes.delete(qr.content);
                    } catch {
                        errorCount++;
                    }
                }
                if(errorCount > 0) {
                    this.queueWarningSnackbar(errorCount + ' des ' + qrCodes.length + ' codes QR scannés en hors-ligne étaient invalides');
                } else {
                    this.queueSuccessSnackbar('Vos scans fait en hors-ligne ont bien été envoyés');
                }
            }
        },
        async handleSuccess(decoded) {
            console.log('Decoded:', decoded);
            if(!this.online) {
                offlineQrCodes.add(decoded);
                this.queueInfoSnackbar('Votre scan a été pris en compte et sera envoyé lorsque vous serez en ligne');
                return;
            }
            try {
                await this.$api.sendQrCode(decoded);
                this.queueSuccessSnackbar('Votre scan a bien été envoyé');
            } catch(err) {
                console.log(err);
                this.queueErrorSnackbar(err.message);
            }
        },
    },
    async mounted() {
        if(this.online) {
            this.handleOfflineQrCodes();
        }
    },
};
</script>

<style>
/* Fix pour que la snackbar s'affiche sur l'écran même si la barre de recherche est visible sur mobile
   (https://github.com/vuetifyjs/vuetify/issues/11781) */
div.v-snack:not(.v-snack--absolute) {
    height: 100%;
}
.v-application {
    background-color: #6184D8 !important;
}
</style>
