import React, { useState } from 'react'
import enter from '../assets/ok.png'
import { ToastContainer, toast } from 'react-toastify'

function MessageInput() {
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    const newMessage = e.target.value
    if (newMessage.length < 50) {
      setMessage(newMessage)
    } else {
      toast.warning('Maximum length of a message is 50', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      })
    }
  }

  const handleSubmit = () => {}
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
          <img
            src={enter}
            alt="Enter"
            title="Send"
            className="h-[2rem] hover:cursor-pointer"
          />
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default MessageInput
