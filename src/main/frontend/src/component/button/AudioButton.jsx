// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import sendMessage from "../../utils/message.js";
import {ReactMediaRecorder} from "react-media-recorder";

// eslint-disable-next-line react/prop-types
const AudioButton = ({type, setChat}) => {
    const [audioBlob, setAudioBlob] = useState(null);

    const [canPlay, setCanPlay] = useState(true);

    useEffect(() => {
        window.speechSynthesis.getVoices();
    }, []);

    useEffect(() => {
        uploadAudio();
    }, [audioBlob]);

    const uploadAudio = async () => {
        if (audioBlob) {
            console.log(audioBlob);
            const formData = new FormData();
            formData.append("file", audioBlob, "audio-recording.wav");

            const data = {
                type: type,
                file: formData.get("file"), // 파일을 받는다.
            }

            try {
                const message = await sendMessage(data);
                setChat(current => [...current, {type: "bot", content: message}])
            } catch (error) {
                console.log(error);
            }
        }
    }


    const playHandler = () => {
        setCanPlay(prev => !prev)
    }

    // 일단 임시로 하자.
    return (
        <ReactMediaRecorder
            audio
            onStop={(blobUrl, blob) => {
                setAudioBlob(blob);
            }}
            render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                <button className="absolute start-3 bottom-3.5 hover:cursor-pointer"
                        onClick={() => {
                            playHandler();
                            canPlay ? startRecording() : stopRecording();
                        }}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-7">
                        <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z"/>
                        <path
                            d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z"/>
                    </svg>
                </button>)}/>
    );
}

export default AudioButton;