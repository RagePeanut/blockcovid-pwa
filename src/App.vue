<template>
    <v-app>
        <v-main>
            <router-view @success="handleSuccess"
                         @error="handleError"/>
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
import { requestTest } from './utils/api';

export default {
    name: 'App',
    mixins: [
        NotificationReceiver,
        OnlineStatus,
    ],
    watch: {
        online() {
            if(this.online) {
                this.handleInfo('Votre connection a été rétablie');
            } else {
                this.handleWarning('Vous n\'êtes plus connecté à Internet');
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
        console.log(await requestTest());
    },
    methods: {
        handleSuccess(message) {
            this.showSnackbar(message, 'success');
        },
        handleInfo(message) {
            this.showSnackbar(message, 'information');
        },
        handleWarning(message) {
            this.showSnackbar(message, 'warning')
        },
        handleError(message) {
            this.showSnackbar(message, 'error');
        },
        async showSnackbar(message, color) {
            // On doit fermer la snackbar actuelle avant d'afficher la nouvelle
            // Sinon, le timer de la snackbar ne sera pas reset
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
