<template>
    <qrcode-stream @decode="onDecode"
                  @init="onInit"
                  :torch="torchActive">
        <v-container fill-height>
            <v-layout align-center justify-center>
                <CameraLoading v-if="loading"/>
                <CameraOverlay v-else
                               :torchActive="torchActive"
                               :torchSupported="torchSupported"
                               @torch-click="switchTorch"/>
            </v-layout>
        </v-container>
    </qrcode-stream>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import CameraOverlay from '../components/CameraOverlay';
import CameraLoading from '../components/CameraLoading';

export default {
    name: 'Scanner',
    components: {
        QrcodeStream,
        CameraOverlay,
        CameraLoading
    },
    data: () => ({
        decoded: '',
        loading: true,
        torchSupported: false,
        torchActive: false,
    }),
    methods: {
        switchTorch() {
            this.torchActive = !this.torchActive;
        },
        onDecode(decoded) {
            // Il arrive que le scanner trouve un code QR dans l'image alors qu'il n'y en a pas
            // Il renvoie toujours une string vide dans ce cas, nous ne devons pas en tenir compte
            if(decoded === '') return;
            // La librairie gère déjà le cas des répétitions mais le bug de la string vide rend
            // sa gestion inutile, nous devons vérifier nous-même si il s'agit d'une répétition
            if(this.decoded === decoded) return;
            this.decoded = decoded;
            this.$emit('success', this.decoded);
        },
        async onInit(initPromise) {
            try {
                const { capabilities } = await initPromise;
                this.torchSupported = capabilities.torch;
            } catch(error) {
                switch(error.name) {
                    case 'NotAllowedError':
                        this.$emit('error', 'Vous devez autoriser l\'accès à la caméra');
                        break;
                    case 'NotFoundError':
                        this.$emit('error', 'Aucune caméra trouvée');
                        break;
                    case 'NotSupportedError':
                    case 'InsecureContextError':
                        this.$emit('error', 'Veuillez visiter cette page en HTTPS');
                        break;
                    case 'OverconstrainedError':
                        this.$emit('error', 'Vous n\'avez pas de caméra frontale');
                        break;
                    case 'StreamApiNotSupportedError':
                        this.$emit('error', 'Votre navigateur n\'est pas supporté');
                        break;
                    default:
                        this.$emit('error', 'Erreur inconnue: ' + error.name);
                }
                this.navigateBack();
            } finally {
                this.loading = false;
            }
        },
        navigateBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.replace('/');
        }
    },
}
</script>

<style lang="sass">
.loading-text
    font-size: 1.8rem
    font-weight: normal
</style>