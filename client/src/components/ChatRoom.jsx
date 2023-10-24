import React, { useEffect, useState } from 'react'
import messageServices from '../services/messageServices'
import { ToastContainer, toast } from 'react-toastify'

function ChatRoom({ userIds, socketRef }) {
  const [messageList, setMessageList] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const [reload, setReload] = useState(false)

  const getMessageListFromDB = async () => {
    try {
      const response = await messageServices.getMessages(userIds)
      setMessageList(response)
    } catch (error) {
      console.error(error.message || error)
      toast.error(error.message || error, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      })
    }
  }

  useEffect(() => {
    socketRef.current.on('recieve-message', (msg) => {
      setNewMessage(msg)
    })
  }, [])
  useEffect(() => {
    getMessageListFromDB()
  }, [userIds])
  useEffect(() => {
    if (newMessage) {
      messageList.push(newMessage)
      setMessageList(messageList)
      setReload(!reload)
    }
  }, [newMessage])
  useEffect(() => {}, [reload])

  return (
    <>
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
      <ToastContainer />
    </>
  )
}

export default ChatRoom
