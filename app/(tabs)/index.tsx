import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { TrendingUp, Users, Crown, Zap } from 'lucide-react-native';
import { rooms, users } from '@/data/dummyData';
import { useApp } from '@/contexts/AppContext';

export default function HomeScreen() {
  const router = useRouter();
  const { addActiveRoom, setCurrentChatRoom } = useApp();

  const handleRoomPress = (room: any) => {
    addActiveRoom(room);
    setCurrentChatRoom(room);
    router.push('/(tabs)/chat');
  };

  const trendingRooms = rooms.filter((r) => r.isHot).slice(0, 3);
  const suggestedFriends = users.filter((u) => u.isOnline).slice(0, 4);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#1a0a3a', '#0a0a1a']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Welcome Back, NeonDreamer</Text>
          <Text style={styles.headerSubtitle}>Ready to connect?</Text>
        </LinearGradient>

        <View style={styles.banner}>
          <LinearGradient
            colors={['#ff00ff', '#00ffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.bannerGradient}
          >
            <Zap size={24} color="#fff" />
            <Text style={styles.bannerText}>15 Live Rooms Right Now</Text>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrendingUp size={20} color="#00ffff" />
            <Text style={styles.sectionTitle}>Trending Rooms</Text>
          </View>
          {trendingRooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={styles.roomCard}
              onPress={() => handleRoomPress(room)}
            >
              <View style={styles.roomIcon}>
                <Text style={styles.roomIconText}>{room.icon}</Text>
              </View>
              <View style={styles.roomInfo}>
                <View style={styles.roomHeader}>
                  <Text style={styles.roomName}>{room.name}</Text>
                  {room.isHot && (
                    <View style={styles.hotBadge}>
                      <Text style={styles.hotBadgeText}>HOT</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.roomTopic}>{room.topic}</Text>
                <View style={styles.roomStats}>
                  <Users size={14} color="#888" />
                  <Text style={styles.roomStatsText}>
                    {room.currentUsers}/{room.maxUsers}
                  </Text>
                  <Text style={styles.roomLanguage}>{room.language}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Users size={20} color="#00ffff" />
            <Text style={styles.sectionTitle}>Suggested Friends</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.friendsScroll}
          >
            {suggestedFriends.map((user) => (
              <View key={user.id} style={styles.friendCard}>
                <Image source={{ uri: user.avatar }} style={styles.friendAvatar} />
                {user.isOnline && <View style={styles.onlineIndicator} />}
                <Text style={styles.friendName}>{user.username}</Text>
                <Text style={styles.friendLevel}>Level {user.level}</Text>
                {user.isVIP && (
                  <Crown size={16} color="#FFD700" style={styles.vipIcon} />
                )}
                <TouchableOpacity style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => router.push('/(tabs)/explore')}
            >
              <LinearGradient
                colors={['#00ffff', '#0099ff']}
                style={styles.quickActionGradient}
              >
                <Compass size={24} color="#fff" />
                <Text style={styles.quickActionText}>Browse Rooms</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAction}>
              <LinearGradient
                colors={['#ff00ff', '#ff0066']}
                style={styles.quickActionGradient}
              >
                <Users size={24} color="#fff" />
                <Text style={styles.quickActionText}>Create Room</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#888',
  },
  banner: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  bannerGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  roomCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a3a',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  roomIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  roomIconText: {
    fontSize: 24,
  },
  roomInfo: {
    flex: 1,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  hotBadge: {
    backgroundColor: '#ff0066',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hotBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  roomTopic: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  roomStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roomStatsText: {
    fontSize: 12,
    color: '#888',
  },
  roomLanguage: {
    fontSize: 12,
    color: '#00ffff',
    marginLeft: 8,
  },
  joinButton: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a0a1a',
  },
  friendsScroll: {
    paddingHorizontal: 20,
    gap: 16,
  },
  friendCard: {
    width: 120,
    alignItems: 'center',
    backgroundColor: '#1a1a3a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  onlineIndicator: {
    position: 'absolute',
    top: 16,
    right: 28,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00ff00',
    borderWidth: 2,
    borderColor: '#1a1a3a',
  },
  friendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  friendLevel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  vipIcon: {
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0a0a1a',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
