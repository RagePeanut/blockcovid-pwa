import axiosLib from 'axios';

const axios = axiosLib.create({
    baseURL: process.env.VUE_APP_API_URL,
});

export async function sendQrContent(content) {
    const response = await axios.get("/qr-code", {
        params: {
            content,
        }
    });
    if(response.status === 200) {
        return response.data.message;
    }
}

export async function requestTest() {
    try {
        const { data } = await axios.get('/medecins/1');
        return data;
    } catch(err) {
        return err;
    }
}