export default class AlreadyScannedError extends Error {
    constructor() {
        super('Ce code QR a déjà été scanné');
        this.name = 'AlreadyScannedError';
    }
}