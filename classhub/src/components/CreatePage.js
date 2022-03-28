import React, { useEffect, useState } from 'react'; // Hooks for functional components
import axios from 'axios'; // Cleaner way of sending http requests
import { useNavigate } from 'react-router-dom';

const CreatePage = () =>
{
    const [ pagename, setName ] = useState('');
    const [ pagedescription, setDescription ] = useState('');
    const [ pagehtmlContent, setHtmlContent ] = useState('Get started with the Edit Content button below!'); //placeholder
    const [ pageowner, setOwner ] = useState('ownerplaceholder'); //placeholder
    const [ pageeditors, setEditors ] = useState([]);
    const [ pagemembers, setMembers ] = useState([]);
    const [ pageresources, setResources ] = useState([]);

    const navigate = useNavigate();

    const onChangeName = (e) => 
        setName(e.target.value);

    const onChangeDescription = (e) => 
        setDescription(e.target.value);

    //Won't allow adding htmlContent at Create Page, so I'll skip that

    //Owner shouldn't be changed-- it's inferred behind-the-scenes...somehow...TBD

    const onAddEditor = (e) => {
            if (e.key === "Enter" && e.target.value !== "") {
                setEditors([...pageeditors, e.target.value]);
                e.target.value = "";
            }
    }

    //TODO: fix duplicate slowness error
    const onRemoveEditor = (index) => {
        setEditors([...pageeditors.filter(editor => pageeditors.indexOf(editor) !== index)]);
    }

    const onAddMember = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            setMembers([...pagemembers, e.target.value]);
            e.target.value = "";
        }   
    }

    //TODO: fix duplicate slowness error
    const onRemoveMember = (index) => {
        setMembers([...pagemembers.filter(member => pagemembers.indexOf(member) !== index)]);
    }

    const onCreate = (e) => {
        e.preventDefault();

        const newpage = {
            name: pagename,
            description: pagedescription,
            htmlContent: pagehtmlContent,
            owner: pageowner,
            editors: pageeditors,
            members: pagemembers,
            resources: pageresources                // < ^ ^ redundant but w/e
        }

        axios.post('http://localhost:5000/createClass', newpage)
            .then(res => 
                navigate('/class/'+res.data._id)
            );
    }

    //Styles
    const stylingObject = {
        div: {
            margin: "auto",
            width: "75%",
            padding: "12px",
            fontFamily: "'Ubuntu', sans-serif",
            fontStyle: "normal"
        },
        desc: {
            width: "100%",
            textAlign: "left",
            fontSize: "2.5vh",
            margin: "0px",
            marginTop: "1vh"
        },
        section: {
            fontSize: "3vh",
            margin: "3vh"
        },
        input: {
            width: "100%",
            padding: "12px 20px",
            margin: "8px",
            fontSize: "2vh",
            border: "3px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
        },
        button: {
            backgroundColor: "black",
            color: "white",
            margin: "1vh",
            marginTop: "3vh",
            padding: "2vh",
            fontSize: "3vh",
            borderRadius: ".5vh",
            cursor: "pointer"
        }
    }

    const tagstyles = {
        div: {
            margin: "auto",
        },
        label: {
            display: "inline-block",
            alignItems: "left",
            fontSize: "2vh",
            padding: ".1vw",
            margin: ".2vh",
            marginRight: ".2vw",
            marginLeft: ".2vw",
            border: "1px solid grey",
            borderRadius: ".5vw",
            backgroundColor: "grey",
            whiteSpace: "nowrap",
            color: "white"
        },
        i: {
            display: "inline-block",
            fontSize: "2vh",
            padding: ".1vw",
            marginLeft: ".5vw",
            backgroundColor: "unset",
            cursor: "pointer",
            color: "white"
        }
    }

    //TODO: clean this up
    return (
        <div style={stylingObject.div}>
            <h1 style={{fontSize: "6vh"}}>Create New Class</h1>
            <form>
                <h2 style={stylingObject.section}>Class Info</h2>
                <h3 style={stylingObject.desc}>Name of Class</h3>
                <input  style={stylingObject.input}
                        type="text" 
                        placeholder="Class Name.." 
                        value={pagename} 
                        onChange={onChangeName} 
                        />
                <h3 style={stylingObject.desc}>Description of Class</h3>
                <input  style={stylingObject.input}
                        type="text" 
                        placeholder="Class Description.." 
                        value={pagedescription} 
                        onChange={onChangeDescription} />
                
                <h2 style={stylingObject.section}>User Permissions</h2>
                <h3 style={stylingObject.desc}>Add Editors</h3>
                <input  style={stylingObject.input}
                        type="text"
                        placeholder="Who can edit the class content?"
                        onKeyUp={onAddEditor}
                        />
                <div style={tagstyles.div}>
                <label style={{display: "inline-block"}}>Editor List:</label>
                    {pageeditors.map((editor, index) => (
                        <label     style={tagstyles.label}
                                    key={index}>
                                    <span>{editor}</span>
                                    <span  style={tagstyles.i}
                                        onClick={() => onRemoveEditor(index)}>⨂</span>
                        </label>
                    ))}
                </div>
                <h3 style={stylingObject.desc}>Add Members</h3>
                <input  style={stylingObject.input}
                        type="text"
                        placeholder="Who can view the class content?"
                        onKeyUp={onAddMember}
                />
                <div style={tagstyles.div}>
                    <label style={{display: "inline-block"}}>Member List:</label>
                    {pagemembers.map((member, index) => (
                        <label     style={tagstyles.label}
                                    key={index}>
                                    <span>{member}</span>
                                    <span  style={tagstyles.i}
                                        onClick={() => onRemoveMember(index)}>⨂</span>
                        </label>
                    ))}
                </div>

                <button style={stylingObject.button}
                        type="button" 
                        onClick={onCreate}>Create Class</button>
            </form>
        </div>
    )

}

export default CreatePage;