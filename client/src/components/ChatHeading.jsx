import React from 'react'
import shutdown from '../assets/shutdown.png'

function ChatHeading({ selectedUser }) {
  return (
    <div
      className={`flex w-full p-1 items-center h-[3rem] ${
        selectedUser ? 'justify-between' : 'justify-end'
      }`}
    >
      {selectedUser && (
        <div className="flex flex-row items-end space-x-2 ">
          <img
            src={selectedUser.avatar}
            alt="Avatar"
            className="rounded-lg w-[2rem]"
          />
          <span className="text-lg">{selectedUser.username}</span>
        </div>
      )}
      <img
        src={shutdown}
        alt="Shutdown"
        title="Logout"
        className="rounded-lg h-[1.8rem] hover:cursor-pointer"
      />
    </div>
  )
}

export default ChatHeading
