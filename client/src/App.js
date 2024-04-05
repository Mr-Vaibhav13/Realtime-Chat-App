import React, {useState} from 'react'
import io from 'socket.io-client'
import './App.css'
import Chat from './Chat'

const socket = io.connect('http://localhost:5000')


const App = () => {
  
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [show, setShow] = useState(false)


  
  const joinRoom = () =>{
    if(name !=="" && room !==""){
      setShow(true)
      socket.emit('join-room', room)
    }
  }

  
  return (
    <div className='App'>

  {show===false ? 
      
      (<div className='joinChatContainer'>
      <h2>Real-Time Chat App</h2>
      <input type='text' placeholder='Enter your name' id='name' required
      onChange={(event)=>{setName(event.target.value)}}/>
      
      <input type='text' placeholder='Enter RoomID' id='roomId' required
      onChange={(event)=>{setRoom(event.target.value)}}/>

      <button onClick={joinRoom}>Join the Room</button>   
    
    </div>)
      
     : (<Chat socket={socket} name={name} room={room}/>)
  }
      </div>

  )
}

export default App