export async function persistStorage() {
    // Certains navigateurs ne supportent pas les permissions de storage persistent
    if(navigator.storage?.persist) {
        const persisted = await navigator.storage.persisted();
        // Le contenu de storagePermissionAsked n'importe pas, si l'item a été créé
        // lors de la session c'est qu'on a déjà demandé la permission
        if(!persisted && !sessionStorage.getItem('storage_permission_asked')) {
            navigator.storage.persist();
            sessionStorage.setItem('storage_permission_asked', 'true');
        }
    }
}