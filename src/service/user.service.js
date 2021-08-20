import { httpClient } from "../service/axios.service";


export const getUsers = async function (thisPage, limit) {
    try {
        const response = await httpClient.get(
            `/users?_page=${thisPage}&_limit=${limit}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getUserById = async function (id) {
    try {
        const response = await httpClient.get(
            `/users/${id}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}