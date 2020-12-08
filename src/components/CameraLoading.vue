<template>
    <div class="d-flex flex-column align-center">
        <h1 class="primary--text loading-text pb-4 text-center">Lancement de la caméra...</h1>
        <v-progress-circular indeterminate color="primary" :size="40" :width="3"/>
    </div>
</template>

<script>
export default {
    name: 'CameraLoading',
}
</script>