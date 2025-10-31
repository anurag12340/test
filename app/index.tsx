import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.5);
  const router = useRouter();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/auth/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2a', '#2a0a3a']} style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>💬</Text>
          <View style={styles.glowCircle} />
        </View>
        <Text style={styles.title}>NeoChat</Text>
        <Text style={styles.subtitle}>Connect in the Future</Text>
      </Animated.View>

      <View style={styles.bubbleContainer}>
        {[...Array(6)].map((_, i) => (
          <FloatingBubble key={i} delay={i * 500} />
        ))}
      </View>
    </LinearGradient>
  );
}

function FloatingBubble({ delay }: { delay: number }) {
  const translateY = new Animated.Value(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(translateY, {
          toValue: -800,
          duration: 4000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const randomLeft = Math.random() * 100;

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          left: `${randomLeft}%`,
          transform: [{ translateY }],
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  icon: {
    fontSize: 80,
    zIndex: 2,
  },
  glowCircle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#00ffff',
    opacity: 0.3,
    top: -10,
    left: -10,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ffff',
    textShadowColor: '#00ffff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#ff00ff',
    marginTop: 8,
    letterSpacing: 2,
  },
  bubbleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    position: 'absolute',
    bottom: -50,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00ffff',
    opacity: 0.2,
  },
});
