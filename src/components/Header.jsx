import { Link, useLocation } from 'react-router-dom'
import { Search, User, Plus, Menu, X } from 'lucide-react'
import { useState } from 'react'

function Header({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <h1>TicketSwap</h1>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/tickets" 
            className={`nav-link ${isActive('/tickets') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Tickets
          </Link>
          <Link 
            to="/post-ticket" 
            className={`nav-link ${isActive('/post-ticket') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Plus size={16} />
            Post Ticket
          </Link>
        </nav>

        <div className="header-actions">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search tickets..." 
              className="search-input"
            />
          </div>
          
          <Link to="/profile" className="user-profile">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <span className="user-name">{user.name}</span>
          </Link>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header