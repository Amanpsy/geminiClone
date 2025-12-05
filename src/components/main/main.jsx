import React, { useContext, useState } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { context } from '../../context/context'
 
function Main() {


    const {onSent, recentPrompt, showResult, loading, resultData, setinput, input, ResetData, chatHistory } = useContext(context)

    console.log(input)
    const handleEnterKeyPress = (event, input) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onSent(input)
      }
    };
  

  return (
    <div className='main'>
    <div className='nav'>
    <p style={{cursor:"pointer"}} onClick={() => ResetData()}>Gemini</p>
    <img src={assets.imageiCOn} />
    </div>
    <div className='main-container'>

    
    {
        !showResult ? <div>
        <div className='greet'>
        <p><span>Hello Dev.</span></p>
        <p>How can I help you today?</p>
    
        </div>
        <div className='cards'>
        <div className='card' onClick={() => onSent("List Power Words for my resume that show teamwork")}>
        <p>
        List Power Words for my resume that show teamwork
        </p>
        <img src={assets.compass_icon} />
        </div>
        <div className='card' onClick={() => onSent("Briefly summarize this concept : urban planning")}>
        <p>
        Briefly summarize this concept : urban planning
        </p>
        <img src={assets.bulb_icon} />
        </div>
        <div className='card' onClick={() => onSent(' Brainstorm team bonding activities for our work retreat')}>
        <p>
        Brainstorm team bonding activities for our work retreat
        </p>
        <img src={assets.message_icon} />
        </div>
        <div className='card' onClick={() => onSent('  Improve the readablity of the following code')}>
        <p>
        Improve the readablity of the following code
        </p>
        <img src={assets.code_icon} />
        </div>
        </div>
        </div>  : <div className='result'>
        <div className='result-title'>
        <img src={assets.imageiCOn} />
        <p>{recentPrompt}</p>
        </div>
        <div className='result-data'>
        <img src={assets.gemini_icon}/>
        {
            loading ? <div className='loader'>
            <hr/>
            <hr/>

            <hr/>


            </div> :         <p dangerouslySetInnerHTML={{__html:resultData}}></p>

        }
        </div>
        </div>
    }
   
    <div className='main-bottom'>
    <div className='searchbox'>
    <input         onKeyDown={handleEnterKeyPress}
    onChange={(e) => setinput(e.target.value)} type='text' placeholder='Enter a prompt here' />
   <div>
   <img src={assets.gallery_icon} />
   <img src={assets.mic_icon} />

   {input ?    <img  onClick={onSent} src={assets.send_icon}/>
: null  }
   </div>
    </div>
   <p className='bottom-info'>
   Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps  
    </p>
    
    </div>


    </div>
    </div>
  )
}

export default Main