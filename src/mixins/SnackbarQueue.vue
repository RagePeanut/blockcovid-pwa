<script>
export default {
    data: () => ({
        snackbarShown: false,
        snackbar: {
            message: '',
            color: '',
        },
        snackbarQueue: [],
    }),
    watch: {
        snackbarShown() {
            this.showSnackbar();
        },
        snackbarQueue() {
            this.showSnackbar();
        }
    },
    methods: {
        async showSnackbar() {
            if(!this.snackbarShown && this.snackbarQueue.length > 0) {
                this.snackbar = this.snackbarQueue.shift();
                if(this.snackbar.color !== '') await this.$nextTick();
                this.snackbarShown = true;
            }
        },
        hideCurrentSnackbar() {
            this.snackbarShown = false;
        },
        queueSnackbar(message, color) {
            this.snackbarQueue.push({
                message,
                color,
            });
        },
        queueSuccessSnackbar(message) {
            this.queueSnackbar(message, 'success');
        },
        queueInfoSnackbar(message) {
            this.queueSnackbar(message, 'informatin');
        },
        queueWarningSnackbar(message) {
            this.queueSnackbar(message, 'warning');
        },
        queueErrorSnackbar(message) {
            this.queueSnackbar(message, 'error');
        },
    },
}
</script>