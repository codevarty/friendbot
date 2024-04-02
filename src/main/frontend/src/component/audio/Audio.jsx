import React, {useEffect, useState} from "react";
import axios from "axios";
import {ReactMediaRecorder} from "react-media-recorder";
import {getSpeech, pauseSpeech} from "./TTS";
import AudioButton from "../button/AudioButton.jsx";

const Audio = ({setAnswer}) => {
    // 음성 인식후 텍스트 반환값
    // Blob -> Binary Large Object: 파일이나 블롭 형태의 이진 데이터
    const [audioBlob, setAudioBlob] = useState(null);

    const [isToggle, setIsToggle] = useState(true);


    //음성 변환 목소리 preload
    useEffect(() => {
        window.speechSynthesis.getVoices(); // 딜레이를 줄이기 위해 사용
    }, []);

    useEffect(() => {
        uploadAudio();
    }, [audioBlob]);

    const handlePause = () => {
        getSpeech(pauseSpeech()); // TTS 음성 종료하기
    }

    const handleToggle = () => {
        setIsToggle((current) => !current)
    }

    const uploadAudio = () => {
        if (audioBlob) {
            const formData = new FormData();
            formData.append("file", audioBlob, "audio-recording.wav");

            axios.post("http://localhost:8090/api/chatGpt/question", formData)
                .then((resp) => {
                    const txt = resp.data.choices[0].message.content;
                    setAnswer(txt);
                    getSpeech(txt)
                }).catch((error) => {
                alert(error);
            })
        }
    }

    return (
        <div>
            <h2>음성 녹음 및 다운로드</h2>

            <ReactMediaRecorder
                audio
                onStop={(blobUrl, blob) => {
                    setAudioBlob(blob);
                }}
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <div>
                        <p>{status}</p>
                        <AudioButton isToggle={isToggle} onClick={() => {
                            handleToggle();
                            if (isToggle) {
                                startRecording();
                            } else {
                                stopRecording();
                            }
                        }}/>
                    </div>
                )}/>
        </div>
    );
}

export default Audio;