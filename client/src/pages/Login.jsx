import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { styles } from '../style'
import logo from '../assets/java-script.png'

function Login() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const check = formIsValid()
    if (check.result) {
      toast.success(check.message, {
        POSITION: toast.TOP_RIGHT,
        autoClose: 1500,
      })
    } else {
      toast.error(check.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
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
        <form onSubmit={handleSubmit} className={`${styles.form} text-white`}>
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
            className={`${styles.input}`}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className={`${styles.input}`}
          />
          <button type="submit" className={`${styles.button}`}>
            LOG IN
          </button>
          <div>
            <span className="">DON'T HAVE AN ACCOUNT? </span>
            <button
              onClick={() => {
                navigate('/register/')
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
