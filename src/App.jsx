import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import TicketList from './pages/TicketList'
import TicketDetail from './pages/TicketDetail'
import Profile from './pages/Profile'
import PostTicket from './pages/PostTicket'
import { TicketProvider } from './context/TicketContext'
import './App.css'

function App() {
  const [user, setUser] = useState({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  })

  return (
    <TicketProvider>
      <Router>
        <div className="app">
          <Header user={user} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tickets" element={<TicketList />} />
              <Route path="/ticket/:id" element={<TicketDetail user={user} />} />
              <Route path="/profile" element={<Profile user={user} />} />
              <Route path="/post-ticket" element={<PostTicket user={user} />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TicketProvider>
  )
}

export default App
