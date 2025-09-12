import { Link } from 'react-router-dom'
import { Calendar, MapPin, Star, TrendingUp, Users, Shield } from 'lucide-react'
import { useTickets } from '../context/TicketContext'
import ImageWithFallback from '../components/ImageWithFallback'

function Home() {
  const { tickets } = useTickets()
  const featuredTickets = tickets.slice(0, 3)

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Swap Tickets with <span className="highlight">Trust</span>
          </h1>
          <p className="hero-subtitle">
            Buy, sell, and swap movie and event tickets with other users. 
            Safe, secure, and hassle-free ticket trading.
          </p>
          <div className="hero-actions">
            <Link to="/tickets" className="btn btn-primary">
              Browse Tickets
            </Link>
            <Link to="/post-ticket" className="btn btn-secondary">
              Post Your Ticket
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop&auto=format" 
            alt="Concert tickets" 
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose TicketSwap?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Shield className="feature-icon" />
              <h3>Secure Trading</h3>
              <p>All transactions are protected with our secure payment system and user verification.</p>
            </div>
            <div className="feature-card">
              <Users className="feature-icon" />
              <h3>Peer-to-Peer</h3>
              <p>Connect directly with other users for fair pricing and instant ticket swaps.</p>
            </div>
            <div className="feature-card">
              <TrendingUp className="feature-icon" />
              <h3>Best Prices</h3>
              <p>Find tickets at better prices than traditional resellers with no hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tickets */}
      <section className="featured-tickets">
        <div className="container">
          <h2 className="section-title">Featured Tickets</h2>
          <div className="tickets-grid">
            {featuredTickets.map(ticket => (
              <div key={ticket.id} className="ticket-card">
                <div className="ticket-image">
                  <ImageWithFallback src={ticket.image} alt={ticket.title} />
                  <div className="ticket-type-badge">
                    {ticket.type === 'movie' ? '🎬' : '🎭'}
                  </div>
                </div>
                <div className="ticket-content">
                  <h3 className="ticket-title">{ticket.title}</h3>
                  <div className="ticket-details">
                    <div className="ticket-detail">
                      <Calendar size={16} />
                      <span>{new Date(ticket.date).toLocaleDateString()}</span>
                    </div>
                    <div className="ticket-detail">
                      <MapPin size={16} />
                      <span>{ticket.venue}</span>
                    </div>
                  </div>
                  <div className="ticket-price">
                    <span className="current-price">${ticket.price}</span>
                    <span className="original-price">${ticket.originalPrice}</span>
                  </div>
                  <div className="ticket-seller">
                    <ImageWithFallback 
                      src={ticket.seller.avatar} 
                      alt={ticket.seller.name}
                      className="seller-avatar"
                    />
                    <div>
                      <span className="seller-name">{ticket.seller.name}</span>
                      <div className="seller-rating">
                        <Star size={14} fill="currentColor" />
                        <span>{ticket.seller.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Link to={`/ticket/${ticket.id}`} className="btn btn-outline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/tickets" className="btn btn-primary">
              View All Tickets
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1,200+</h3>
              <p>Active Users</p>
            </div>
            <div className="stat-item">
              <h3>500+</h3>
              <p>Tickets Available</p>
            </div>
            <div className="stat-item">
              <h3>98%</h3>
              <p>Success Rate</p>
            </div>
            <div className="stat-item">
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home