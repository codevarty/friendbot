import axios from "axios";

const api = axios.create({
    baseURL: "/api",
    timeout: 1000, // 통신이 오래 걸리면 통신 종료
})

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            // access token 이 없는 경우 로그인 페이지로 이동
            window.location.href = '/login';
            return config;
        }

        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        if (response.status === 400) {
            console.log("404 error");
        }
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {

            const accessToken = localStorage.getItem("accessToken");

            error.config.headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            }

            // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
            return await axios.request(error.config);
        }

        return Promise.reject(error);
    }
)