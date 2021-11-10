import axiosClient from "./axiosClient";

const userApi = {
    logIn: (data) => {
        const url = '/api/user/login';
        return axiosClient.post(url, data);
    },
    SignUp: (data) => {
        const url = '/api/user/register';
        return axiosClient.post(url, data);
    },
    logOut: () => {
        const url = '/api/user/logout';
        return axiosClient.post(url);
    },
    getUser: () => {
        const url = '/api/user/profile';
        return axiosClient.get(url);
    },
    editUser: (data) => {
        const url = '/api/user/profile/update';
        return axiosClient.put(url, data);
    },
    editPassWord: (data) => {
        const url = '/api/user/password/change';
        return axiosClient.put(url, data);
    },
    sendMail: (data) => {
        const url = '/api/user/password/forgot';
        return axiosClient.post(url, data);
    },
    recoverPass: (data, token) => {
        const url = `/api/user/password/recover/${token}`;
        return axiosClient.put(url, data);
    },
    editStatus: (data, id) => {
        const url = `/api/admin/users/status/${id}`;
        return axiosClient.put(url, data);
    },
}

export default userApi;