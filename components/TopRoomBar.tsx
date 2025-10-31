import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useApp } from '@/contexts/AppContext';
import { Room } from '@/data/dummyData';

interface TopRoomBarProps {
  onRoomPress: (room: Room) => void;
}

export default function TopRoomBar({ onRoomPress }: TopRoomBarProps) {
  const { activeRooms, currentChatRoom } = useApp();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {activeRooms.map((room) => (
          <RoomIcon
            key={room.id}
            room={room}
            isActive={currentChatRoom?.id === room.id}
            onPress={() => onRoomPress(room)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function RoomIcon({ room, isActive, onPress }: { room: Room; isActive: boolean; onPress: () => void }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (room.unreadCount && room.unreadCount > 0 && !isActive) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [room.unreadCount, isActive]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
      <Animated.View
        style={[
          styles.iconCircle,
          isActive && styles.iconCircleActive,
          room.unreadCount && room.unreadCount > 0 && !isActive && styles.iconCircleUnread,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Text style={styles.iconText}>{room.icon}</Text>
      </Animated.View>
      {room.unreadCount && room.unreadCount > 0 && !isActive ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{room.unreadCount}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#0a0a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a3a',
  },
  scrollContent: {
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    position: 'relative',
    marginHorizontal: 4,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1a1a3a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2a2a4a',
  },
  iconCircleActive: {
    borderColor: '#00ffff',
    backgroundColor: '#0a2a3a',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  iconCircleUnread: {
    borderColor: '#ff00ff',
    shadowColor: '#ff00ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  iconText: {
    fontSize: 24,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#ff0066',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
