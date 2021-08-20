import { httpClient } from "../service/axios.service";


const getThisUser = async function (id) {
    try {
        const response = await httpClient.get(
            `/users/${id}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default getThisUser