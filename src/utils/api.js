import Axios from 'axios';

import AlreadyScannedError from "../errors/AlreadyScannedError";
import HttpError from '../errors/HttpError';
import InvalidCitoyenIdError from "../errors/InvalidCitoyenIdError";
import InvalidQrCodeError from '../errors/InvalidQrCodeError';
import { persistStorage } from '../utils/misc';

const axios = Axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

async function sendQrCode(content, date) {
    let id_qr_code, type_createur;
    try {
        ({ id_qr_code, type_createur } = JSON.parse(content));
    } catch(err) {
        throw new InvalidQrCodeError();
    }

    try {
        await axios.post("/citoyens/qr-code", null, {
            params: {
                id_citoyen: localStorage.getItem('uuid'),
                id_qr_code,
                type_createur,
                date_scan: date || new Date().toISOString(),
            },
        });
    } catch(err) {
        const status = err.response?.status;
        if(status === 422) {
            throw new InvalidQrCodeError();
        } else if(status === 401) {
            throw new AlreadyScannedError();
        }
        throw new HttpError(err.response?.message || err.message, status);
    }
}

async function register(token) {
    try {
        const response = await axios.post('/citoyens/enregistrement', {
            token_fcm: token,
        });
        await persistStorage();
        localStorage.setItem('uuid', response.data.id_citoyen);
    } catch(err) {
        throw new HttpError(err.response?.message || err.message, err.response?.status);
    }
}

async function updateToken(token, uuid) {
    try {
        await axios.put('/citoyens/mise-a-jour', {
            token_fcm: token,
        }, {
            params: {
                id_citoyen: uuid,
            },
        });
    } catch(err) {
        const status = err.response?.status;
        if(status === 422) {
            // L'ID citoyen a été altéré par l'utilisateur, on n'a pas d'autre choix que
            // d'en demander un autre en passant la nouvelle token
            register(token);
            throw new InvalidCitoyenIdError();
        }
        throw new HttpError(err.response?.message || err.message, status);
    }
}

export default {
    sendQrCode,
    register,
    updateToken,
}
