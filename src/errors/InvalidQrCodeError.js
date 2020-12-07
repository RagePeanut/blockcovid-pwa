export default class InvalidQrCodeError extends Error {
    constructor() {
        super('QR code invalide');
        this.name = 'InvalidQrCodeError';
    }
}