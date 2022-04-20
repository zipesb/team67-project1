//Component design was derived off of https://www.youtube.com/watch?v=eDw46GYAIDQ&t=91s

import React, {useState} from 'react'
import {FaStar} from 'react-icons/fa'
import axios from 'axios'

const StarRating = (props) =>{


    const [rating, setRating] = useState (null)

    const [currRatingAvg, setCurrRatingAvg] = useState(props.class.ratingAvg);
    const id = props.class._id
    const currRating = props.class.rating
    

    let i = 0;
    let tempRating = 0
    
    
     const ratingpush = (e) => {
         if(currRating !== undefined && rating !== null){
         currRating.push(rating);
         axios.post('http://localhost:5000/updateRating' , { newRating : currRating, id: id})
         console.log(e.target.hidden)
     //   this.setState({disabled: true})
        let tempSum = 0;
        for(i = 0; i < currRating.length; i++){
            tempSum+=currRating[i];
        }
        tempRating = tempSum / currRating.length;
        console.log(tempRating, currRating.length);
        axios.post("http://localhost:5000/updateRatingAvg", { newRating : tempRating, id: id})
        setCurrRatingAvg(tempRating);
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
             { <button onClick = {ratingpush}>Submit rating</button> }
            </div>
            <div>
            <label onLoad = {() => {setCurrRatingAvg(props.class.ratingAvg)}}>Current Rating is {currRatingAvg}</label>
            </div>
        </div>
    )
}
export default StarRating
