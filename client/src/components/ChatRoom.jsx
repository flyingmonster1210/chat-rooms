import React, { useEffect, useState } from 'react'

function ChatRoom({ userIds, messageList }) {
  // const [newMessage, setNewMessage] = useState(null)
  // const [reload, setReload] = useState(false)

  // useEffect(() => {
  //   socketRef.current.on('recieve-message', (msg) => {
  //     setNewMessage(msg)
  //   })
  // }, [])
  //
  // useEffect(() => {
  //   if (newMessage) {
  //     messageList.push(newMessage)
  //     setMessageList(messageList)
  //     setReload(!reload)
  //   }
  // }, [newMessage])
  // useEffect(() => {}, [reload])

  return (
    <div className="flex flex-grow items-center justify-center max-w-full break-words">
      {messageList && messageList.length > 0 ? (
        <ul className="flex flex-col p-2 h-full w-full space-y-3">
          {messageList.map((item, index) => (
            <li
              key={`${index}-${item.sender}`}
              className={`list-none text-base w-full ${
                item.sender === userIds[0] ? 'text-right' : 'text-left'
              }`}
            >
              <span className="bg-blue-950 p-[0.45rem] rounded-lg">
                {item.message}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Say hello to start the conversation.</p>
      )}
    </div>
  )
}

export default ChatRoom
