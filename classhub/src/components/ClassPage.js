import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ResourceView from "./ResourceView";
import io from "socket.io-client"
import PageEditor from "./PageEditor"
import PageViewer from "./PageViewer"
import Chatbox from "./Chatbox";

const ClassPage = () =>
{
    const [ pageclass, setClass ] = useState({});
    const [ isEditor, setIsEditor ] = useState(false);
    const [ isEditing, setEditing ] = useState(false);
    const { id } = useParams();
    
    const socket = io.connect("http://localhost:5001");
    const loggedInUser = localStorage.getItem("username");

    const joinChat = () => {
        socket.emit("join_chat", id);
    };

    const loadClass = () => {
        axios.get('http://localhost:5000/getClass/' + id)
            .then(resp => {
                setClass(resp.data)
                setIsEditor(resp.data.editors.includes(loggedInUser));
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    const toggleEdit = () => {
        loadClass(); //to update any edits
        setEditing(!isEditing);
    }

    useEffect(() => {
        loadClass(); //to initialize class data
        joinChat();
    }, []);


    return (
        <div>
            {isEditing ? <PageEditor class={pageclass} onclick={toggleEdit} />
                : <PageViewer class={pageclass} onclick={toggleEdit} />}

            <ResourceView class={pageclass} />
            <Chatbox socket={socket} username={loggedInUser} class_id={id} />
        </div>
    )

}

export default ClassPage;