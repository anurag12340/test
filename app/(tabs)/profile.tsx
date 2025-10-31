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
import {
  Edit3,
  Settings,
  Users,
  Award,
  Gift,
  Bell,
  Shield,
  LogOut,
} from 'lucide-react-native';
import { currentUser } from '@/data/dummyData';

export default function ProfileScreen() {
  const levelProgress = (currentUser.xp % 1000) / 1000;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#1a0a3a', '#0a0a1a']} style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarRing, { borderColor: '#00ffff' }]}>
              <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            </View>
            {currentUser.isOnline && <View style={styles.onlineIndicator} />}
          </View>

          <Text style={styles.username}>{currentUser.username}</Text>
          {currentUser.bio && <Text style={styles.bio}>{currentUser.bio}</Text>}

          <View style={styles.levelContainer}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Level {currentUser.level}</Text>
            </View>
            <View style={styles.countryBadge}>
              <Text style={styles.countryText}>{currentUser.country}</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${levelProgress * 100}%` }]} />
            </View>
            <Text style={styles.xpText}>
              {currentUser.xp % 1000} / 1000 XP
            </Text>
          </View>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentUser.coins}</Text>
              <Text style={styles.statLabel}>Coins</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{currentUser.diamonds}</Text>
              <Text style={styles.statLabel}>Diamonds</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>247</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton}>
            <Edit3 size={18} color="#0a0a1a" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.content}>
          {currentUser.interests && currentUser.interests.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Interests</Text>
              <View style={styles.interests}>
                {currentUser.interests.map((interest) => (
                  <View key={interest} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Menu</Text>
            <View style={styles.menuItems}>
              <MenuItem icon={Users} label="Friends List" count="247" />
              <MenuItem icon={Award} label="Leaderboards" />
              <MenuItem icon={Gift} label="My Gifts" />
              <MenuItem icon={Bell} label="Notifications" />
              <MenuItem icon={Shield} label="Privacy & Security" />
              <MenuItem icon={Settings} label="Settings" />
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#ff0066" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function MenuItem({
  icon: Icon,
  label,
  count,
}: {
  icon: any;
  label: string;
  count?: string;
}) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>
          <Icon size={20} color="#00ffff" />
        </View>
        <Text style={styles.menuItemLabel}>{label}</Text>
      </View>
      <View style={styles.menuItemRight}>
        {count && <Text style={styles.menuItemCount}>{count}</Text>}
        <Text style={styles.menuItemArrow}>›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    padding: 4,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#00ff00',
    borderWidth: 3,
    borderColor: '#1a0a3a',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  levelContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  levelBadge: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a0a1a',
  },
  countryBadge: {
    backgroundColor: '#1a1a3a',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  countryText: {
    fontSize: 14,
    color: '#fff',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1a1a3a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ffff',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  stats: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#1a1a3a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#2a2a4a',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00ffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a0a1a',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestTag: {
    backgroundColor: '#1a1a3a',
    borderWidth: 1,
    borderColor: '#00ffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  interestText: {
    fontSize: 14,
    color: '#00ffff',
  },
  menuItems: {
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a3a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: '#fff',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuItemCount: {
    fontSize: 14,
    color: '#00ffff',
    fontWeight: '600',
  },
  menuItemArrow: {
    fontSize: 24,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1a1a3a',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ff0066',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff0066',
  },
});
