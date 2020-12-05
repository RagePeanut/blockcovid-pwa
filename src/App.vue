<template>
    <v-app>
        <v-main>
            <router-view @success="handleSuccess"
                         @error="showError"/>
            <v-snackbar v-model="snackbarShown"
                        :color="snackbar.color">
                {{ snackbar.message }}
                <template v-slot:action>
                    <v-btn @click="hideSnackbar"
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
import offlineQrCodes from './utils/offlineQrCodes';

export default {
    name: 'App',
    mixins: [
        NotificationReceiver,
        OnlineStatus,
    ],
    watch: {
        online() {
            if(this.online) {
                this.showInfo('Votre connection a été rétablie');
                this.handleOfflineQrCodes();
            } else {
                this.showWarning('Vous n\'êtes plus connecté à Internet');
            }
        },
        async updatedFcmToken() {
            try {
                await this.$api.updateToken(this.fcmToken);
            } catch(err) {
                console.log(err);
                this.showError(err.message);
            }
        },
        async fcmToken() {
            if(localStorage.getItem('uuid')) return;
            try {
                await this.$api.register(this.fcmToken);
            } catch(err) {
                console.log(err);
                this.showError(err.message);
            }
        },
        canReceiveNotifications() {
            if(!this.canReceiveNotifications) {
                this.showError('Cette application nécessite que vous activiez les notifications');
            }
        },
    },
    data: () => ({
        snackbarShown: false,
        snackbar: {
            message: '',
            color: '',
        }
    }),
    async mounted() {
        if(this.online) {
            this.handleOfflineQrCodes();
        }
        console.log(await this.$api.requestTest());
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
                    this.showWarning(errorCount + ' des ' + qrCodes.length + ' codes QR scannés en hors-ligne étaient invalides');
                } else {
                    this.showSuccess('Vos scans fait en hors-ligne ont bien été envoyés');
                }
            }
        },
        async handleSuccess(decoded) {
            console.log('Decoded:', decoded);
            if(!this.online) {
                offlineQrCodes.add(decoded);
                this.showInfo('Votre scan a été pris en compte et sera envoyé lorsque vous serez en ligne');
                return;
            }
            try {
                await this.$api.sendQrCode(decoded);
                this.showSuccess('Votre scan a bien été envoyé');
            } catch(err) {
                console.log(err);
                this.showError(err.message);
            }
        },
        showSuccess(message) {
            this.showSnackbar(message, 'success');
        },
        showInfo(message) {
            this.showSnackbar(message, 'information');
        },
        showWarning(message) {
            this.showSnackbar(message, 'warning')
        },
        showError(message) {
            this.showSnackbar(message, 'error');
        },
        async showSnackbar(message, color) {
            // On doit fermer la snackbar actuelle avant d'afficher la nouvelle
            // Sinon, le timer de la snackbar ne sera pas remis à zéro
            if(this.snackbarShown) {
                this.hideSnackbar();
                await this.$nextTick();
            }
            this.snackbar = {
                message,
                color,
            };
            this.snackbarShown = true;
        },
        hideSnackbar() {
            this.snackbarShown = false;
        },
    },
};
</script>

<style>
/* Fix pour que la snackbar s'affiche sur l'écran même si la barre de recherche est visible sur mobile
   (https://github.com/vuetifyjs/vuetify/issues/11781) */
div.v-snack:not(.v-snack--absolute) {
    height: 100%;
}
</style>
