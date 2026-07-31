import React, { createContext, useContext, useState } from 'react';
import type { EventItem, TicketBooking } from '../types/event';
import { MOCK_EVENTS } from '../data/mockEvents';

export type ViewTab = 
  | 'home'
  | 'explore'
  | 'event-detail'
  | 'dashboard'
  | 'create-event'
  | 'live-event'
  | 'admin'
  | 'networking'
  | 'tickets'
  | 'scanner'
  | 'certificates'
  | 'settings';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'alert' | 'ticket';
}

interface AppContextType {
  events: EventItem[];
  activeView: ViewTab;
  setActiveView: (view: ViewTab) => void;
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem | null) => void;
  bookings: TicketBooking[];
  addBooking: (booking: TicketBooking) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (title: string, message: string, type?: AppNotification['type']) => void;
  notificationsDrawerOpen: boolean;
  setNotificationsDrawerOpen: (open: boolean) => void;
  addNewEvent: (newEvent: EventItem) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const INITIAL_BOOKINGS: TicketBooking[] = [
  {
    id: 'tkt-8819',
    eventId: 'evt-1',
    eventTitle: 'Global Tech & AI Summit 2026',
    eventDate: '2026-09-15',
    eventLocation: 'Palace of Fine Arts & Tech Dome, SF',
    eventBanner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
    tierName: 'VIP',
    seatNumber: 'Seat A-4 (VIP Arena)',
    quantity: 1,
    totalAmount: 799,
    qrCodeValue: 'EVENTSPHERE-TKT-8819-VIP-A4-VALID',
    purchasedAt: '2026-07-28 14:20',
    status: 'valid',
    attendeeName: 'Alex Rivera',
    attendeeEmail: 'alex.rivera@eventsphere.io'
  }
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n-1',
    title: 'VIP Ticket Confirmed!',
    message: 'Your VIP pass for Global Tech & AI Summit 2026 is ready. QR code generated.',
    timestamp: '10 mins ago',
    read: false,
    type: 'ticket'
  },
  {
    id: 'n-2',
    title: 'New Sponsor Onboarded',
    message: 'Stripe Platinum Sponsorship signed for $50,000.',
    timestamp: '1 hour ago',
    read: false,
    type: 'success'
  },
  {
    id: 'n-3',
    title: 'Live Q&A Room Opened',
    message: 'Elena Rostova is now taking live questions on Stage 1.',
    timestamp: '2 hours ago',
    read: true,
    type: 'info'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventItem[]>(MOCK_EVENTS);
  const [activeView, setActiveView] = useState<ViewTab>('home');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(MOCK_EVENTS[0]);
  const [bookings, setBookings] = useState<TicketBooking[]>(INITIAL_BOOKINGS);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [notificationsDrawerOpen, setNotificationsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const addBooking = (booking: TicketBooking) => {
    setBookings(prev => [booking, ...prev]);
    addNotification('Ticket Purchased!', `Successfully booked ${booking.quantity} ticket for ${booking.eventTitle}.`, 'ticket');
  };

  const addNotification = (title: string, message: string, type: AppNotification['type'] = 'info') => {
    const newNotif: AppNotification = {
      id: `n-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNewEvent = (newEvent: EventItem) => {
    setEvents(prev => [newEvent, ...prev]);
    addNotification('Event Created!', `"${newEvent.title}" has been published successfully.`, 'success');
  };

  return (
    <AppContext.Provider value={{
      events,
      activeView,
      setActiveView,
      selectedEvent,
      setSelectedEvent,
      bookings,
      addBooking,
      commandPaletteOpen,
      setCommandPaletteOpen,
      notifications,
      markNotificationAsRead,
      addNotification,
      notificationsDrawerOpen,
      setNotificationsDrawerOpen,
      addNewEvent,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
