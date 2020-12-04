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
import FirebaseApi from './mixins/FirebaseApi';
import { requestTest } from './utils/api';

export default {
    name: 'App',
    mixins: [
        FirebaseApi,
    ],
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
/* Fix for snackbar showing out of range when the search bar is visible in some mobile browsers
   (https://github.com/vuetifyjs/vuetify/issues/11781) */
div.v-snack:not(.v-snack--absolute) {
    height: 100%;
}
</style>
