import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import uniqid from 'uniqid';


const Chat = ({socket,name,room}) => {
 
    const [chat,  setChat] = useState('')
    const [mssgList, setMssgList] = useState([])

    const chatMssg = async()=>{
        if(chat!== ""){
            const mssgData = {
                room: room,
                author: name,
                message: chat,
                time: new Date(Date.now()).getHours() + " : " + 
                      new Date(Date.now()).getMinutes(),
            };

            await socket.emit('chat-mssg', mssgData);
            setMssgList(prevList=> [...prevList, mssgData])
            setChat("")
        }
    }

    useEffect(()=>{
        socket.on('recieve-mssg', (data)=>{
            setMssgList(prevList=> [...prevList, data])
        })

        return () => {
            socket.off('recieve-mssg');
          };
    },[socket])

    return (
    <div className='chat-window'>
        
        <h3 className='roomId'>Room ID = 
        <span className='idRoom'> {room}</span></h3>
        
        <div className='chat-head'>
            <p>{name}</p>
        </div>
        
        <div className='chat-body'>
           <ScrollToBottom className='message-container'>
            {mssgList.map((m)=>{
                return <div key={uniqid()} className='message' id={name===m.author ? 'you' : 'other'}>
                    <div> 
                        <div className='message-content'> 
                             <p>{m.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id="time">{m.time}</p>
                            <p id="author">{m.author}</p>     
                        </div>
                    </div>
                </div>
                
    })}
    </ScrollToBottom>

        </div>
        
        <div className='chat-foot'>
            <input id='chats' type='text' placeholder='Write Your Message' value={chat}
            onChange={(event)=>{setChat(event.target.value)}}
            onKeyPress={(event)=>event.key==='Enter' && chatMssg()}/>
            
            <button onClick={chatMssg}> &#9658; </button>
        </div>
    </div>
  )
}

export default Chat