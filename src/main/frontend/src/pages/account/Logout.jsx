import {useNavigate} from "react-router-dom";
import api from "../../utils/api.js";
import {useEffect} from "react";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        try {
            const response = await api.post("/api/logout", null, {
                headers: {
                    "Authorization-refresh": `Bearer ${localStorage.getItem("refreshToken")}`
                },
            });
            if (response.status === 200) {
                localStorage.removeItem("accessToken")
                localStorage.removeItem("refreshToken");

                alert("로그아웃 되었습니다.")
                navigate("/")
            }

        } catch (e) {
            console.error(e)
            alert("로그아웃에 실패하였습니다.")
            navigate("/")
        }
    }
}

export default Logout