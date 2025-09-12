import { createContext, useContext, useReducer } from 'react'

const TicketContext = createContext()

const initialState = {
  tickets: [
    {
      id: 1,
      title: "Avengers: Endgame - IMAX",
      type: "movie",
      date: "2024-02-15",
      time: "19:30",
      venue: "AMC Theater Downtown",
      location: "New York, NY",
      price: 25,
      originalPrice: 30,
      seller: {
        id: 2,
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 4.8
      },
      description: "Great seats in the middle section. Can't make it due to work emergency.",
      image: "https://images.unsplash.com/photo-1489599804150-0b0b0b0b0b0b?w=400&h=300&fit=crop&auto=format",
      status: "available",
      createdAt: "2024-01-20T10:00:00Z"
    },
    {
      id: 2,
      title: "Taylor Swift Concert",
      type: "event",
      date: "2024-02-20",
      time: "20:00",
      venue: "Madison Square Garden",
      location: "New York, NY",
      price: 150,
      originalPrice: 200,
      seller: {
        id: 3,
        name: "Mike Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.9
      },
      description: "Floor seats, section A. Selling due to family emergency.",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
      status: "available",
      createdAt: "2024-01-18T14:30:00Z"
    },
    {
      id: 3,
      title: "Hamilton Musical",
      type: "event",
      date: "2024-02-25",
      time: "19:00",
      venue: "Richard Rodgers Theatre",
      location: "New York, NY",
      price: 120,
      originalPrice: 150,
      seller: {
        id: 4,
        name: "Emily Davis",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.7
      },
      description: "Orchestra seats, row 8. Can't attend due to travel.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&auto=format",
      status: "available",
      createdAt: "2024-01-22T09:15:00Z"
    },
    {
      id: 4,
      title: "Spider-Man: No Way Home",
      type: "movie",
      date: "2024-02-18",
      time: "16:45",
      venue: "Regal Cinemas",
      location: "Los Angeles, CA",
      price: 18,
      originalPrice: 22,
      seller: {
        id: 5,
        name: "Alex Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        rating: 4.6
      },
      description: "Premium seats with reclining chairs. Great view!",
      image: "https://images.unsplash.com/photo-1489599804150-0b0b0b0b0b0b?w=400&h=300&fit=crop&auto=format",
      status: "available",
      createdAt: "2024-01-19T16:20:00Z"
    }
  ],
  userTickets: [],
  swapRequests: []
}

function ticketReducer(state, action) {
  switch (action.type) {
    case 'ADD_TICKET':
      return {
        ...state,
        tickets: [...state.tickets, action.payload]
      }
    case 'UPDATE_TICKET':
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.id === action.payload.id ? action.payload : ticket
        )
      }
    case 'DELETE_TICKET':
      return {
        ...state,
        tickets: state.tickets.filter(ticket => ticket.id !== action.payload)
      }
    case 'ADD_SWAP_REQUEST':
      return {
        ...state,
        swapRequests: [...state.swapRequests, action.payload]
      }
    case 'UPDATE_SWAP_REQUEST':
      return {
        ...state,
        swapRequests: state.swapRequests.map(request =>
          request.id === action.payload.id ? action.payload : request
        )
      }
    default:
      return state
  }
}

export function TicketProvider({ children }) {
  const [state, dispatch] = useReducer(ticketReducer, initialState)

  const addTicket = (ticket) => {
    const newTicket = {
      ...ticket,
      id: Date.now(),
      status: 'available',
      createdAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_TICKET', payload: newTicket })
  }

  const updateTicket = (ticket) => {
    dispatch({ type: 'UPDATE_TICKET', payload: ticket })
  }

  const deleteTicket = (ticketId) => {
    dispatch({ type: 'DELETE_TICKET', payload: ticketId })
  }

  const requestSwap = (swapRequest) => {
    const newRequest = {
      ...swapRequest,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    dispatch({ type: 'ADD_SWAP_REQUEST', payload: newRequest })
  }

  const updateSwapRequest = (request) => {
    dispatch({ type: 'UPDATE_SWAP_REQUEST', payload: request })
  }

  const value = {
    ...state,
    addTicket,
    updateTicket,
    deleteTicket,
    requestSwap,
    updateSwapRequest
  }

  return (
    <TicketContext.Provider value={value}>
      {children}
    </TicketContext.Provider>
  )
}

export function useTickets() {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error('useTickets must be used within a TicketProvider')
  }
  return context
}