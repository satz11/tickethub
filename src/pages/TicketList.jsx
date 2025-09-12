import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Calendar, MapPin, Star, Clock } from 'lucide-react'
import { useTickets } from '../context/TicketContext'
import ImageWithFallback from '../components/ImageWithFallback'

function TicketList() {
  const { tickets } = useTickets()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('date')

  const filteredTickets = useMemo(() => {
    let filtered = tickets.filter(ticket => {
      const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ticket.location.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesType = typeFilter === 'all' || ticket.type === typeFilter
      const matchesPrice = ticket.price >= priceRange[0] && ticket.price <= priceRange[1]
      
      return matchesSearch && matchesType && matchesPrice
    })

    // Sort tickets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'date':
          return new Date(a.date) - new Date(b.date)
        case 'rating':
          return b.seller.rating - a.seller.rating
        default:
          return 0
      }
    })

    return filtered
  }, [tickets, searchTerm, typeFilter, priceRange, sortBy])

  return (
    <div className="ticket-list-page">
      <div className="container">
        <div className="page-header">
          <h1>Browse Tickets</h1>
          <p>Find the perfect tickets for movies and events</p>
        </div>

        <div className="ticket-list-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filter-section">
              <h3>Search</h3>
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="filter-section">
              <h3>Type</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="type"
                    value="all"
                    checked={typeFilter === 'all'}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  />
                  <span>All</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="type"
                    value="movie"
                    checked={typeFilter === 'movie'}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  />
                  <span>Movies</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="type"
                    value="event"
                    checked={typeFilter === 'event'}
                    onChange={(e) => setTypeFilter(e.target.value)}
                  />
                  <span>Events</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
                <div className="price-labels">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <div className="filter-section">
              <h3>Sort By</h3>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Date</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Seller Rating</option>
              </select>
            </div>
          </aside>

          {/* Tickets Grid */}
          <main className="tickets-main">
            <div className="tickets-header">
              <h2>{filteredTickets.length} tickets found</h2>
            </div>

            <div className="tickets-grid">
              {filteredTickets.map(ticket => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-image">
                    <ImageWithFallback src={ticket.image} alt={ticket.title} />
                    <div className="ticket-type-badge">
                      {ticket.type === 'movie' ? '🎬' : '🎭'}
                    </div>
                    <div className="ticket-status">
                      {ticket.status === 'available' ? 'Available' : 'Sold'}
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
                        <Clock size={16} />
                        <span>{ticket.time}</span>
                      </div>
                      <div className="ticket-detail">
                        <MapPin size={16} />
                        <span>{ticket.venue}</span>
                      </div>
                    </div>

                    <p className="ticket-description">
                      {ticket.description}
                    </p>

                    <div className="ticket-price">
                      <span className="current-price">${ticket.price}</span>
                      <span className="original-price">${ticket.originalPrice}</span>
                      <span className="savings">
                        Save ${ticket.originalPrice - ticket.price}
                      </span>
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

                    <div className="ticket-actions">
                      <Link to={`/ticket/${ticket.id}`} className="btn btn-primary">
                        View Details
                      </Link>
                      <button className="btn btn-outline">
                        Request Swap
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredTickets.length === 0 && (
              <div className="no-tickets">
                <h3>No tickets found</h3>
                <p>Try adjusting your search criteria or check back later for new listings.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default TicketList