<template>
    <v-container fill-height class="pa-0">
        <!-- Scanning -->
        <QrcodeStream v-if="scanning" @decode="onReaderDecode" @init="onReaderInit"/>
        <!-- Not scanning -->
        <v-layout v-else align-center justify-center>
            {{ decoded }}
            {{ error }}
            <v-btn @click="startScanning" x-large color="primary">
                Scanner un code QR
            </v-btn>
        </v-layout>
    </v-container>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';   

export default {
    name: 'Home',
    components: {
        QrcodeStream,
    },
    methods: {
        async onReaderInit(promise) {
            try {
                await promise;
            } catch(error) {
                this.scanning = false;
                this.error = error;
                console.log(error);
            }
        },
        onReaderDecode(decoded) {
            // Sometimes the reader calls the method even though it hasn't decoded anything
            // We need to keep the reader operating when that's the case
            if(decoded === "") return;
            this.decoded = decoded;
            this.scanning = false;
        },
        startScanning() {
            this.scanning = true;
        },
    },
    data: () => ({
        scanning: false,
        decoded: "",
        error: ""
    }),
}
</script>
