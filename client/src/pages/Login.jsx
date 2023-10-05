import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { styles } from '../style'
import logo from '../assets/java-script.png'
import userServices from '../services/userServices'

function Login() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    password: '',
  })
  const [checkbox, setCheckbox] = useState(false)

  const setUpRemeberMe = async () => {
    const localUserData = await userServices.getLocalUserData()
    if (localUserData && localUserData.username && localUserData.password) {
      setCheckbox(true)
      setUser({
        username: localUserData.username,
        password: localUserData.password,
      })
    }
  }
  useEffect(() => {
    setUpRemeberMe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const check = formIsValid()
      if (check.result) {
        await userServices.login({ ...user, checkbox })
        navigate('/', { replace: true })
      } else {
        toast.error(check.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
      }
    } catch (error) {
      console.error(error.message)
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      })
    }
  }

  const formIsValid = () => {
    if (!user.username) {
      return {
        result: false,
        message: 'Username is empty!',
      }
    }
    if (!user.password) {
      return {
        result: false,
        message: 'Password is empty!',
      }
    }

    return {
      result: true,
      message: 'Successfully login!',
    }
  }

  const handleChange = (e) => {
    e.preventDefault()

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <div id="login-page" className={styles.page}>
        <form
          onSubmit={handleSubmit}
          className={`${styles.form} items-center text-white`}
        >
          <div className="flex flex-row items-center justify-center">
            <img src={logo} alt="Logo" className="h-[5rem]" />
            <h1 className="text-[3rem]">Chat Rooms</h1>
          </div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className={`${styles.input} w-full`}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className={`${styles.input} w-full`}
          />
          <button type="submit" className={`${styles.button} w-full`}>
            LOG IN
          </button>
          <label>
            REMEBER ME&nbsp;
            <input
              type="checkbox"
              name="checkbox"
              checked={checkbox}
              onChange={() => setCheckbox(!checkbox)}
            />
          </label>
          <div className="w-full">
            <span className="">DON'T HAVE AN ACCOUNT? </span>
            <button
              onClick={(e) => {
                e.preventDefault()
                navigate('/register')
              }}
              className="text-blue-800 font-bold hover:underline"
            >
              CREATE ONE.
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
