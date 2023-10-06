import { AvatarGenerator } from 'random-avatar-generator'
import { styles } from '../style'
import { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import userServices from '../services/userServices'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

function Avatar() {
  const navigate = useNavigate()

  const generator = new AvatarGenerator()
  const [avatars, setAvatars] = useState()
  const [isPending, setIsPending] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState() // index: number, value: any

  const getAvatars = async (num) => {
    let values = []
    let promises = []
    setIsPending(true)
    try {
      for (let i = 0; i < num; i++) {
        const value = Math.round(Math.random() * 1000)
        values.push(value)
        promises.push(generator.generateRandomAvatar(value))
      }
      const responses = await Promise.all(promises)

      let result = []
      for (let i = 0; i < num; i++) {
        result.push({ value: values[i], image: responses[i] })
      }
      setAvatars(result)
    } catch (error) {
      console.error(error)
    }
  }

  const checkLoaclStore = async () => {
    try {
      const user = await userServices.getLocalUserData()
      if (user) {
        return true
      } else {
        navigate('/login')
        return false
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(() => {
    checkLoaclStore()
      .then(() => getAvatars(5))
      .catch(() => navigate('/login'))
  }, [])

  const isValid = () => {
    if (selectedAvatar && selectedAvatar.index && selectedAvatar.value) {
      return { result: true, message: '' }
    } else {
      return { result: false, message: "You haven't picked your avatar!" }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const check = isValid()
    if (check.result) {
      const { _id } = await userServices.getLocalUserData()
      const newUserData = await userServices.setAvatar({
        _id,
        avatar: selectedAvatar.value,
      })
      userServices.setLocalUserData(newUserData)
      navigate('/', { replace: true })
    } else {
      console.error('selectedAvatar: ', selectedAvatar)
      toast.error(check.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  return (
    <>
      {isPending && <Spinner />}
      <div
        id="set-avatar-page"
        onLoad={() => setIsPending(false)}
        onError={() => setIsPending(false)}
        className={styles.page}
      >
        <div className="flex flex-row flex-wrap items-center space-x-6 m-[2rem]">
          {avatars?.map((avatar, index) => (
            <img
              src={avatar.image}
              alt={`Avatar${index}`}
              key={`${index}-${avatar.value}`}
              onClick={() =>
                setSelectedAvatar({ index: index, value: avatar.value })
              }
              className={`transition ease-out duration-300 ${
                index === selectedAvatar?.index &&
                'ring-[0.5rem] ring-orange-500'
              } max-h-[8rem] rounded-full p-[0.5rem]`}
            />
          ))}
        </div>
        <button
          onClick={() => {
            setSelectedAvatar()
            getAvatars(5)
          }}
          className="text-white"
        >
          Get Another Set of Avatars
        </button>
        <button onClick={handleSubmit} className={styles.button}>
          Set Avatar
        </button>
      </div>
      <ToastContainer />
    </>
  )
}

export default Avatar
