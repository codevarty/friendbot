import React from 'react';
import codes from '../../assets/codes.jpg';
import {Link} from "react-router-dom";
const Login = () => {

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl
            rounded-2xl md:flex-row md:space-y-0">
                <div className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold">Login page</span>
                    <span className="font-light text-gray-400 mb-8">
                        Welcome back! Please enter your details
                    </span>
                    <div className="py-4">
                        <span className="mb-2 text-md">Email</span>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md
                            placeholder:font-light placeholder:text-sm placeholder:text-gray-500"
                            name="email"
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
                            placeholder="password"
                        />
                    </div>
                    <div className="flex justify-end w-full py-4">
                        <Link to="/" className="text-sm">Forgot password</Link>
                    </div>
                    <button className="w-full bg-black text-white p-2 rounded-lg mb-6
                    hover:bg-gray-300 hover:text-black">
                        Sign in
                    </button>
                    <div className="text-center text-gray-400">
                        Dont have an account?
                        <span className="ml-2 font-semibold text-black">Sign up for free</span>
                    </div>
                </div>
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