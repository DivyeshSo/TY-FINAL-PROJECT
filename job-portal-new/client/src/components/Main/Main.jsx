import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import './Main.css'

const Main = () => {
    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(AppContext)
  return (
    <div className='main'>
      <div className="nav">
        <h1><p><span>AI</span> ChatBot</p></h1>
      </div>
      <div className="main-container">

        {!showResult
        ?<>
          <div className="greet">
          <p><span>Hello, Dev.</span></p>
          <p>How an I elp you today ?</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Suggest beautiful place to see on an upcoming road trip.</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>Briefy summerize this concept: urban planning.</p>
            <img src={assets.bulb_icon} alt="" />
          </div>
          <div className="card">
            <p>Brainstom team bonding activites for our work retretat.</p>
            <img src={assets.message_icon} alt="" />
          </div>
          <div className="card">
            <p>Imrove the readability of the following code.</p>
            <img src={assets.code_icon} alt="" />
          </div>
        </div>
        </>
        :<div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentPrompt}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading
            ?<div className='loader'>
              <hr />
              <hr />
              <hr />
            </div>
            :<p dangerouslySetInnerHTML={{__html:resultData}}></p>}
          </div>
        </div>}

        
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a Prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={()=>onSent()} src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            It may display inaccurate ingo, including about pepole, so double-check its responses. Your privacy and it Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default Main