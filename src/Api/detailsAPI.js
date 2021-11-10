import axiosClient from "./axiosClient";

const detailsApi = {
  getSachTheoId: (id) => {
    const url = `/api/books/details/${id}`;
    return axiosClient.get(url);
  }
}

export default detailsApi;