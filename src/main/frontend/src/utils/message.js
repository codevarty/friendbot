import api from "./api.js";

const sendMessage = async (message) => {
    let baseUrl = "/api/chatGpt/prompt"
    let contentType = "application/json"
    if (message.file) {
        baseUrl = "/api/chatGpt/question"
        contentType = "multipart/form-data"
    }

    console.log(message);

    try {
        const response = await api.post(baseUrl, message, {
            headers: {
                "Content-Type": contentType
            }
        })

        if (response.status !== 200) {
            throw Error("잘못되 응답입니다.")
        }

        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(error);
    }
}

export default sendMessage;