import axios from "axios";

const getUser = async function () {
    try {
        const response = await axios.get(
            "https://brainstorm-interview-task.herokuapp.com/users?_page=1&_limit=10"
        );
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default getUser