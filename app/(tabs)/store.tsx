import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ShoppingBag, Coins, Gem, Crown, Sparkles } from 'lucide-react-native';
import { gifts, currentUser } from '@/data/dummyData';

const { width } = Dimensions.get('window');

export default function StoreScreen() {
  const [selectedTab, setSelectedTab] = useState<'gifts' | 'coins'>('gifts');

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1a0a3a', '#0a0a1a']} style={styles.header}>
        <Text style={styles.headerTitle}>Store</Text>
        <View style={styles.balance}>
          <View style={styles.balanceItem}>
            <Coins size={18} color="#FFD700" />
            <Text style={styles.balanceText}>{currentUser.coins}</Text>
          </View>
          <View style={styles.balanceItem}>
            <Gem size={18} color="#00ffff" />
            <Text style={styles.balanceText}>{currentUser.diamonds}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'gifts' && styles.tabActive]}
          onPress={() => setSelectedTab('gifts')}
        >
          <Text style={[styles.tabText, selectedTab === 'gifts' && styles.tabTextActive]}>
            Gifts & Stickers
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'coins' && styles.tabActive]}
          onPress={() => setSelectedTab('coins')}
        >
          <Text style={[styles.tabText, selectedTab === 'coins' && styles.tabTextActive]}>
            Recharge
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === 'gifts' ? <GiftsTab /> : <RechargeTab />}
      </ScrollView>
    </View>
  );
}

function GiftsTab() {
  return (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Gifts</Text>
        <View style={styles.giftsGrid}>
          {gifts.map((gift) => (
            <View key={gift.id} style={styles.giftCard}>
              <View style={styles.giftIconContainer}>
                <Text style={styles.giftIcon}>{gift.icon}</Text>
                <View style={styles.giftBadge}>
                  <Sparkles size={10} color="#FFD700" />
                </View>
              </View>
              <Text style={styles.giftName}>{gift.name}</Text>
              <View style={styles.giftPrice}>
                {gift.currency === 'coins' ? (
                  <Coins size={14} color="#FFD700" />
                ) : (
                  <Gem size={14} color="#00ffff" />
                )}
                <Text style={styles.giftPriceText}>{gift.price}</Text>
              </View>
              <Text style={styles.giftXP}>+{gift.xpBonus} XP</Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>VIP Exclusive</Text>
        <View style={styles.vipCard}>
          <Crown size={32} color="#FFD700" />
          <Text style={styles.vipTitle}>Unlock Premium Gifts</Text>
          <Text style={styles.vipSubtitle}>
            Get access to exclusive animated gifts and special effects
          </Text>
          <TouchableOpacity style={styles.vipButton}>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.vipButtonGradient}
            >
              <Text style={styles.vipButtonText}>Upgrade to VIP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function RechargeTab() {
  const rechargePacks = [
    { coins: 1000, price: '$0.99', bonus: 0 },
    { coins: 5000, price: '$4.99', bonus: 500 },
    { coins: 12000, price: '$9.99', bonus: 2000 },
    { coins: 30000, price: '$19.99', bonus: 6000 },
  ];

  const diamondPacks = [
    { diamonds: 100, price: '$4.99', bonus: 0 },
    { diamonds: 500, price: '$19.99', bonus: 100 },
    { diamonds: 1200, price: '$49.99', bonus: 400 },
    { diamonds: 3000, price: '$99.99', bonus: 1000 },
  ];

  return (
    <View style={styles.tabContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Coin Packs</Text>
        <View style={styles.rechargeGrid}>
          {rechargePacks.map((pack, index) => (
            <View key={index} style={styles.rechargeCard}>
              {pack.bonus > 0 && (
                <View style={styles.bonusBadge}>
                  <Text style={styles.bonusText}>+{pack.bonus} Bonus</Text>
                </View>
              )}
              <Coins size={32} color="#FFD700" />
              <Text style={styles.rechargeAmount}>{pack.coins}</Text>
              <Text style={styles.rechargeCoins}>Coins</Text>
              <TouchableOpacity style={styles.rechargeButton}>
                <Text style={styles.rechargeButtonText}>{pack.price}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Diamond Packs</Text>
        <View style={styles.rechargeGrid}>
          {diamondPacks.map((pack, index) => (
            <View key={index} style={styles.rechargeCard}>
              {pack.bonus > 0 && (
                <View style={styles.bonusBadge}>
                  <Text style={styles.bonusText}>+{pack.bonus} Bonus</Text>
                </View>
              )}
              <Gem size={32} color="#00ffff" />
              <Text style={styles.rechargeAmount}>{pack.diamonds}</Text>
              <Text style={styles.rechargeCoins}>Diamonds</Text>
              <TouchableOpacity style={[styles.rechargeButton, styles.diamondButton]}>
                <Text style={styles.rechargeButtonText}>{pack.price}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.paymentMethods}>
        <Text style={styles.paymentTitle}>Payment Methods</Text>
        <View style={styles.paymentButtons}>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>💳 Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>📱 UPI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentButtonText}>💰 Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  balance: {
    flexDirection: 'row',
    gap: 16,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1a1a3a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  balanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#1a1a3a',
    borderRadius: 12,
  },
  tabActive: {
    backgroundColor: '#00ffff',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
  },
  tabTextActive: {
    color: '#0a0a1a',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
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
  giftsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  giftCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1a1a3a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  giftIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  giftIcon: {
    fontSize: 48,
  },
  giftBadge: {
    position: 'absolute',
    top: 0,
    right: -8,
    backgroundColor: '#1a1a3a',
    borderRadius: 8,
    padding: 2,
  },
  giftName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  giftPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  giftPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  giftXP: {
    fontSize: 12,
    color: '#00ffff',
    marginBottom: 12,
  },
  buyButton: {
    backgroundColor: '#00ffff',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
  },
  buyButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a0a1a',
  },
  vipCard: {
    backgroundColor: '#1a1a3a',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  vipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 12,
    marginBottom: 8,
  },
  vipSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 16,
  },
  vipButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  vipButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  vipButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0a0a1a',
  },
  rechargeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rechargeCard: {
    width: (width - 60) / 2,
    backgroundColor: '#1a1a3a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
    position: 'relative',
  },
  bonusBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#ff0066',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bonusText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  rechargeAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  rechargeCoins: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  rechargeButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 16,
  },
  diamondButton: {
    backgroundColor: '#00ffff',
  },
  rechargeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0a0a1a',
  },
  paymentMethods: {
    marginTop: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  paymentButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentButton: {
    flex: 1,
    backgroundColor: '#1a1a3a',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  paymentButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});
