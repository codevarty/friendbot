// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import codes from '../../assets/codes.jpg';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async (e) => {
        // 새로 고침 방지
        e.preventDefault();

        if (!email || !password) {
            alert("이메일과 비밀번호를 입력해주세요.");
            setEmail('');
            setPassword('');
            return;
        }

        const data = {
            email,
            password,
        }
        try {
            const response = await axios.post("/api/user/login", data, {
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (response.status === 200) {
                const accessToken = response.headers.get('Authorization');
                const refreshToken = response.headers.get('Authorization-refresh');

                // token이 있어야 한다.
                if (!accessToken || !refreshToken) {
                    alert('Failed to login');
                    return;
                }

                // token 저장
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                navigate("/") // 메인 페이지로 이동
            }
        } catch (error) {
            alert(error)
            console.log(error)
        } finally {
            setEmail('');
            setPassword('');
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl
            rounded-2xl md:flex-row md:space-y-0">
                <form onSubmit={loginHandler} className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold">Login page</span>
                    <span className="font-light text-gray-400 mb-8">
                        Welcome back! Please enter your details
                    </span>
                    <div className="py-4">
                        <span className="mb-2 text-md">Email</span>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md
                            placeholder:font-light placeholder:text-sm placeholder:text-gray-500"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email"
                            id="email"/>
                    </div>
                    <div className="py-4">
                        <span className="mb-2 text-md">Password</span>
                        <input
                            type="password"
                            name="pass"
                            className="w-full p-2 border border-gray-300 rounded-md
                            placeholder:font-light placeholder:text-sm placeholder:text-gray-500"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                        />
                    </div>
                    <div className="text-sm flex justify-end w-full py-4">
                        <Link to="/find-pwd" className="hover:underline">Forgot password</Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white p-2 rounded-lg mb-6
                    hover:bg-gray-700">
                        Sign in
                    </button>
                    <div className="text-left text-sm text-gray-400">
                        Don't have an account?
                        <Link to="/api/user/signup" className="ml-2 hover:underline">Sign up for free</Link>
                    </div>
                </form>
                <div className="relative">
                    <img
                        src={codes || ""}
                        className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
                        alt="login-bg"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;