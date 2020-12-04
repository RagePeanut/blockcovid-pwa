<template>
    <v-app>
        <v-main>
            <router-view @success="handleSuccess"
                         @error="handleError"/>
            <v-snackbar v-model="snackbarShown"
                        :color="snackbar.color">
                {{ snackbar.message }}
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
            console.log(this.online ? "Online" : "Offline");
        },
    },
    data: () => ({
        snackbarShown: false,
        snackbar: {
            message: '',
            color: 'success',
        }
    }),
    async mounted() {
        console.log(await requestTest());
    },
    methods: {
        handleSuccess(message) {
            this.showSnackbar(message, 'success');
        },
        handleError(message) {
            this.showSnackbar(message, 'error');
        },
        showSnackbar(message, color) {
            this.snackbar = {
                message,
                color,
            };
            this.snackbarShown = true;
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
</style>
