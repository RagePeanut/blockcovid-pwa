<template>
    <v-btn @click="buttonClicked" x-large color="primary" class="btn">
        <div class="d-flex flex-column btn__content">
            <v-icon class="icon">mdi-qrcode</v-icon>
            <span>Scanner</span>
        </div>
    </v-btn>
</template>

<script>
export default {
    name: 'ScanQrButton',
    methods: {
        buttonClicked() {
            this.$emit('click');
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