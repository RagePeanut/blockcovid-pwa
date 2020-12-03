<template>
        <QrcodeStream @decode="onDecode"
                      @init="onInit"/>
</template>

<script>
import QrcodeStream from '../components/QrcodeStream';

export default {
    name: 'Scanner2',
    components: {
        QrcodeStream,
    },
    data: () => ({
        decoded: '',
    }),
    methods: {
        onDecode(decoded) {
            // Il arrive que le scanner trouve un code QR dans l'image alors qu'il n'y en a pas
            // Il renvoie toujours une string vide dans ce cas, nous ne devons pas en tenir compte
            if(decoded === '') return;
            // La librairie gère déjà le cas des répétitions mais le bug de la string vide rend
            // sa gestion inutile, nous devons vérifier nous-même si il s'agit d'une répétition
            if(this.decoded === decoded) return;
            this.decoded = decoded;
            alert(decoded);
        },
        async onInit(initPromise) {
            try {
                await initPromise;
            } catch(error) {
                switch(error.name) {
                    case 'NotAllowedError':
                        console.log('Vous devez autoriser l\'accès à la caméra');
                        break;
                    case 'NotFoundError':
                        console.log('Aucune caméra trouvée');
                        break;
                    case 'NotSupportedError':
                        console.log('Veuillez visiter cette page en HTTPS');
                        break;
                    case 'OverconstrainedError':
                        console.log('Vous n\'avez pas de caméra frontale');
                        break;
                    case 'StreamApiNotSupportedError':
                        console.log('Votre navigateur n\'est pas supporté');
                        break;
                    default:
                        console.log('Erreur inconnue: ' + error.name);
                }
                this.navigateBack();
            }
        },
        navigateBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.replace('/');
        }
    },
}
</script>