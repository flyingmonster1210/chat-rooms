import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Avatar from './pages/Avatar'

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login/' element={<Login />} />
        <Route path='/register/' element={<Register />} />
        <Route path='/avatar/' element={<Avatar />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
