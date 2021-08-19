import axios from "axios";

const getUser = async function (thisPage,limit) {
    try {
        const response = await axios.get(
            `https://brainstorm-interview-task.herokuapp.com/users?_page=${thisPage}&_limit=${limit}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default getUser