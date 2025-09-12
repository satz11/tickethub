import { useState } from 'react'
import { Calendar, MapPin, Star, MessageCircle, Edit, Trash2, Plus } from 'lucide-react'
import { useTickets } from '../context/TicketContext'
import { Link } from 'react-router-dom'
import ImageWithFallback from '../components/ImageWithFallback'

function Profile({ user }) {
  const { tickets, swapRequests, deleteTicket } = useTickets()
  const [activeTab, setActiveTab] = useState('my-tickets')
  
  const userTickets = tickets.filter(ticket => ticket.seller.id === user.id)
  const userSwapRequests = swapRequests.filter(request => 
    request.requesterId === user.id || request.sellerId === user.id
  )

  const handleDeleteTicket = (ticketId) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      deleteTicket(ticketId)
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-info">
            <ImageWithFallback src={user.avatar} alt={user.name} className="profile-avatar" />
            <div className="profile-details">
              <h1>{user.name}</h1>
              <p>{user.email}</p>
              <div className="profile-stats">
                <div className="stat">
                  <span className="stat-number">{userTickets.length}</span>
                  <span className="stat-label">Tickets Posted</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{userSwapRequests.length}</span>
                  <span className="stat-label">Swap Requests</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4.8</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-actions">
            <Link to="/post-ticket" className="btn btn-primary">
              <Plus size={16} />
              Post New Ticket
            </Link>
            <button className="btn btn-outline">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="profile-tabs">
          <button 
            className={`tab ${activeTab === 'my-tickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-tickets')}
          >
            My Tickets ({userTickets.length})
          </button>
          <button 
            className={`tab ${activeTab === 'swap-requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('swap-requests')}
          >
            Swap Requests ({userSwapRequests.length})
          </button>
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="profile-content">
          {activeTab === 'my-tickets' && (
            <div className="my-tickets">
              <h2>My Posted Tickets</h2>
              {userTickets.length === 0 ? (
                <div className="empty-state">
                  <h3>No tickets posted yet</h3>
                  <p>Start by posting your first ticket to get started with swapping.</p>
                  <Link to="/post-ticket" className="btn btn-primary">
                    Post Your First Ticket
                  </Link>
                </div>
              ) : (
                <div className="tickets-grid">
                  {userTickets.map(ticket => (
                    <div key={ticket.id} className="ticket-card">
                      <div className="ticket-image">
                        <ImageWithFallback src={ticket.image} alt={ticket.title} />
                        <div className="ticket-type-badge">
                          {ticket.type === 'movie' ? '🎬' : '🎭'}
                        </div>
                        <div className={`ticket-status ${ticket.status}`}>
                          {ticket.status}
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

                        <div className="ticket-actions">
                          <Link to={`/ticket/${ticket.id}`} className="btn btn-outline">
                            View
                          </Link>
                          <button className="btn btn-outline">
                            <Edit size={16} />
                            Edit
                          </button>
                          <button 
                            className="btn btn-danger"
                            onClick={() => handleDeleteTicket(ticket.id)}
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'swap-requests' && (
            <div className="swap-requests">
              <h2>Swap Requests</h2>
              {userSwapRequests.length === 0 ? (
                <div className="empty-state">
                  <h3>No swap requests yet</h3>
                  <p>When someone requests to swap your tickets, they'll appear here.</p>
                </div>
              ) : (
                <div className="requests-list">
                  {userSwapRequests.map(request => (
                    <div key={request.id} className="request-card">
                      <div className="request-header">
                        <div className="requester-info">
                          <ImageWithFallback 
                            src={request.requesterAvatar} 
                            alt={request.requesterName}
                            className="requester-avatar"
                          />
                          <div>
                            <h4>{request.requesterName}</h4>
                            <span className="request-date">
                              {new Date(request.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className={`request-status ${request.status}`}>
                          {request.status}
                        </div>
                      </div>
                      
                      <div className="request-content">
                        <p className="request-message">{request.message}</p>
                        {request.offer && (
                          <div className="request-offer">
                            <strong>Offer:</strong> {request.offer}
                          </div>
                        )}
                      </div>
                      
                      <div className="request-actions">
                        <button className="btn btn-primary">
                          <MessageCircle size={16} />
                          Message
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button className="btn btn-success">Accept</button>
                            <button className="btn btn-danger">Decline</button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings">
              <h2>Account Settings</h2>
              <div className="settings-sections">
                <div className="settings-section">
                  <h3>Profile Information</h3>
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" value={user.name} readOnly />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={user.email} readOnly />
                  </div>
                  <button className="btn btn-outline">Edit Profile</button>
                </div>

                <div className="settings-section">
                  <h3>Notification Preferences</h3>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span>Email notifications for new swap requests</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" defaultChecked />
                      <span>Push notifications for messages</span>
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" />
                      <span>Marketing emails and updates</span>
                    </label>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Privacy & Security</h3>
                  <button className="btn btn-outline">Change Password</button>
                  <button className="btn btn-outline">Two-Factor Authentication</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile