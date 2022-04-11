import React, { Component } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import axios from 'axios';


export default class ResourceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            isFilePicked: false,
        }
    }

    handeleFileChange(e) {
        this.setState({
            selectedFile: e.target.files[0],
            isFilePicked: true,
        });
    }

    handleFileUpload() {
        const file = this.state.selectedFile;
        const fd = new FormData();
        fd.append('resource', file, file.name);
        fd.append('class_id', this.props.class._id);
        axios
            .post('http://localhost:5000/api/resource/upload', fd)
                .then(({ data }) => {
                    console.log(data);
                })
                .catch((error) => { console.log(error) });
    }

    render() {
        var listItems;
        if(this.props.class.resources != null) {
         listItems = this.props.class.resources.map(
            function (e) {
                const link = "http://localhost:5000/api/resource/" + e.id;
                return <li><a href={link}>{e.filename}</a></li>
            }
        
        );
        } else {
            listItems = <div></div>;
        }

        const Button = styled.button`
        background-color: black;
        color: white;
        font-size: 20px;
        padding: 10px 60px;
        border-radius: 5px;
        margin: 10px 0px;
        cursor: pointer;
        disabled: true;
        `;

        return (
            <div>
                <h2>Resources</h2>
                <ul>{listItems}</ul>
                <div>
                    <h3>Upload New File</h3>
                    <form>
                        <input type="file" onChange={this.handeleFileChange.bind(this)} />
                        {
                            this.state.isFilePicked ? <Button onClick={this.handleFileUpload.bind(this)}>Submit</Button> : <></>
                        }
                    </form>
                </div>
            </div>
        );
    }
}