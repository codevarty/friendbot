import React, {useEffect, useState} from "react";
import ChatHeader from "./ChatHeader.jsx";
import MessageContainer from "./MessageContainer.jsx";
import SearchBar from "../../component/chat/SearchBar.jsx";
import sendMessage from "../../utils/message.js";


const Main = () => {
    const [prompt, setPrompt] = useState('');
    const [type, setType] = useState('speaker');
    const [chat, setChat] = useState([]);
    const [loading, setLoading] = useState(false);

    const promptHandler = async () => {// 프롬프트 초기화
        if (prompt.length === 0) {
            return;
        }

        setLoading(true);

        setChat(current => [...current, {type: "user", content: prompt}])
        setPrompt(''); // 입력값 초기화

        let data = {
            type: type,
            content: prompt,
        }

        try {
            const message = await sendMessage(data);

            setChat(current => [...current, {type: "bot", content: message}])
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <div className="grow p-8 flex flex-col justify-between">
            {/* 헤더 부분 */}
            <ChatHeader setType={setType}/>
            {/* 사용자 질문 및 GPT 응답 부분 */}
            <MessageContainer chatList={chat}/>
            {/* 사용자 프롬프트 입력 부분 */}
            <SearchBar
                loading={loading}
                prompt={prompt}
                setPrompt={setPrompt}
                type={type}
                setChat={setChat}
                promptHandler={promptHandler}
            />
        </div>
    )
}

export default Main;