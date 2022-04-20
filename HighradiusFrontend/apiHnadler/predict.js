import React from 'react'
import axios from 'axios'
export const predict = async(data) => {
   try{
        const res=await axios.post("http://127.0.0.1:5000/predict",{
        header:{
            "Content-Type":"appplication/json"
        },
        data
    })
    return(res.data)
   }catch(e){
       console.log(e)
   }
}
export const getData = async() => {
    try{
         const res=await axios.get("http://localhost:9090/highRadius/check")
     return res.data
    
    }catch(e){
        console.log(e)
    }
 }
 