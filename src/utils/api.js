import Axios from 'axios';

import HttpError from '../errors/HttpError';
import { persistStorage } from '../utils/misc';

const axios = Axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

export default {
    sendQrCode: async (content, date) => {
        const { data } = await axios.get("/citoyens/qr-code", {
            params: {
                id_citoyen: localStorage.getItem('uuid'),
                content,
                date: date || Date.now(),
            },
            validateStatus: status => status < 400 || status === 422,
        });
        if(data?.status !== 200) {
            if(data?.status === 422) {
                throw new Error(data.message);
            }
            throw new HttpError(data.message, data.status);
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
    requestTest: async () => {
        try {
            const { data } = await axios.get('/medecins/1');
            return data;
        } catch(err) {
            return err;
        }
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
