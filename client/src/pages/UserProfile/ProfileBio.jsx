import React, { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

const ProfileBio = ({currentProfile}) => {
    const{id} = useParams()
     
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);


                  
     

     const onSuccess =(position)=>{
        const {latitude, longitude} = position.coords;
        const apiKey = '163c395392cf46ca832d2df58c9524f0'
       fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`)
       .then(response =>response.json()).then(results=>{
        console.log(results)
        const allDetails = results.results[0].components;
        const  {city,state,country,postcode} = allDetails;
        //alert( city +state+ country + postcode)
        document.getElementById('display').innerHTML= city+ state+ country+ postcode
       

       })
     }
     
     const onError=(error)=>{
      if(error.code==1){
        alert("user denied request ")

      }
    else if(error.code==2){
             alert("location not available")
      }
      else{
                 alert("something went wrong")
      }
     }
    
    const currentUser = useSelector((state)=>state.currentUserReducer)
    return (
        <div>
            <div>
                {
                    currentProfile?.tags.length !== 0 ? (
                        <>
                            <h4>Tags watched</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))
                            }
                        </>
                    ) : (
                        <p>0 tags watched</p>
                    )
                }
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <>
                            <h4>About</h4>
                            <p>{currentProfile?.about}</p>
                        </>
                    ) : (
                        <p>No bio found</p>
                    )
                }
            </div>
            
            {
            currentUser?.result._id === id &&(  
        <div class='locationcontainer'> 

       <div className="userlocation">Location:</div>
           <div id = 'display'>
           </div>
        
        </div>

            )}
        
        </div>
    )
}

export default ProfileBio