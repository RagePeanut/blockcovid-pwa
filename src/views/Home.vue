<template>
    <v-container fill-height class="pa-0">
        <v-layout align-center justify-center>
            <ScanQrButton @click="startScanning"/>
        </v-layout>
    </v-container>
</template>

<script>
import ScanQrButton from '../components/ScanQrButton';

export default {
    name: 'Home',
    components: {
        ScanQrButton,
    },
    methods: {
        startScanning() {
            this.$router.push('/scanner');
        },
    },
}
</script>