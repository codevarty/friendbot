import React, {useEffect, useState} from "react";
import Main from "../chat/Main.jsx";
import Sidebar, {SidebarItem} from "../side/Sidebar.jsx";
import api from "../../utils/api.js";


const HomePage = () => {
    const accessToken = localStorage.getItem("accessToken");
    const [username, setUsername] = useState('');

    const getUsernameHandler = async () => {
        try {
            const response = await api.get("/api/user/username", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                setUsername(response.data)
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (accessToken) {
            getUsernameHandler();
        }
    }, []);

    return (
        <div className="w-screen flex dark:bg-gray-800">
            <Sidebar username={username}>
                <hr className="my-3 dark:border-gray-400"/>
                <SidebarItem icon={<svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M5 12h14m-7 7V5"/>
                </svg>
                }
                             text="new Chat"
                />
            </Sidebar>
            <Main/>
        </div>
    );
}

export default HomePage;