import React, {useState} from 'react'
import {FaStar} from 'react-icons/fa'
import axios from 'axios'

const StarRating = (props) =>{
    
    const [rating, setRating] = useState (null)
    const [DBRating, setDBRating] = useState([]);
    const[buttonHide, setButtonHide] = useState(false);
    const id = props.class._id
    const currRating = props.class.rating
    state = {
        disabled: false
    }
    const ratingpush = (e) => {
        if(currRating !== undefined && rating !== null){
        currRating.push(rating);
        axios.post('http://localhost:5000/updateRating' , { newRating : currRating, id: id})
        console.log(e.target.hidden)
        this.setState({disabled: true})
        }
    }


   
    
    return( 
        <div>            
            {[...Array(5)].map((star,i) =>{
                const ratingVal = i+1  
                return(
                
                <label>
                  <input
                    type= "radio"
                    name = "rating"
                    value = {ratingVal}
                    onClick = {()=> setRating( ratingVal)}
                    />
                  <FaStar 
                  className='star' 
                  color= {ratingVal<=(rating) ? "ffc107" : "e4e4e4"} 
                  size={40}
                  />
                </label>
                
                )
            })}

            <div>
             <button disabled= {this.state.disabled} onClick = {ratingpush}>Submit rating</button>
            </div>
        </div>
    )
}
export default StarRating