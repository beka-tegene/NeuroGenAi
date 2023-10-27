import React from 'react'
import Chat from '../Components/Client/Chat'
import ChatSidebar from '../Components/Client/ChatLayout/ChatSidebar'

const ChatUser = () => {
  return (
    <ChatSidebar>
      <Chat />
    </ChatSidebar>
  )
}

export default ChatUser