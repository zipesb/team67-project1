import React, { useEffect, useState } from 'react'; // Hooks for functional components
import axios from 'axios'; // Cleaner way of sending http requests
import { useNavigate } from 'react-router-dom';



const CreatePage = () =>
{
    const [ pagename, setPageName ] = useState('');
    const [ pagedescription, setPageDescription ] = useState('');
    // TODO: What else do we want..? Some content to add in advance? Tags? Description?

    const navigate = useNavigate();

    const onChangePageName = (e) => setPageName(e.target.value);

    const onChangePageDescription = (e) => setPageDescription(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();

        // Store new paga data in JSON
        const newpage = {
            name: pagename,
            description: pagedescription,
            content: ''
        }

        // Send HTTP request using axios
        axios.post('http://localhost:5000/create', newpage)
            .then(res => 
                //console.log(res.data)
                navigate('/view/'+res.data._id)
            );

        // Reset values
        //setPageName('');
        //setPageDescription('');
    }

    return (
        <>
            <h1>Create a Class Page </h1>
            <form action="">
                <input  type="text" 
                        placeholder="Name" 
                        value={pagename} 
                        onChange={onChangePageName} 
                        />
                <br/>
                <input  type="text" 
                        placeholder="Description" 
                        value={pagedescription} 
                        onChange={onChangePageDescription} />
                <br/>
                <button type="submit" 
                        onClick={onSubmit}>Create</button>
            </form>
        </>
    )

}

export default CreatePage;