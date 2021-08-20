import axios from 'axios'

export const httpClient = axios.create({
    baseURL: `https://brainstorm-interview-task.herokuapp.com/`,
});