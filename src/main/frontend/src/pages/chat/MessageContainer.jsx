import React from 'react';
import Message from "../../component/chat/Message.jsx";

// eslint-disable-next-line react/prop-types
const MessageContainer = ({chatList}) => {

    return (
        <ul className="block list-none my-4 p-2.5 w-full max-h-[560px] overflow-y-auto">
            {/* eslint-disable-next-line react/prop-types */}
            {chatList !== null && chatList.map((chat, index) => (
                <Message
                    key={index}
                    type={chat.type}
                    content={chat.content}
                />
            ))}
        </ul>
    )
}


export default MessageContainer;