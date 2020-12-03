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
import { requestTest } from './utils/api';

export default {
    name: 'App',
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
