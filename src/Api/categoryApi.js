import axiosClient from "./axiosClient";

const categoryApi = {
  getListSachTheoCate: (id) => {
    const url = `/api/books/category/${id}`;
    return axiosClient.get(url);
  },
  getListSachTheoPage: (id, num) => {
    const url = `/api/books/category/${id}?page=${num}`;
    return axiosClient.get(url);
  }
}

export default categoryApi;