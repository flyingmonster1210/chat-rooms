import { AvatarGenerator } from 'random-avatar-generator'
import { styles } from '../style'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

function Avatar() {
  const generator = new AvatarGenerator()
  const [avatars, setAvatars] = useState()
  const [selectedAvatar, setSelectedAvatar] = useState()

  const getAvatars = async (num) => {
    let values = []
    let promises = []
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

  useEffect(() => {
    getAvatars(5)
  }, [])

  const isValid = () => {
    if (selectedAvatar && selectedAvatar.index && selectedAvatar.value) {
      return { result: true, message: '' }
    } else {
      return { result: false, message: "You haven't picked your avatar!" }
    }
  }

  const handleSubmit = () => {
    const check = isValid()
    if (check.result) {
      console.log('success')
    } else {
      toast.error(check.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  const getNewAvatars = () => {
    setSelectedAvatar()
    getAvatars(5)
  }

  return (
    <>
      <div id="set-avatar-page" className={styles.page}>
        <div className="flex flex-row flex-wrap items-center space-x-6 m-[2rem]">
          {avatars?.map((avatar, index) => (
            <img
              src={avatar.image}
              alt={`Avatar${index}`}
              key={`${index}-${avatar.value}`}
              onClick={() =>
                setSelectedAvatar({ index: index, value: avatar.value })
              }
              className={`${
                index === selectedAvatar?.index && 'border-8 border-orange-500'
              } max-h-[8rem] rounded-full p-[0.5rem]`}
            />
          ))}
        </div>
        <button onClick={getNewAvatars} className="text-white">
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
