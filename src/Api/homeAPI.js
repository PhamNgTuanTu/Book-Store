import axiosClient from "./axiosClient";

const homeApi = {
  getSachMoiCapNhat: (sl) => {
    const url = `/api/books/new?limit=${sl}`;
    return axiosClient.get(url);
  },
  getSachBanChay: (sl) => {
    const url = `/api/books/selling?limit=${sl}`;
    return axiosClient.get(url);
  },
  getListMenu: () => {
    const url = `/api/main/select`;
    return axiosClient.get(url);
  },
  getListSlider: () => {
    const url = `/api/main/sliders`;
    return axiosClient.get(url);
  },
  getAllListBooks: () => {
    const url = `/api/books/all`;
    return axiosClient.get(url);
  },
  getListSachTheoCate: (id) => {
    const url = `/api/books/category/${id}`;
    return axiosClient.get(url);
  },
  search: (params, page) => {
    const url = `/api/books/search?q=${params}&page=${page}`;
    return axiosClient.get(url);
  },
  getAllBooks: (page) => {
    const url = `/api/books/all?page=${page}`;
    return axiosClient.get(url);
  },
  getBooksRanDom: (limit) => {
    const url = `/api/books/random?limit=${limit}`;
    return axiosClient.get(url);
  },
  getBooksMostDiscount: () => {
    const url = `/api/books/most-discount`;
    return axiosClient.get(url);
  },
  getAuthorNoiBat: () => {
    const url = `/api/books/highlight-author`;
    return axiosClient.get(url);
  },
}

export default homeApi;