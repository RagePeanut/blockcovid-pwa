export default class HttpError extends Error {
    constructor(message, status) {
        super('Erreur ' + status + ': ' + message);
        this.name = 'HttpError';
        this.status = status;
    }
}