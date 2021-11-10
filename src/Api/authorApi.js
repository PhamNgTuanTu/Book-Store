import axiosClient from "./axiosClient";

const authorApi = {
  getListSachTheoAuthor: (id) => {
    const url = `/api/books/author/${id}`;
    return axiosClient.get(url);
  },
  getListSachTheoPage: (id, num) => {
    const url = `/api/books/author/${id}?page=${num}`;
    return axiosClient.get(url);
  }
}

export default authorApi;