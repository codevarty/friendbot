import axios from "axios";

const api = axios.create({
    timeout: 1000, // 통신이 오래 걸리면 통신 종료
})

export default api;

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            // access token 이 없는 경우 로그인 페이지로 이동
            window.location.href = '/login';
            return config;
        }

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
        if (status === 401 && data === "InvalidToken") {
            logout()
        }

        if (status === 401 && data === "ExpiredToken") {
            try {
                const tokenRefreshResult = await api.post('/api/refresh-token', null, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization-refresh': `Bearer ${localStorage.getItem('refreshToken')}`
                    }
                });
                if (tokenRefreshResult.status === 200) {
                    // 아래 부분 수정이 필요하다.
                    const accessToken = tokenRefreshResult.headers.get('Authorization');
                    const refreshToken = tokenRefreshResult.headers.get('Authorization-refresh');

                    if (!accessToken || !refreshToken) {
                        logout();
                        return
                    }
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