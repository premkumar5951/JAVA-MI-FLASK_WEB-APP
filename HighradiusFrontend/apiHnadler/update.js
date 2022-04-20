import React from 'react'
import axios from 'axios'
export const updatepredict = async(data) => {
   try{
        const res=await axios.put("http://localhost:9090/highRadius/check",{
            xhrFields:{withCredentials:true},
            data
        })
    console.log(res.data)
    
   }catch(e){
       console.log(e)
   }
}

export const deletecustomer = async(data) => {
   try{
        const res=await axios.delete("http://localhost:9090/highRadius/check",{
            xhrFields:{withCredentials:true},
            data
        })
    console.log(res.data)
   }catch(e){
       console.log(e)
   }
}