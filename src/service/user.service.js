import { httpClient } from "../service/axios.service";


export const getUsers = async function (thisPage, limit, direction, sortKey) {
    const directionUrl = direction ? `&_order=${direction}` : ''
    const sortKeyUrl = sortKey ? `&_sort=${sortKey}` : ''
    const url = `/users?${sortKeyUrl}${directionUrl}&_page=${thisPage}&_limit=${limit}`
    try {
        const response = await httpClient.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export const getUserById = async function (id) {
    const url = `/users/${id}`
    try {
        const response = await httpClient.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
}