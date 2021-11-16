import axiosClientShip from "./axiosClientShip";

const shipperApi = {
    logIn: (data) => {
        const url = '/api/shipper/login';
        return axiosClientShip.post(url, data);
    },

    logOut: () => {
        const url = '/api/shipper/logout';
        return axiosClientShip.post(url);
    },

    getOrderShip: () => {
        const url = '/api/shipper/orders';
        return axiosClientShip.get(url);
    },

    editOrder: (data, id) => {
        const url = `/api/shipper/orders/${id}`;
        return axiosClientShip.put(url, data)
    },

    addWare: (data) => {
        const url = `/api/shipper/goods-received-notes`;
        return axiosClientShip.post(url, data);
    },
}

export default shipperApi;