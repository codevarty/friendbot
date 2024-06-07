import {useEffect, useState} from "react";
import classes from "../../style/chat/Main.module.css";
import SearchBar from "../../component/chat/SearchBar.jsx";
import axios from "axios";
import ChatHeader from "./ChatHeader.jsx";
import MessageContainer from "./MessageContainer.jsx";

const Main = () => {

    const [prompt, setPrompt] = useState('');
    const [type, setType] = useState('speaker');
    const [chat, setChat] = useState([]);

    // //음성 변환 목소리 preload
    useEffect(() => {
        window.speechSynthesis.getVoices(); // 딜레이를 줄이기 위해 사용
    }, []);

    const sendMessage = () => {// 프롬프트 초기화

        setChat(current => [...current, {type: "user", content: prompt}])
        setPrompt(''); // 입력값 초기화

        let data = {
            type: type,
            content: prompt,
        }
        console.log("request data", data)
        // axios 를 통해 서버 컨트롤러와 통신을 한다.
        // 서버 url 관리 할 수 있도록 한다.
        axios.post("http://localhost:8090/api/chatGpt/prompt", data)
            .then(response => {
                if (response.status !== 200) {
                    throw Error("잘못된 응답입니다.")
                }
                let message = response.data.choices[0].message.content // GPT 응답 내용
                setChat(current => [...current, {type: "bot", content: message}])
                console.log(message);
                // getSpeech(message);
            })
            .catch(err => console.log(err))
    }
    return (
        <div className={classes.root}>
            {/* 헤더 부분 */}
            <ChatHeader setType={setType}/>
            {/* 사용자 질문 및 GPT 응답 부분 */}
            <MessageContainer chatList={chat}/>
            {/* 사용자 프롬프트 입력 부분 */}
            {/*<SearchBar prompt={prompt}*/}
            {/*           setPrompt={setPrompt}*/}
            {/*           onClick={sendMessage}/>*/}
        </div>
    )
}

export default Main;