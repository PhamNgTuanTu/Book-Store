import axiosClient from "./axiosClient";

const orderAPI = {
  postOrder: (data) => {
    const url = `/api/user/orders`;
    return axiosClient.post(url, data);
  },
  getOrder: () => {
    const url = `/api/user/orders`;
    return axiosClient.get(url);
  },
  getOrderPage: (num) => {
    const url = `/api/user/orders?page=${num}`;
    return axiosClient.get(url);
  },
  editOrder: (id) => {
    const url = `/api/user/orders/${id}`;
    return axiosClient.delete(url);
  },
}

export default orderAPI;