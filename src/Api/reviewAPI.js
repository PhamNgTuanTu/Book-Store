import axiosClient from "./axiosClient";

const reviewAPI = {
  postReview: (data) => {
    const url = `/api/user/reviews`;
    return axiosClient.post(url, data);
  },
  getReview: (id) => {
    const url = `/api/books/reviews/${id}`;
    return axiosClient.get(url);
  },
  getReviewPoint: (id) => {
    const url = `/api/books/ratings/${id}`;
    return axiosClient.get(url);
  },
}

export default reviewAPI;