import React from 'react';
import LightDarkToggleButton from "../../component/button/LightDarkToggleButton.jsx";


const ChatHeader = ({setType}) => {

    return (
        <header className="w-full mb-4 flex items-center justify-between">
            <select
                className="border border-gray-200 rounded-lg p-1.5 dark:bg-gray-600 dark:border-gray-400 dark:text-white"
                // Custom Select
                onChange={event => {
                    setType(event.target.value)
                }}
            >
                <option value="speaker">영어 회화</option>
                <option value="counselor">심리 상담사</option>
                <option value="teacher">진로 멘토</option>
                <option value="friendr">친구</option>
            </select>

            <LightDarkToggleButton/>
        </header>
    )
}

export default ChatHeader;