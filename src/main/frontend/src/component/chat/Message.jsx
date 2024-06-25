import React from "react";
import {getSpeech} from "../audio/TTS.js";
import TextToSpeakButton from "../button/TextToSpeakButton.jsx";

const Message = ({type, content}) => {

    const audioHandler = () => {
        getSpeech(content)
    }

    return (
        <li className={`flex items-center ${type === 'user' ? 'justify-end' : ''} mb-4 h-auto`}>
            <div className={`${type === 'user' ? 'bg-blue-100' : 'bg-white'}
            py-2.5 px-4 rounded-md max-w-xl h-auto shadow-md break-all text-[#495057]`}>
                {content}
            </div>
            {type !== 'user' && <TextToSpeakButton audioHandler={audioHandler}/>}
        </li>);
}

export default Message;