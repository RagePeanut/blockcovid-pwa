<template>
    <v-container fill-height class="pa-0">
        <v-layout align-center justify-center>
            <v-btn @click="startScanning" x-large color="primary" class="btn">
                <div class="d-flex flex-column btn__content">
                    <v-icon class="icon">mdi-qrcode</v-icon>
                    <span>Scanner</span>
                </div>
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

<style lang="sass" scoped>
.btn
    border-radius: 25% !important
    height: 10rem !important
    width: 10rem
.btn__content
    color: #333 !important
    font-size: 1.2rem
.icon
    font-size: 6rem !important
</style>