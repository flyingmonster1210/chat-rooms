import React from 'react'
import welcome from '../assets/customer-engagement.png'

function Welcome({ me }) {
  const username = me ? me.username : null

  return (
    <div className="flex flex-col flex-grow max-h-full overflow-auto items-center justify-center space-y-4 m-1">
      <img src={welcome} alt="Welcome" className="h-[65%]" />
      <div className="flex flex-col items-center">
        <p className="text-2xl">
          Welcome, <span className="text-lightBlue">{username}!</span>
        </p>
        <p>Please select a chat to start messaging</p>
      </div>
    </div>
  )
}

export default Welcome
