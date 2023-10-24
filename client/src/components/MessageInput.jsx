import React, { useState } from 'react'
import enter from '../assets/ok.png'
import { ToastContainer, toast } from 'react-toastify'
import messageServices from '../services/messageServices'

function MessageInput({ userIds, socketRef }) {
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    const newMessage = e.target.value
    if (newMessage.length <= 100) {
      setMessage(newMessage)
    } else {
      toast.warning('Maximum length of a message is 100', {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (message) {
        if (userIds && userIds.length >= 2) {
          const messageData = {
            message: message,
            users: userIds,
          }
          const response = await messageServices.addMessage(messageData)
          socketRef.current.emit('send-message', {
            from: userIds[0],
            to: userIds[1],
            message: message,
          })
          setMessage('')
        } else {
          throw new Error("Missing user'Ids, please reload this page.")
        }
      } else {
        toast.warning('Cannot send empty message.', {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2000,
        })
      }
    } catch (error) {
      console.error(error.message || error)
      toast.error(error.message || error, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }
  return (
    <>
      <div className="m-1">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row items-center justify-center space-x-1"
        >
          <input
            name="message"
            type="text"
            value={message}
            onChange={handleChange}
            placeholder="Please type your message"
            className="flex flex-grow py-1 px-2 rounded-2xl items-center bg-lightPurple text-black"
          />
          <button type="submit">
            <img
              src={enter}
              alt="Enter"
              title="Send"
              className="h-[2rem] hover:cursor-pointer"
            />
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default MessageInput
