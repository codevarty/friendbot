import {useEffect, useState} from "react";
import classes from "../../style/chat/Main.module.css";
import SearchBar from "../../component/chat/SearchBar.jsx";
import axios from "axios";
import ChatHeader from "./ChatHeader.jsx";
import MessageContainer from "./MessageContainer.jsx";

const Main = () => {

    const [prompt, setPrompt] = useState('');
    const [type, setType] = useState('speaker');
    // const [answer, setAnswer] = useState('');
    // const [show, setShow] = useState(false);

    // //음성 변환 목소리 preload
    useEffect(() => {
        window.speechSynthesis.getVoices(); // 딜레이를 줄이기 위해 사용
    }, []);

    // useEffect(() => {
    //     if (answer) {
    //         setShow(true)
    //     } else {
    //         setShow(false)
    //     }
    // }, [answer]);

    // const handleSelectChange = (event) => {
    //     console.log(event.target.value)
    //     setType(event.target.value)
    // }

    const sendMessage = () => {
        let data = {
            // type: type,
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
                let message = response.data.choices[0].message.content
                // getSpeech(message);
            })
            .catch(err => console.log(err))
    }
    return (
        <div className={classes.root}>
            <ChatHeader setType={setType}/>
            <MessageContainer/>
            {/*<Form.Select aria-label="Select Role"*/}
            {/*             size="sm"*/}
            {/*             style={{flex: 'none', width: '120px'}}*/}
            {/*             onChange={handleSelectChange}*/}
            {/*>*/}
            {/*    <option value="speaker">영어 회화</option>*/}
            {/*    <option value="teacher">진로 상담</option>*/}
            {/*    <option value="counselor">심리 상담</option>*/}
            {/*</Form.Select>*/}
            <SearchBar prompt={prompt}
                       setPrompt={setPrompt}
                       onClick={sendMessage}/>
        </div>
    )
}

export default Main;