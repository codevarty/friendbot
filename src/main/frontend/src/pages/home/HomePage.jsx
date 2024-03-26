import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Fragment, useState} from "react";
import axios from "axios";
import {Alert} from "react-bootstrap";
import AudioFileUpload from "../../component/audio/AudioFileUpload.jsx";


const HomePage = () => {
    const [prompt, setPrompt] = useState('')
    const [answer, setAnswer] = useState('');
    const [show, setShow] = useState(false);

    const sendMessage = () => {
        let data = {
            message: prompt,
        }
        // axios 를 통해 서버 컨트롤러와 통신을 한다.
        axios.post("http://localhost:8090/api/chatGpt/prompt", data)
            .then(response => {
                if (response.status !== 200) {
                    throw Error("잘못된 응답입니다.")
                    return
                }
                let message = response.data.choices[0].message.content
                setAnswer(message)
                setShow(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <Fragment>

            <Alert show={show} variant="light">
                <Alert.Heading>GPT 응답</Alert.Heading>
                <p>{answer}</p>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-success">
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
                <Button as="input" variant="secondary" size="sm" type="submit" value="제출" onClick={sendMessage}/>
            </InputGroup>
            <hr/>
            <AudioFileUpload/>
        </Fragment>
    );
}

export default HomePage;