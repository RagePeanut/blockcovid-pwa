<template>
    <v-app>
        <v-main>
            <router-view @scanner-success="handleScannerSuccess"
                         @scanner-error="handleScannerError"/>
            <v-snackbar v-model="snackbarShown"
                        :color="snackbar.color">
                {{ snackbar.message }}
            </v-snackbar>
        </v-main>
    </v-app>
</template>

<script>
import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: process.env.VUE_APP_API_URL,
});

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
        try {
            const response = await axios.get('/medecins/1');
            console.log(response.data);
        } catch(err) {
            console.log(err);
        }
    },
    methods: {
        handleScannerSuccess(successMessage) {
            this.showSnackbar(successMessage, 'success');
        },
        handleScannerError(errorMessage) {
            this.showSnackbar(errorMessage, 'error');
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
