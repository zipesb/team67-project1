import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const ClassPage = () =>
{
    const [ pagename, setName ] = useState('');
    const [ pagedescription, setDescription ] = useState('');
    const [ pagehtmlcontent, setHtmlContent ] = useState('');
    const [ pageowner, setOwner ] = useState('');
    const [ pageeditors, setEditors ] = useState([]);
    const [ pagemembers, setMembers ] = useState([]);

    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/getClass/'+id)
            .then(resp => {
                setName(resp.data.name);
                setDescription(resp.data.description);
                setHtmlContent(resp.data.htmlContent);
                setOwner(resp.data.owner);
                setEditors(resp.data.editors);
                setMembers(resp.data.members);
            })
            .catch(function(err) {
                console.log(err);
            })
    }, []);

    return (
        <>
            <h1>{pagename}</h1>
            <h2>{pagedescription}</h2>
            <h3>{pagehtmlcontent}</h3>
        </>
    )

}

export default ClassPage;