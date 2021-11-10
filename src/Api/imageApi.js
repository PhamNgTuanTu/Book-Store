import axiosClient from "./axiosClient";

const imageApi = {
    addImageApi: (data, type) => {
        const formData = new FormData();
        const url = `/api/image/upload`;
        formData.append("type", type);
        formData.append("image", data);
        return axiosClient.post(url, formData);
    },
}

export default imageApi;