import React, { createContext, useContext, useState } from 'react';
import type { EventItem, TicketBooking } from '../types/event';
import { MOCK_EVENTS } from '../data/mockEvents';

export type ViewTab = 
  | 'home' 
  | 'explore' 
  | 'event-detail' 
  | 'create-event' 
  | 'tickets' 
  | 'dashboard' 
  | 'scanner' 
  | 'certificates' 
  | 'networking' 
  | 'admin'
  | 'od-certificates'
  | 'approvals';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface AppContextType {
  activeView: ViewTab;
  setActiveView: (view: ViewTab) => void;
  events: EventItem[];
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem | null) => void;
  bookings: TicketBooking[];
  addBooking: (booking: TicketBooking) => void;
  updateBookingStatus: (id: string, status: TicketBooking['status']) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  scannerModalOpen: boolean;
  setScannerModalOpen: (open: boolean) => void;
  notificationsDrawerOpen: boolean;
  setNotificationsDrawerOpen: (open: boolean) => void;
}

const INITIAL_BOOKINGS: TicketBooking[] = [
  {
    id: 'tkt-vitopia-9901',
    eventId: 'evt-vitopia-2026',
    eventTitle: 'Vitopia 2026 — International Cultural & Sports Fest',
    eventDate: '2026-09-24',
    eventLocation: 'Open Air Theatre (OAT), VIT-AP',
    eventBanner: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    tierName: 'VIP Pro-Night Pass',
    seatNumber: 'Row A (Seat A12)',
    quantity: 1,
    totalAmount: 799,
    qrCodeValue: 'VITAP:TKT:9901:Alex:23BCE1092',
    purchasedAt: '2026-07-28T14:32:00Z',
    status: 'valid',
    attendeeName: 'Alex Rivera',
    attendeeEmail: 'alex.rivera@vitap.ac.in'
  },
  {
    id: 'tkt-vtapp-8802',
    eventId: 'evt-vtapp-2026',
    eventTitle: 'VTAPP 2026 — Annual National Tech Fest',
    eventDate: '2026-10-14',
    eventLocation: 'APJ Abdul Kalam Auditorium (AB1), VIT-AP',
    eventBanner: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    tierName: 'Group Hacker Pass',
    seatNumber: 'Multipurpose Hall (MPH Stage)',
    quantity: 1,
    totalAmount: 199,
    qrCodeValue: 'VITAP:TKT:8802:Alex:23BCE1092',
    purchasedAt: '2026-07-29T10:15:00Z',
    status: 'valid',
    attendeeName: 'Alex Rivera',
    attendeeEmail: 'alex.rivera@vitap.ac.in'
  }
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🎉 Vitopia 2026 Ticket Confirmed',
    message: 'Your VIP Pro-Night Pass for OAT stage is ready in My Passes.',
    time: '10m ago',
    read: false,
    type: 'success'
  },
  {
    id: 'notif-2',
    title: '📄 VTOP On-Duty Sheet Unlocked',
    message: 'Attendance duration verified (>80%). Export your OD Sheet in Certificates view.',
    time: '1h ago',
    read: false,
    type: 'info'
  },
  {
    id: 'notif-3',
    title: '⚡ VTAPP 48h Hackathon Starting',
    message: 'Multipurpose Hall (MPH) gate scanning opens at 09:00 AM tomorrow.',
    time: '3h ago',
    read: true,
    type: 'warning'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<ViewTab>('home');
  const [events] = useState<EventItem[]>(MOCK_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(MOCK_EVENTS[0]);
  const [bookings, setBookings] = useState<TicketBooking[]>(INITIAL_BOOKINGS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [scannerModalOpen, setScannerModalOpen] = useState(false);
  const [notificationsDrawerOpen, setNotificationsDrawerOpen] = useState(false);

  const addBooking = (booking: TicketBooking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const updateBookingStatus = (id: string, status: TicketBooking['status']) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <AppContext.Provider value={{
      activeView,
      setActiveView,
      events,
      selectedEvent,
      setSelectedEvent,
      bookings,
      addBooking,
      updateBookingStatus,
      searchQuery,
      setSearchQuery,
      notifications,
      markNotificationAsRead,
      commandPaletteOpen,
      setCommandPaletteOpen,
      scannerModalOpen,
      setScannerModalOpen,
      notificationsDrawerOpen,
      setNotificationsDrawerOpen
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
