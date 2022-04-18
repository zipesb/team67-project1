import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import ResourceView from "./ResourceView";

import PageEditor from "./PageEditor"
import PageViewer from "./PageViewer"

const ClassPage = () =>
{
    const [ pageclass, setClass ] = useState({});
    const [ isEditor, setIsEditor ] = useState(false);
    const [ isEditing, setEditing ] = useState(false);

    const loggedInUser = localStorage.getItem("username");
    const { id } = useParams();

    const loadClass = () => {
        axios.get('http://localhost:5000/getClass/'+id)
            .then(resp => {
                setClass(resp.data)
                setIsEditor(resp.data.editors.includes(loggedInUser));
            })
            .catch(function(err) {
                console.log(err);
            });
    }

    const toggleEdit = () => {
        loadClass(); //to update any edits
        setEditing(!isEditing);
    }

    useEffect(() => {
        loadClass(); //to initialize class data
     }, []);


    return (
        <div>
            {isEditing  ? <PageEditor class={pageclass} onclick={toggleEdit}/> 
                        : <PageViewer class={pageclass} onclick={toggleEdit}/>}
                        
<ResourceView class={pageclass}/>
        </div>
    )

}

export default ClassPage;
