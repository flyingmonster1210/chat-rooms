import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { styles } from '../style'
import logo from '../assets/java-script.png'

function Register() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    comfirmPassword: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const check = formIsValid()
    if (check.result) {
      navigate('/avatar/')
    } else {
      toast.error(check.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 4000,
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
    if (!user.email) {
      return {
        result: false,
        message: 'Email is empty!',
      }
    }
    if (!user.password) {
      return {
        result: false,
        message: 'Password is empty!',
      }
    }
    if (!user.comfirmPassword) {
      return {
        result: false,
        message: 'Comfirm Password is empty!',
      }
    }
    if (user.comfirmPassword !== user.password) {
      return {
        result: false,
        message: 'Password and Comfirm Password are not the same!',
      }
    }

    return {
      result: true,
      message: 'Successfully register!',
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
      <div id="register-page" className={styles.page}>
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
            name="email"
            type="text"
            placeholder="Email"
            value={user.email}
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
          <input
            name="comfirmPassword"
            type="password"
            placeholder="Comfirm Password"
            value={user.comfirmPassword}
            onChange={handleChange}
            className={`${styles.input}`}
          />
          <button type="submit" className={`${styles.button}`}>
            CREATE USER
          </button>
          <div>
            <span className="">ALREADY HAVE AN ACCOUNT? </span>
            <button
              onClick={() => {
                navigate('/login/')
              }}
              className="text-blue-800 font-bold hover:underline"
            >
              LOGIN.
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Register
