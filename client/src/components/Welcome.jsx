import React from 'react'
import welcome from '../assets/customer-engagement.png'

function Welcome({ me }) {
  const username = me ? me.username : null

  return (
    <div className="flex flex-col h-full items-center justify-center space-y-4">
      <img src={welcome} alt="Welcome" className="w-[50%]" />
      <div className="flex flex-col items-center">
        <p className="text-2xl">
          Welcome, <span className="text-lightBlue">{username}!</span>
        </p>
        <p>Please a chat to start messaging</p>
      </div>
    </div>
  )
}

export default Welcome
