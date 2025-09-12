import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, Clock, MapPin, Star, MessageCircle, Shield, User, Phone } from 'lucide-react'
import { useTickets } from '../context/TicketContext'
import ImageWithFallback from '../components/ImageWithFallback'

function TicketDetail({ user }) {
  const { id } = useParams()
  const { tickets, requestSwap } = useTickets()
  const [showSwapModal, setShowSwapModal] = useState(false)
  const [swapMessage, setSwapMessage] = useState('')
  const [swapOffer, setSwapOffer] = useState('')

  const ticket = tickets.find(t => t.id === parseInt(id))

  if (!ticket) {
    return (
      <div className="container">
        <div className="error-page">
          <h1>Ticket not found</h1>
          <p>The ticket you're looking for doesn't exist or has been removed.</p>
          <Link to="/tickets" className="btn btn-primary">Browse Tickets</Link>
        </div>
      </div>
    )
  }

  const handleSwapRequest = (e) => {
    e.preventDefault()
    if (!swapMessage.trim()) return

    const swapRequest = {
      ticketId: ticket.id,
      requesterId: user.id,
      requesterName: user.name,
      requesterAvatar: user.avatar,
      sellerId: ticket.seller.id,
      message: swapMessage,
      offer: swapOffer,
      status: 'pending'
    }

    requestSwap(swapRequest)
    setShowSwapModal(false)
    setSwapMessage('')
    setSwapOffer('')
    alert('Swap request sent successfully!')
  }

  return (
    <div className="ticket-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/tickets">Tickets</Link>
          <span>/</span>
          <span>{ticket.title}</span>
        </div>

        <div className="ticket-detail-layout">
          <div className="ticket-detail-main">
            <div className="ticket-image-large">
              <ImageWithFallback src={ticket.image} alt={ticket.title} />
              <div className="ticket-type-badge">
                {ticket.type === 'movie' ? '🎬 Movie' : '🎭 Event'}
              </div>
            </div>

            <div className="ticket-info">
              <h1 className="ticket-title">{ticket.title}</h1>
              
              <div className="ticket-meta">
                <div className="meta-item">
                  <Calendar size={20} />
                  <div>
                    <span className="meta-label">Date</span>
                    <span className="meta-value">{new Date(ticket.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
                
                <div className="meta-item">
                  <Clock size={20} />
                  <div>
                    <span className="meta-label">Time</span>
                    <span className="meta-value">{ticket.time}</span>
                  </div>
                </div>
                
                <div className="meta-item">
                  <MapPin size={20} />
                  <div>
                    <span className="meta-label">Venue</span>
                    <span className="meta-value">{ticket.venue}</span>
                    <span className="meta-location">{ticket.location}</span>
                  </div>
                </div>
              </div>

              <div className="ticket-description">
                <h3>Description</h3>
                <p>{ticket.description}</p>
              </div>

              <div className="ticket-seller-info">
                <h3>Seller Information</h3>
                <div className="seller-card">
                  <ImageWithFallback 
                    src={ticket.seller.avatar} 
                    alt={ticket.seller.name}
                    className="seller-avatar"
                  />
                  <div className="seller-details">
                    <h4>{ticket.seller.name}</h4>
                    <div className="seller-rating">
                      <Star size={16} fill="currentColor" />
                      <span>{ticket.seller.rating}</span>
                      <span className="rating-text">Excellent seller</span>
                    </div>
                    <div className="seller-actions">
                      <button className="btn btn-outline">
                        <MessageCircle size={16} />
                        Message
                      </button>
                      <button className="btn btn-outline">
                        <User size={16} />
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ticket-detail-sidebar">
            <div className="price-card">
              <div className="price-info">
                <div className="current-price">${ticket.price}</div>
                <div className="original-price">Original: ${ticket.originalPrice}</div>
                <div className="savings">You save: ${ticket.originalPrice - ticket.price}</div>
              </div>
              
              <div className="price-actions">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={() => setShowSwapModal(true)}
                >
                  Request Swap
                </button>
                <button className="btn btn-secondary btn-large">
                  Buy Now
                </button>
              </div>
            </div>

            <div className="safety-info">
              <h3><Shield size={20} /> Safe Trading</h3>
              <ul>
                <li>Verified seller with 4.8+ rating</li>
                <li>Secure payment protection</li>
                <li>24/7 customer support</li>
                <li>Money-back guarantee</li>
              </ul>
            </div>

            <div className="ticket-status">
              <h3>Ticket Status</h3>
              <div className={`status-badge ${ticket.status}`}>
                {ticket.status === 'available' ? 'Available' : 'Sold'}
              </div>
              <p>Posted {new Date(ticket.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Swap Request Modal */}
        {showSwapModal && (
          <div className="modal-overlay" onClick={() => setShowSwapModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Request Ticket Swap</h2>
              <form onSubmit={handleSwapRequest}>
                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    value={swapMessage}
                    onChange={(e) => setSwapMessage(e.target.value)}
                    placeholder="Tell the seller why you want to swap this ticket..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Your Offer (Optional)</label>
                  <input
                    type="text"
                    value={swapOffer}
                    onChange={(e) => setSwapOffer(e.target.value)}
                    placeholder="e.g., I have tickets to another event, cash offer, etc."
                  />
                </div>
                
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setShowSwapModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Send Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketDetail