import React, {useState} from "react";
import axios from "axios";
import {ReactMediaRecorder} from "react-media-recorder";

const AudioFileUpload = () => {
    // 음성 인식후 텍스트 반환값
    const [text, setText] = useState('')

    const fileUpload = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", document.frm.upload.files[0])

        axios.post("http://localhost:8090/api/chatGpt/question", formData)
            .then((resp) => {
                setText(resp.data.text);
            }).catch((error) => {
            alert(error);
        })
    }

    return (
        <div>
            <h2>음성 녹음 및 다운로드</h2>

            <ReactMediaRecorder
                audio
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <div>
                        <p>{status}</p>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        <br/>
                        {/* 녹음 파일 들어보기 */}
                        <audio src={mediaBlobUrl}> controls</audio>
                        <br/>
                        {/* 녹음 파일 다운로드 */}
                        <a href={mediaBlobUrl} download="myvoice.wav">File Download</a>
                    </div>
                )}/>

            <hr/>
            <h2>파일 업로드 및 텍스트 변환</h2>

            <form name="frm" onSubmit={fileUpload} encType="multipart/form-data">
                <input type='file' name='upload' accept='*'/>
                <input type='submit' value='upload'/>
            </form>

            <h3>결과: {text}</h3>
        </div>
    );
}

export default AudioFileUpload;