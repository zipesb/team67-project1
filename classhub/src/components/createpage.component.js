import React, { useEffect, useState } from 'react'; // Hooks for functional components
import axios from 'axios'; // Cleaner way of sending http requests
import { useNavigate } from 'react-router-dom';



const CreatePage = () =>
{
    const [ pagename, setName ] = useState('');
    const [ pagedescription, setDescription ] = useState('');
    const [ pagehtmlContent, setHtmlContent ] = useState('');
    const [ pageowner, setOwner ] = useState(''); //placeholder
    const [ pageeditors, setEditors ] = useState([]);
    const [ pagemembers, setMembers ] = useState([]);

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
    const onRemoveEditor = (index) => {
        setEditors([...pageeditors.filter(editor => pageeditors.indexOf(editor) !== index)]);
    }

    const onAddMember = (e) => {
        if (e.key === "Enter" && e.target.value !== "") {
            setMembers([...pagemembers, e.target.value]);
            e.target.value = "";
        }
}
    const onRemoveMember = (index) => {
        setMembers([...pagemembers.filter(member => pagemembers.indexOf(member) !== index)]);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // Store new paga data in JSON
        const newpage = {
            name: pagename,
            description: pagedescription,
            htmlContent: pagehtmlContent,
            owner: pageowner,
            editors: pageeditors,
            members: pagemembers
        }

        // Send HTTP request using axios
        axios.post('http://localhost:5000/createClass', newpage)
            .then(res => 
                navigate('/view/'+res.data._id) //maybe move out of callback
            );
        
        // Reset values
        //setPageName('');
        //setPageDescription('');
    }

    return (
        <div className="create-page">
            <h1>Create a new Class</h1>
            <form action="">
                <input  type="text" 
                        placeholder="Class Name.." 
                        value={pagename} 
                        onChange={onChangeName} 
                        />
                <input  type="text" 
                        placeholder="Class Description.." 
                        value={pagedescription} 
                        onChange={onChangeDescription} />
                    <ul>
                        {pageeditors.map((editor, index) => (
                            <li key={index}>
                                <span>{editor}</span>
                                <i className="material-icons"
                                onClick={() => onRemoveEditor(index)}>close</i>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Add editors"
                        onKeyUp={onAddEditor}
                    />
                    <ul>
                        {pagemembers.map((member, index) => (
                            <li key={index}>
                                <span>{member}</span>
                                <i className="material-icons"
                                onClick={() => onRemoveMember(index)}>close</i>
                            </li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Add members"
                        onKeyUp={onAddMember}
                    />
                <input  type="submit"
                        value="Create Page"
                        onClick={onSubmit}
                />
            </form>
        </div>
    )

}

export default CreatePage;