import React from 'react'
import { useEffect, useState } from 'react';
import "./invite.css"
import add_1 from "../../assets/queues/add_1.jpg"
import add_2 from "../../assets/queues/add_2.jpg"
import add_3 from "../../assets/queues/add_3.jpg"
import add_4 from "../../assets/queues/add_4.jpg"
import add_5 from "../../assets/queues/add_5.jpg"
import add_6 from "../../assets/queues/add_6.jpg"
import remove_1 from "../../assets/queues/remove_1.jpg"
import remove_2 from "../../assets/queues/remove_2.jpg"
import remove_3 from "../../assets/queues/remove_3.jpg"
import remove_4 from "../../assets/queues/remove_4.jpg"



import unlock from "../../assets/unlock.png"

const images = [add_1, add_2, add_3, add_4, add_5, add_6,remove_1,remove_2,remove_3,remove_4];
export default function Invite() {

    const [currentImage, setCurrentImage] = useState(0);
   
    

    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentImage((currentImage + 1) % images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [currentImage]);

    const handleQueueClick = () => {
        window.location.href = '/login'; 
      }
      const signupClick=()=>{
        window.location.href = '/register';        
      }
      const [popup, setPopup] = useState(false)

      const Popup = ()=>{
        setPopup(true)
      }
      const ClosePopup = ()=>{
        setPopup(false)
      }
   
      
      
  return (
    <div className='Imain' >
       
        
        
        <div className='Icontainer' >
       
        
            <div className='header'  >
                <div className='logo' >Logo</div>
                <div className='button-list' >
                    <button onClick={Popup} >About</button>
                    <button>Contact</button>
                    <button onClick={signupClick} >Signup</button>
                    <button onClick={handleQueueClick}>Login</button>
                </div>
            </div>
            {popup ? 
        <div className='about' >
            <h1 onClick={ClosePopup} >x</h1>
        </div>
        : 
            
            
        <>
            <div className='body' >
                
                <div className='moto'>
                    <div className='start'>
                        <h2>You can explore and grasp the magic of data structure and algorithm quickly</h2>
                        <button onClick={handleQueueClick} >Start</button>

                    </div>
                   <a href='/login' >
                   <div className='moto-card' >
                    <img src={unlock} alt='unlock' />
                    <spam>"the power of Data structure and algorithm"</spam>
                    </div>
                    </a> 
                </div>
                <div className='dsa' >
                <div className='queues' onClick={handleQueueClick}  >
                    <img src={images[currentImage]} alt={`Image ${currentImage + 1}`} />
                </div>
                    <div className='stack'></div>

                </div>
                
            </div>
            <div className='footer' >Footer</div>
            
            </>
            
            }
            
        </div>
    </div>
            
        

       
         
        

  )
}
