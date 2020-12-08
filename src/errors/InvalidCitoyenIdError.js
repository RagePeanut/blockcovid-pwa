export default class InvalidCitoyenIdError extends Error {
    constructor() {
        super('ID citoyen invalide');
        this.name = 'InvalidCitoyenIdError';
    }
}