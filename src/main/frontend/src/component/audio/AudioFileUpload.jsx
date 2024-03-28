import React, {useEffect, useState} from "react";
import axios from "axios";
import {ReactMediaRecorder} from "react-media-recorder";
import {getSpeech, pauseSpeech} from "./TTS";

const AudioFileUpload = () => {
    // 음성 인식후 텍스트 반환값
    const [text, setText] = useState('');
    // Blob -> Binary Large Object: 파일이나 블롭 형태의 이진 데이터
    const [audioBlob, setAudioBlob] = useState(null);

    const [loading, setLoading] = useState(false);

    // //음성 변환 목소리 preload
    useEffect(() => {
        window.speechSynthesis.getVoices(); // 딜레이를 줄이기 위해 사용
    }, []);

    const handlePause = () => {
        getSpeech(pauseSpeech()); // TTS 음성 종료하기
    }

    const uploadAudio = () => {
        setLoading(true);
        if (audioBlob) {
            const formData = new FormData();
            formData.append("file", audioBlob, "audio-recording.wav");

            axios.post("http://localhost:8090/api/chatGpt/question", formData)
                .then((resp) => {
                    const txt = resp.data.choices[0].message.content;
                    setText(txt);
                    setLoading(false);
                    getSpeech(txt)
                }).catch((error) => {
                setLoading(false);
                alert(error);
            })
        }
    }

    return (
        <div>
            <h2>음성 녹음 및 다운로드</h2>

            <button onClick={handlePause}>음성 종료하기</button>

            <ReactMediaRecorder
                audio
                onStop={(blobUrl, blob) => {
                    setAudioBlob(blob);
                }}
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={() => {
                            stopRecording();
                            uploadAudio(); // TODO: 음성 버튼을 두번 눌러야 하는 문제 발생 useEffect 사용 고려
                        }}>Stop and Upload
                        </button>
                    </div>
                )}/>

            <hr/>
            <h3>결과: {text}</h3>
            {loading && <h3> 응답을 기다리고 있습니다.</h3>}
        </div>
    );
}

export default AudioFileUpload;