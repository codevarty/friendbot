import React from "react";

// eslint-disable-next-line react/prop-types
const MessageContainer = ({chatList}) => {

    return (
        <div>
            {/* eslint-disable-next-line react/prop-types */}
            {chatList !== null && chatList.map((chat, index) => (
                <div key={index}>
                    <div
                    >
                        {chat.content}
                    </div>
                </div>
            ))}
        </div>
    )
}


export default MessageContainer;