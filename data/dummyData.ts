export interface User {
  id: string;
  username: string;
  avatar: string;
  level: number;
  xp: number;
  country: string;
  isVIP: boolean;
  isOnline: boolean;
  bio?: string;
  interests?: string[];
  coins: number;
  diamonds: number;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  topic: string;
  isPublic: boolean;
  maxUsers: number;
  currentUsers: number;
  isHot: boolean;
  isVIPOnly: boolean;
  levelRequired: number;
  language: string;
  country: string;
  adminIds: string[];
  unreadCount?: number;
}

export interface Message {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'gift' | 'voice';
  giftId?: string;
}

export interface Gift {
  id: string;
  name: string;
  icon: string;
  animation: string;
  price: number;
  currency: 'coins' | 'diamonds';
  xpBonus: number;
}

export const currentUser: User = {
  id: 'user1',
  username: 'NeonDreamer',
  avatar: 'https://i.pravatar.cc/150?img=1',
  level: 15,
  xp: 2450,
  country: '🇺🇸',
  isVIP: true,
  isOnline: true,
  bio: 'Chat enthusiast | Night owl 🌙',
  interests: ['Gaming', 'Music', 'Tech'],
  coins: 5000,
  diamonds: 250,
};

export const users: User[] = [
  currentUser,
  {
    id: 'user2',
    username: 'StarGazer',
    avatar: 'https://i.pravatar.cc/150?img=2',
    level: 22,
    xp: 4500,
    country: '🇬🇧',
    isVIP: true,
    isOnline: true,
    bio: 'Always exploring new worlds',
    interests: ['Travel', 'Photography'],
    coins: 8500,
    diamonds: 420,
  },
  {
    id: 'user3',
    username: 'MoonWalker',
    avatar: 'https://i.pravatar.cc/150?img=3',
    level: 8,
    xp: 890,
    country: '🇯🇵',
    isVIP: false,
    isOnline: true,
    interests: ['Anime', 'Art'],
    coins: 1200,
    diamonds: 50,
  },
  {
    id: 'user4',
    username: 'PixelKing',
    avatar: 'https://i.pravatar.cc/150?img=4',
    level: 31,
    xp: 8900,
    country: '🇰🇷',
    isVIP: true,
    isOnline: false,
    bio: 'Pro gamer | Streamer',
    interests: ['Gaming', 'Esports'],
    coins: 15000,
    diamonds: 890,
  },
  {
    id: 'user5',
    username: 'VibeMaster',
    avatar: 'https://i.pravatar.cc/150?img=5',
    level: 18,
    xp: 3200,
    country: '🇮🇳',
    isVIP: false,
    isOnline: true,
    interests: ['Music', 'Dance'],
    coins: 3400,
    diamonds: 120,
  },
];

export const rooms: Room[] = [
  {
    id: 'room1',
    name: 'Global Lounge',
    icon: '🌍',
    topic: 'General Chat',
    isPublic: true,
    maxUsers: 100,
    currentUsers: 47,
    isHot: true,
    isVIPOnly: false,
    levelRequired: 1,
    language: 'English',
    country: 'Global',
    adminIds: ['user2'],
    unreadCount: 3,
  },
  {
    id: 'room2',
    name: 'Gaming Arena',
    icon: '🎮',
    topic: 'Gaming Discussion',
    isPublic: true,
    maxUsers: 50,
    currentUsers: 38,
    isHot: true,
    isVIPOnly: false,
    levelRequired: 5,
    language: 'English',
    country: 'Global',
    adminIds: ['user4'],
    unreadCount: 12,
  },
  {
    id: 'room3',
    name: 'VIP Lounge',
    icon: '👑',
    topic: 'Exclusive VIP Chat',
    isPublic: false,
    maxUsers: 30,
    currentUsers: 15,
    isHot: false,
    isVIPOnly: true,
    levelRequired: 10,
    language: 'English',
    country: 'Global',
    adminIds: ['user2', 'user4'],
  },
  {
    id: 'room4',
    name: 'Music Vibes',
    icon: '🎵',
    topic: 'Music Lovers Unite',
    isPublic: true,
    maxUsers: 75,
    currentUsers: 52,
    isHot: true,
    isVIPOnly: false,
    levelRequired: 3,
    language: 'English',
    country: 'Global',
    adminIds: ['user5'],
    unreadCount: 5,
  },
  {
    id: 'room5',
    name: 'Anime Club',
    icon: '⚡',
    topic: 'Anime & Manga',
    isPublic: true,
    maxUsers: 60,
    currentUsers: 41,
    isHot: false,
    isVIPOnly: false,
    levelRequired: 1,
    language: 'English',
    country: 'Global',
    adminIds: ['user3'],
  },
  {
    id: 'room6',
    name: 'Tech Talk',
    icon: '💻',
    topic: 'Technology & Innovation',
    isPublic: true,
    maxUsers: 40,
    currentUsers: 22,
    isHot: false,
    isVIPOnly: false,
    levelRequired: 8,
    language: 'English',
    country: 'Global',
    adminIds: ['user1'],
  },
];

export const messages: Message[] = [
  {
    id: 'msg1',
    roomId: 'room1',
    userId: 'user2',
    content: 'Hey everyone! Welcome to Global Lounge 🎉',
    timestamp: new Date(Date.now() - 300000),
    type: 'text',
  },
  {
    id: 'msg2',
    roomId: 'room1',
    userId: 'user3',
    content: 'Thanks! Excited to be here!',
    timestamp: new Date(Date.now() - 240000),
    type: 'text',
  },
  {
    id: 'msg3',
    roomId: 'room1',
    userId: 'user1',
    content: 'Anyone up for gaming later?',
    timestamp: new Date(Date.now() - 180000),
    type: 'text',
  },
  {
    id: 'msg4',
    roomId: 'room2',
    userId: 'user4',
    content: 'Just won my last match! 🏆',
    timestamp: new Date(Date.now() - 120000),
    type: 'text',
  },
  {
    id: 'msg5',
    roomId: 'room2',
    userId: 'user5',
    content: 'Nice! What game?',
    timestamp: new Date(Date.now() - 60000),
    type: 'text',
  },
];

export const gifts: Gift[] = [
  {
    id: 'gift1',
    name: 'Rose',
    icon: '🌹',
    animation: 'float',
    price: 50,
    currency: 'coins',
    xpBonus: 10,
  },
  {
    id: 'gift2',
    name: 'Diamond Ring',
    icon: '💍',
    animation: 'sparkle',
    price: 500,
    currency: 'coins',
    xpBonus: 100,
  },
  {
    id: 'gift3',
    name: 'Sports Car',
    icon: '🏎️',
    animation: 'drive',
    price: 50,
    currency: 'diamonds',
    xpBonus: 500,
  },
  {
    id: 'gift4',
    name: 'Crown',
    icon: '👑',
    animation: 'shine',
    price: 100,
    currency: 'diamonds',
    xpBonus: 1000,
  },
];

export const activeRooms = [rooms[0], rooms[1], rooms[3]];
