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
        const {config, response: {status, data}} = error
        if (status === 401 && data.message === "InvalidToken") {
            logout()
        }

        if (status === 401 && data.message === "ExpiredToken") {
            try {
                const tokenRefreshResult = await api.post('/refresh-token');
                if (tokenRefreshResult.status === 200) {
                    // 아래 부분 수정이 필요하다.
                    const {accessToken, refreshToken} = tokenRefreshResult.data
                    // 새로 발급받은 토큰을 스토리지에 저장
                    localStorage.setItem('accessToken', accessToken);
                    localStorage.setItem('refreshToken', refreshToken);
                    // 토큰 갱신 성공. API 재요청
                    return api(config)
                } else {
                    logout();
                }
            } catch (e) {
                logout();
            }
        }

        return Promise.reject(error);
    }
)

function logout() {
    localStorage.clear()
}