import axios from "axios";


const feeShipApi = {
    getTinh: (token) => {
        const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
        return axios.get(url, {
            headers: {
                token: token, Accept: "application/json", "Content-Type": "application/json",
            },
        })
    },
    getHuyen: (token, data) => {
        const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/district";
        return axios.post(url, data, {
            headers: {
                token: token, Accept: "application/json", "Content-Type": "application/json",
            },
        })
    },
    getXa: (token, data) => {
        const url = "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward";
        return axios.post(url, data, {
            headers: {
                token: token, Accept: "application/json", "Content-Type": "application/json",
            },
        })
    },
    getDichVu: (token, data) => {
        const url = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services";
        return axios.post(url, data, {
            headers: {
                token: token, Accept: "application/json", "Content-Type": "application/json",
            },
        })
    },
    feeDichVu: (token, data) => {
        const url = "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
        return axios.post(url, data, {
            headers: {
                token: token, Accept: "application/json", "Content-Type": "application/json",
            },
        })
    },
}

export default feeShipApi;