<template>
    <div class="d-flex align-end justify-center pb-4 overlay">
        <v-btn v-if="torchSupported"
                @click="torchButtonClicked"
                fab
                x-large>
            <v-icon v-if="torchActive" ref="torch-on">mdi-flashlight</v-icon>
            <v-icon v-else ref="torch-off">mdi-flashlight-off</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    name: 'CameraOverlay',
    props: [
        'torchActive',
        'torchSupported'
    ],
    methods: {
        torchButtonClicked() {
            this.$emit('torch-click');
        },
    },
}
</script>

<style lang="sass">
.overlay
    position: fixed
    top: 0
    left: 0
    height: 100%
    width: 100%
</style>