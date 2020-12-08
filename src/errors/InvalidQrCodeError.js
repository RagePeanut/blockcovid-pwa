export default class InvalidQrCodeError extends Error {
    constructor() {
        super('Code QR invalide');
        this.name = 'InvalidQrCodeError';
    }
}