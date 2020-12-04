<script>
export default {
    data: () => ({
        online: navigator.onLine,
    }),
    methods: {
        updateOnlineStatus() {
            this.online = navigator.onLine;
        },
    },
    mounted() {
        addEventListener('online', this.updateOnlineStatus);
        addEventListener('offline', this.updateOnlineStatus);
    },
    beforeDestroy() {
        removeEventListener('online');
        removeEventListener('offline');
    }
}
</script>