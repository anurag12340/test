import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, Filter, Users, Crown, Lock } from 'lucide-react-native';
import { rooms } from '@/data/dummyData';
import { useRouter } from 'expo-router';
import { useApp } from '@/contexts/AppContext';

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const router = useRouter();
  const { addActiveRoom, setCurrentChatRoom } = useApp();

  const categories = ['All', 'Gaming', 'Music', 'General', 'VIP'];

  const handleRoomPress = (room: any) => {
    addActiveRoom(room);
    setCurrentChatRoom(room);
    router.push('/(tabs)/chat');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Rooms</Text>
        <View style={styles.searchContainer}>
          <Search size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rooms or people..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#00ffff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryChipText,
                selectedCategory === category && styles.categoryChipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Global Rooms</Text>
            <Text style={styles.sectionCount}>{rooms.length} rooms</Text>
          </View>

          {rooms.map((room) => (
            <TouchableOpacity
              key={room.id}
              style={styles.roomCard}
              onPress={() => handleRoomPress(room)}
            >
              <View style={styles.roomTop}>
                <View style={styles.roomIconLarge}>
                  <Text style={styles.roomIconText}>{room.icon}</Text>
                </View>
                <View style={styles.roomBadges}>
                  {room.isHot && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>🔥 HOT</Text>
                    </View>
                  )}
                  {room.isVIPOnly && (
                    <View style={[styles.badge, styles.badgeVIP]}>
                      <Crown size={12} color="#FFD700" />
                      <Text style={[styles.badgeText, { color: '#FFD700' }]}>VIP</Text>
                    </View>
                  )}
                  {room.levelRequired > 5 && (
                    <View style={[styles.badge, styles.badgeLevel]}>
                      <Lock size={12} color="#ff00ff" />
                      <Text style={[styles.badgeText, { color: '#ff00ff' }]}>
                        Lvl {room.levelRequired}+
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <Text style={styles.roomNameLarge}>{room.name}</Text>
              <Text style={styles.roomTopicLarge}>{room.topic}</Text>

              <View style={styles.roomFooter}>
                <View style={styles.roomUsers}>
                  <Users size={16} color="#00ffff" />
                  <Text style={styles.roomUsersText}>
                    {room.currentUsers}/{room.maxUsers}
                  </Text>
                </View>
                <View style={styles.roomMeta}>
                  <Text style={styles.roomMetaText}>{room.language}</Text>
                  <Text style={styles.roomMetaText}>•</Text>
                  <Text style={styles.roomMetaText}>{room.country}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.joinButtonLarge}>
                <Text style={styles.joinButtonText}>Join Room</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a3a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a4a',
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
  },
  filterButton: {
    padding: 8,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a3a',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  categoryChipActive: {
    backgroundColor: '#00ffff',
    borderColor: '#00ffff',
  },
  categoryChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  categoryChipTextActive: {
    color: '#0a0a1a',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  sectionCount: {
    fontSize: 14,
    color: '#888',
  },
  roomCard: {
    backgroundColor: '#1a1a3a',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  roomTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  roomIconLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00ffff',
  },
  roomIconText: {
    fontSize: 32,
  },
  roomBadges: {
    gap: 6,
    alignItems: 'flex-end',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff006620',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  badgeVIP: {
    backgroundColor: '#FFD70020',
  },
  badgeLevel: {
    backgroundColor: '#ff00ff20',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ff0066',
  },
  roomNameLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  roomTopicLarge: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  roomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  roomUsers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roomUsersText: {
    fontSize: 14,
    color: '#00ffff',
    fontWeight: '600',
  },
  roomMeta: {
    flexDirection: 'row',
    gap: 8,
  },
  roomMetaText: {
    fontSize: 12,
    color: '#666',
  },
  joinButtonLarge: {
    backgroundColor: '#00ffff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a0a1a',
  },
});
