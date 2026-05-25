import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Login from './pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import AddExpense from './pages/AddExpense'

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Registration />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/expenses" element={<Expenses />} />
    <Route path="/add-expense" element={<AddExpense />} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
