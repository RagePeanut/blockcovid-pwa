<template>
    <v-container fill-height class="pa-0">
        <v-layout align-center justify-center>
            <v-btn @click="startScanning" x-large color="primary">
                Scanner un code QR
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Home',
    methods: {
        startScanning() {
            this.$router.push('/scanner');
        },
    },
}
</script>
