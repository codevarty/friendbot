// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import codes from "../../assets/codes.jpg";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        birthdate: '',
    })

    const signupHandler = async (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password || !form.birthdate) {
            alert("해당 정보를 모두 입력해주세요.")
            setForm({
                username: '',
                email: '',
                password: '',
                birthdate: '',
            });
            return;
        }

        const data = JSON.stringify(form);

        try {
            const response = await axios.post("/api/user/signup", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                alert("회원가입 되었습니다.");
                navigate("/");
            }
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl
            rounded-2xl md:flex-row md:space-y-0">
                <form onSubmit={signupHandler} className="flex flex-col justify-center p-8 md:p-14">
                    <span className="mb-3 text-4xl font-bold">Sign Up</span>
                    <span className="font-light text-gray-400 mb-4">
                        Enter your information to register
                    </span>
                    <div className="py-4">
                        <span className="mb-2 text-md">Name</span>
                        <input
                            type="username"
                            name="username"
                            className="w-full p-2 border border-gray-300 rounded-md
                            placeholder:font-light placeholder:text-sm placeholder:text-gray-500"
                            value={form.username}
                            onChange={(e) => setForm({...form, username: e.target.value})}
                            placeholder="name"
                        />
                    </div>
                    <div className="py-4">
                        <span className="mb-2 text-md">Email</span>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-md
                            placeholder:font-light placeholder:text-sm placeholder:text-gray-500"
                            name="email"
                            value={form.email}
                            onChange={(e) => setForm({...form, email: e.target.value})}
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
                            value={form.password}
                            onChange={(e) => setForm({...form, password: e.target.value})}
                            placeholder="password"
                        />
                    </div>
                    <div className="py-4 mb-4">
                        <span className="mb-2 text-md">BirthDay</span>
                        <input
                            type="date"
                            name="birthdate"
                            className="w-full p-2 border border-gray-300 rounded-md
                            placeholder:font-light placeholder:text-sm placeholder:text-gray-500"
                            value={form.birthdate}
                            onChange={(e) => setForm({...form, birthdate: e.target.value})}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white p-2 rounded-lg mb-2
                    hover:bg-gray-200 hover:text-black hover:font-semibold">
                        Sign up
                    </button>
                    <div className="text-left pr-24 text-sm text-gray-400">
                        Already have an account?
                        <Link to="/login" className="ml-2 hover:underline">Login</Link>
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

export default Signup;