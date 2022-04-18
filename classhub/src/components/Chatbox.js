/**
 * CODE IN THIS FILE WAS HEAVILY ADAPTED FROM THE FOLLOWING YOUTUBE TUTORIAL:
 * youtube.com/watch?v=NU-HfZY3ATQ&ab_channel=PedroTech
 * 
 */
import "./Chatbox.css"
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chatbox({ socket, username, class_id }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [hidden, setHidden] = useState(true);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                sender: username,
                class_id: class_id,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_chat_message", messageData);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_chat_message", (data) => {
            setMessages((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chatbox"
            id={hidden ? "chatbox-hidden" : ""}>
            <div className="chat-header" onClick={(e) => { setHidden(!hidden) }}>
                <p>Chatbox</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                    {messages.map((message) => {
                        return (
                            <div
                                className="message"
                                id={username === message.sender ? "other" : "you"}
                            >
                                <div>
                                    <div className="message-text">
                                        <p>{message.message}</p>
                                    </div>
                                    <div className="message-info">
                                        <p id="time">{message.time}</p>
                                        <p id="sender">{message.sender}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                {
                    username == null || username === "" ?
                        <div className="login">Login To Use Chat</div>
                        :
                        <>
                            <input
                                type="text"
                                value={currentMessage}
                                onChange={(event) => {
                                    setCurrentMessage(event.target.value);
                                }}
                                onKeyPress={(event) => {
                                    event.key === "Enter" && sendMessage();
                                }}
                            />
                            <button onClick={sendMessage}>&#9658;</button>
                        </>
                }

            </div>
        </div>
    );
}

export default Chatbox;