import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, MapPin, DollarSign, Image, FileText } from 'lucide-react'
import { useTickets } from '../context/TicketContext'
import ImageWithFallback from '../components/ImageWithFallback'

function PostTicket({ user }) {
  const navigate = useNavigate()
  const { addTicket } = useTickets()
  const [formData, setFormData] = useState({
    title: '',
    type: 'movie',
    date: '',
    time: '',
    venue: '',
    location: '',
    price: '',
    originalPrice: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1489599804150-0b0b0b0b0b0b?w=400&h=300&fit=crop&auto=format'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const ticketData = {
      ...formData,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      seller: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        rating: 4.8
      }
    }

    addTicket(ticketData)
    navigate('/profile')
  }

  return (
    <div className="post-ticket-page">
      <div className="container">
        <div className="page-header">
          <h1>Post a Ticket</h1>
          <p>Share your tickets with other users and start swapping</p>
        </div>

        <div className="post-ticket-form">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2><FileText size={20} /> Basic Information</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Ticket Title *</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Avengers: Endgame - IMAX"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="type">Type *</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="movie">Movie</option>
                    <option value="event">Event</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Tell potential buyers about your ticket..."
                  rows={4}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2><Calendar size={20} /> Date & Time</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="time">Time *</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2><MapPin size={20} /> Location</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="venue">Venue *</label>
                  <input
                    type="text"
                    id="venue"
                    name="venue"
                    value={formData.venue}
                    onChange={handleInputChange}
                    placeholder="e.g., AMC Theater Downtown"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., New York, NY"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2><DollarSign size={20} /> Pricing</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Your Price *</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="25"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="originalPrice">Original Price *</label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    placeholder="30"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              {formData.price && formData.originalPrice && (
                <div className="price-preview">
                  <p>You're offering a savings of <strong>${(formData.originalPrice - formData.price).toFixed(2)}</strong></p>
                </div>
              )}
            </div>

            <div className="form-section">
              <h2><Image size={20} /> Image</h2>
              
              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image && (
                  <div className="image-preview">
                    <ImageWithFallback src={formData.image} alt="Preview" />
                  </div>
                )}
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-outline" onClick={() => navigate('/profile')}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Post Ticket
              </button>
            </div>
          </form>
        </div>

        <div className="posting-tips">
          <h3>Tips for Better Listings</h3>
          <ul>
            <li>Use clear, descriptive titles that include the event name and venue</li>
            <li>Add a detailed description explaining why you're selling</li>
            <li>Set a competitive price to attract more buyers</li>
            <li>Upload a clear image of your ticket or event poster</li>
            <li>Be honest about the ticket condition and any restrictions</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default PostTicket