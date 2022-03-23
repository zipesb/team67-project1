import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const ClassPage = () =>
{
    const [ pagename, setPageName ] = useState('');
    const [ pagedescription, setPageDescription ] = useState('');
    const [ pagecontent, setPageContent ] = useState('');
    // TODO: What else do we want..? Some content to add in advance? Tags? Description?

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/'+id)
            .then(resp => {
                setPageName(resp.data.name);
                setPageDescription(resp.data.description);
                setPageContent(resp.data.content);
            })
            .catch(function(err) {
                console.log(err);
            })
    }, []);

    return (
        <>
            <h1>{pagename}</h1>
            <h2>{pagedescription}</h2>
            <h3>{pagecontent}</h3>
        </>
    )

}

export default ClassPage;