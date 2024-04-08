import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {Alert} from "react-bootstrap";
import Audio from "../../component/audio/Audio.jsx";
import {getSpeech} from "../../component/audio/TTS.js";


const HomePage = () => {
    const [prompt, setPrompt] = useState('')
    const [type, setType] = useState('speaker');
    const [answer, setAnswer] = useState('');
    const [show, setShow] = useState(false);

    // //음성 변환 목소리 preload
    useEffect(() => {
        window.speechSynthesis.getVoices(); // 딜레이를 줄이기 위해 사용
    }, []);

    useEffect(() => {
        if (answer) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [answer]);

    const handleSelectChange = (event) => {
        console.log(event.target.value)
        setType(event.target.value)
    }

    const sendMessage = () => {
        let data = {
            type: type,
            content: prompt,
        }
        console.log("request data", data)
        // axios 를 통해 서버 컨트롤러와 통신을 한다.
        axios.post("http://localhost:8090/api/chatGpt/prompt", data)
            .then(response => {
                if (response.status !== 200) {
                    throw Error("잘못된 응답입니다.")
                }
                let message = response.data.choices[0].message.content
                getSpeech(message);
                setAnswer(message)
            })
            .catch(err => console.log(err))
    }

    return (
        <Fragment>

            <Alert show={show} variant="light">
                <Alert.Heading>GPT 응답</Alert.Heading>
                <p>{answer}</p>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => {
                        setAnswer('');
                        setShow(false)
                    }} variant="outline-success">
                        Confirm
                    </Button>
                </div>
            </Alert>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="질문할 텍스트를 입력해주세요."
                    aria-label="질문할 텍스트를 입력해주세요."
                    aria-describedby="basic-addon2"
                    value={prompt}
                    onChange={c => setPrompt(c.target.value)}
                />
                <Form.Select aria-label="Select Role"
                             size="sm"
                             style={{flex: 'none', width: '120px'}}
                             onChange={handleSelectChange}
                >
                    <option value="speaker">영어 회화</option>
                    <option value="teacher">진로 상담</option>
                    <option value="counselor">심리 상담</option>
                </Form.Select>
                <Button as="input" variant="secondary" size="sm" type="submit" value="제출" onClick={sendMessage}/>
            </InputGroup>
            <hr/>
            <Audio setAnswer={setAnswer}/>
        </Fragment>
    );
}

export default HomePage;