import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const PageViewer = (props) =>
{
    // Styles
    const styles = {
        header: {
            display: "inline-block",
            paddingTop: "1vh",
            width: "90%",
            /*float: "right",  //for adding the dashboard on the left*/
            fontFamily: "'Ubuntu', sans-serif",
        },
        name: {
            margin: "0px",
            fontSize: "8vh"
        },
        desc: {
            margin: "0px",
            paddingBottom: "1vh",
            fontSize: "2vh"
        },
        content: {
            margin: "0px",
            paddingLeft: "1vw",
            paddingRight: "1vw",
            paddingTop: ".2vh",
            paddingBottom: ".2vh",
            backgroundColor: "#c5c5c5", 
            textAlign: "left",
            fontSize: "2.5vh",
            fontFamily: "'Ubuntu', sans-serif",
        },
        editbutton: {
            width: "25%",
            backgroundColor: "black",
            color: "white",
            marginTop: "2vh",
            padding: "2vh",
            fontSize: "4vh",
            borderRadius: "1vh",
            cursor: "pointer"
        }
    }

    return (
    <>
        <div style={styles.header}>
            <h1 style={styles.name}>Welcome to {props.class.name}!</h1>
            <h3 style={styles.desc}>{props.class.description}</h3>
            <p  style={styles.content}
                dangerouslySetInnerHTML={{ __html: props.class.htmlContent }}/>
            <button style={styles.editbutton}
                    onClick={props.onclick}>Edit Content</button>
        </div>
    </>
    )
}

export default PageViewer;