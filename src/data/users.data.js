import { httpClient } from "../service/axios.service";


const getUser = async function (thisPage, limit) {
    try {
        const response = await httpClient.get(
            `/users?_page=${thisPage}&_limit=${limit}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default getUser