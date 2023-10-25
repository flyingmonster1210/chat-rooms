import { styles } from '../style'
import { AvatarGenerator } from 'random-avatar-generator'
import logo from '../assets/java-script.png'
import { useEffect, useState, useRef } from 'react'
import userServices from '../services/userServices'
import Spinner from '../components/Spinner'
import Welcome from '../components/Welcome'
import ChatRoom from '../components/ChatRoom'
import { useNavigate } from 'react-router-dom'
import ChatHeading from '../components/ChatHeading'
import MessageInput from '../components/MessageInput'
import io from 'socket.io-client'
import messageServices from '../services/messageServices'
import { ToastContainer, toast } from 'react-toastify'

function Chat() {
  const socketRef = useRef()
  const navigate = useNavigate()
  const generator = new AvatarGenerator()
  const [me, setMe] = useState()
  const [message, setMessage] = useState('')
  const [userList, setUserList] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [isPending, setIsPending] = useState(true)
  const [messageList, setMessageList] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const [reload, setReload] = useState(false)

  const getUserListFromDB = async () => {
    try {
      const list = await userServices.getAllUsersExceptMe(me._id)
      list.map(
        (item) =>
          (item.avatar = generator.generateRandomAvatar(Number(item.avatar)))
      )
      setUserList(list)
    } catch (error) {
      console.error(error.message)
    }
  }

  const getMeFromLocal = () => {
    const local = userServices.getLocalUserData()
    if (local && local.username) {
      local.avatar = generator.generateRandomAvatar(local.avatar)
      setMe(local)
    } else {
      navigate('/login')
    }
  }

  const getMessageListFromDB = async () => {
    try {
      const response = await messageServices.getMessages([
        me._id,
        userList[selectedIndex]._id,
      ])
      setMessageList(response)
    } catch (error) {
      console.error(error.message || error)
      toast.error(error.message || error, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      })
    }
  }

  // Get this my info
  useEffect(() => {
    getMeFromLocal()
  }, [])
  // Get user list from DB
  useEffect(() => {
    if (me && me._id) {
      getUserListFromDB()
      socketRef.current = io(process.env.REACT_APP_SERVER_URL)
      socketRef.current.emit('user-online', me._id)
      socketRef.current.on('recieve-message', (msg) => {
        setNewMessage(msg)
      })
      socketRef.current.on('reload-userlist', () => {
        console.log('reload userlist')
        getUserListFromDB()
        setReload(!reload)
      })
    }
  }, [me])

  // Get the messages between me and the seleted user
  useEffect(() => {
    if (
      me &&
      me._id &&
      userList &&
      selectedIndex !== null &&
      selectedIndex !== undefined
    ) {
      getMessageListFromDB()
    }
  }, [selectedIndex])
  // If new message, reload chatRoom
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
            className="flex flex-col justify-between items-center space-y-2 w-[30%] h-full lg:w-[25%] xl:w-[20%]"
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
                  onClick={() =>
                    index === selectedIndex
                      ? setSelectedIndex(null)
                      : setSelectedIndex(index)
                  }
                  className={`${
                    index === selectedIndex ? 'bg-darkPurple' : ' bg-[#9F85BD]'
                  } flex flex-row flex-wrap items-center space-x-2 rounded-md w-full py-2 px-2 hover:cursor-pointer hover:bg-darkPurple`}
                >
                  <img src={user.avatar} alt="Avatar" className="w-[3rem]" />
                  <span>{user.username}</span>
                </div>
              ))}
            </div>

            <div
              id="myself"
              className="flex flex-row flex-wrap items-center w-full justify-center space-x-2 py-2 rounded-lg bg-normalIndigo"
            >
              <img src={me?.avatar} alt="My-Avatar" className="w-[4rem]" />
              <span className="text-xl">{me?.username}</span>
            </div>
          </div>

          <div
            id="right"
            className="flex flex-col flex-grow justify-start bg-veryDarkBlue overflow-x-auto"
          >
            <ChatHeading
              me={me}
              socketRef={socketRef}
              selectedUser={
                Number.isInteger(selectedIndex) && userList
                  ? userList[selectedIndex]
                  : null
              }
            />
            {Number.isInteger(selectedIndex) ? (
              <>
                <ChatRoom
                  userIds={[me._id, userList[selectedIndex]._id]}
                  messageList={messageList}
                />
                <MessageInput
                  userIds={[me._id, userList[selectedIndex]._id]}
                  socketRef={socketRef}
                  message={message}
                  setMessage={setMessage}
                  messageList={messageList}
                  setMessageList={setMessageList}
                  reload={reload}
                  setReload={setReload}
                />
              </>
            ) : (
              <Welcome me={me} />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
export default Chat
