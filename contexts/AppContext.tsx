import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Room, User, Message, currentUser as initialUser, activeRooms as initialActiveRooms } from '@/data/dummyData';

interface AppContextType {
  currentUser: User;
  activeRooms: Room[];
  addActiveRoom: (room: Room) => void;
  removeActiveRoom: (roomId: string) => void;
  updateRoomUnread: (roomId: string, count: number) => void;
  currentChatRoom: Room | null;
  setCurrentChatRoom: (room: Room | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser] = useState<User>(initialUser);
  const [activeRooms, setActiveRooms] = useState<Room[]>(initialActiveRooms);
  const [currentChatRoom, setCurrentChatRoom] = useState<Room | null>(null);

  const addActiveRoom = (room: Room) => {
    setActiveRooms((prev) => {
      const exists = prev.find((r) => r.id === room.id);
      if (exists) return prev;
      return [...prev, room];
    });
  };

  const removeActiveRoom = (roomId: string) => {
    setActiveRooms((prev) => prev.filter((r) => r.id !== roomId));
  };

  const updateRoomUnread = (roomId: string, count: number) => {
    setActiveRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, unreadCount: count } : r))
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        activeRooms,
        addActiveRoom,
        removeActiveRoom,
        updateRoomUnread,
        currentChatRoom,
        setCurrentChatRoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
