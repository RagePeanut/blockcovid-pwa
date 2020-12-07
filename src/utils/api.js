import Axios from 'axios';

import HttpError from '../errors/HttpError';
import InvalidQrCodeError from '../errors/InvalidQrCodeError';
import { persistStorage } from '../utils/misc';

const axios = Axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

export default {
    sendQrCode: async (content, date) => {
        let id_qr_code, type_createur;
        try {
            ({ id_qr_code, type_createur } = JSON.parse(content));
        } catch(err) {
            throw new InvalidQrCodeError();
        }

        try {
            const response = await axios.post("/citoyens/qr-code", null, {
                params: {
                    id_citoyen: localStorage.getItem('uuid'),
                    id_qr_code,
                    type_createur,
                    date_entree: date || new Date().toISOString(),
                },
                validateStatus: status => status < 400 || status === 422,
            });
            if(response.status === 422) {
                throw new InvalidQrCodeError();
            }
        } catch(err) {
            throw new HttpError(err.response.message, err.response.status);
        }
        
    },
    register: async (token) => {
        const { data } = await axios.post('/citoyens/enregistrement', {
            token_fcm: token,
        });
        if(data?.status !== 200) {
            throw new HttpError(data.message, data.status);
        }
        await persistStorage();
        localStorage.setItem('uuid', data.id_citoyen);
    },
    updateToken: async (token, uuid) => {
        const { data } = await axios.put('/citoyens/mise-a-jour', {
            token_fcm: token,
        }, {
            params: {
                id_citoyen: uuid,
            },
        });
        if(data?.status !== 200) {
            throw new HttpError(data.message, data.status);
        }
    }
}
