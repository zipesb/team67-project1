import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ResourceView from "./ResourceView";
import io from "socket.io-client"
import PageEditor from "./PageEditor"
import PageViewer from "./PageViewer"
import Chatbox from "./Chatbox";
import StarRating from "./StarRating";

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
        <div style={{ background: "linear-gradient(180deg, #27A3A7 0%, #365580 100%)", minHeight: "100vh", height: "auto" }}>
            {isEditing  ? <PageEditor class={pageclass} onclick={toggleEdit} />
                        : <PageViewer style={{backgroundColor: "white"}} class={pageclass} onclick={toggleEdit} allowEdit={isEditor}/>}

            <ResourceView class={pageclass} />
            <Chatbox socket={socket} username={localStorage.getItem("username")} class_id={id} />
            <StarRating class = {pageclass}/>
        </div>
    )

}

export default ClassPage;