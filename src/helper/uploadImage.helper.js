import { httpClient } from "../service/axios.service";

export async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await httpClient.post("/images", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data
}