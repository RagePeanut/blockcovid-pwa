import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: process.env.VUE_APP_API_URL,
});

export default {
    sendQrContent: async (content) => {
        const response = await axios.get("/qr-code", {
            params: {
                content,
            }
        });
        if(response.status === 200) {
            return response.data.message;
        }
    },
    register: async (token) => {
        try {
            const { data } = await axios.post('/citoyens/enregistrement', {
                token_fcm: token,
            });
            localStorage.setItem('uuid', data.id_citoyen);
        } catch(err) {
            console.log(err);
            throw err;
        }
    },
    requestTest: async () => {
        try {
            const { data } = await axios.get('/medecins/1');
            return data;
        } catch(err) {
            return err;
        }
    },
}