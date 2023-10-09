import { styles } from '../style'
import { AvatarGenerator } from 'random-avatar-generator'
import logo from '../assets/java-script.png'
import { useEffect, useState } from 'react'
import userServices from '../services/userServices'
import Spinner from '../components/Spinner'

function Chat() {
  const generator = new AvatarGenerator()
  const [me, setMe] = useState()
  const [userList, setUserList] = useState([])
  const [isPending, setIsPending] = useState(true)

  const getUserListFromDB = async () => {
    try {
      const list = await userServices.getAllUsersExceptMe(me._id)
      list.map((item) => {
        item.avatar = generator.generateRandomAvatar(item.avatar)
      })
      setUserList(list)
    } catch (error) {
      console.error(error.message)
    }
  }

  const getMeFromLocal = () => {
    const local = userServices.getLocalUserData()
    local.avatar = generator.generateRandomAvatar(local.avatar)
    setMe(local)
  }
  useEffect(() => {
    getMeFromLocal()
  }, [])
  useEffect(() => {
    if (me && me._id) {
      getUserListFromDB()
    }
  }, [me])

  return (
    <>
      {isPending && <Spinner />}
      <div
        id="chat-page"
        onLoad={() => setIsPending(false)}
        onError={() => setIsPending(false)}
        className={`${styles.page}`}
      >
        <div className="flex flex-row text-white w-[80%] h-[90%] bg-darkerBlue border-2 border-veryDarkBlue">
          <div
            id="left"
            className="flex flex-col justify-between items-center space-y-2 w-[30%] h-full"
          >
            <div
              id="logo-and-app-name"
              className="flex flex-row flex-wrap items-center space-x-1 pt-2"
            >
              <img src={logo} alt="LOGO" className="w-[3rem]" />
              <span className="font-bold">Chat Rooms</span>
            </div>

            <div
              id="others"
              className="flex flex-col flex-grow w-full space-y-4 overflow-y-auto"
            >
              {userList.map((user, index) => (
                <div
                  key={`${index}-${user.username}`}
                  className="flex flex-row flex-wrap items-center space-x-2 bg-gray-600 rounded-md w-full py-2 px-2 hover:cursor-pointer"
                >
                  <img src={user.avatar} alt="Avatar" className="w-[3rem]" />
                  <span>{user.username}</span>
                </div>
              ))}
            </div>

            <div
              id="myself"
              className="flex flex-row flex-wrap items-center w-full justify-center space-x-2 py-2 rounded-lg bg-lightBlue"
            >
              <img src={me?.avatar} alt="My-Avatar" className="w-[4rem]" />
              <span className="text-xl">{me?.username}</span>
            </div>
          </div>

          <div id="right" className="flex flex-grow bg-veryDarkBlue">
            right
          </div>
        </div>
      </div>
    </>
  )
}
export default Chat
