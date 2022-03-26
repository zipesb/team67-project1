import React, { Component } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import styled from "styled-components";
import axios from 'axios';

export default class PageEditor extends Component {
    constructor(props) {
        super(props);
        const html = this.props.initialContent;
        const contentBlock = htmlToDraft(html || "");

        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }

    onEditorStateChange = (editorState) => {
        console.log(editorState);
        this.setState({
            editorState,
        });
    };

    saveHTMLContent() {
        const { editorState } = this.state;
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const body = {id: this.props.id, htmlContent: html}
        axios.post('http://localhost:5000/updateClassContent', body).then(response => console.log(response))
    }

    render() {
        const { editorState } = this.state;
        const Button = styled.button`
            background-color: black;
            color: white;
            font-size: 20px;
            padding: 10px 60px;
            border-radius: 5px;
            margin: 10px 0px;
            cursor: pointer;
            `;
        return (
            <div>
                <Button onClick={this.saveHTMLContent.bind(this)}>Save</Button>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}