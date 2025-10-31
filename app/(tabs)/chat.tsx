import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Send, Gift, Users, MoreVertical, Mic } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import { messages as initialMessages, users } from '@/data/dummyData';

export default function ChatScreen() {
  const { currentChatRoom } = useApp();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  if (!currentChatRoom) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>💬</Text>
        <Text style={styles.emptyText}>Select a room to start chatting</Text>
        <Text style={styles.emptySubtext}>
          Join rooms from Home or Explore tabs
        </Text>
      </View>
    );
  }

  const roomMessages = messages.filter((m) => m.roomId === currentChatRoom.id);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        id: `msg${Date.now()}`,
        roomId: currentChatRoom.id,
        userId: 'user1',
        content: message,
        timestamp: new Date(),
        type: 'text' as const,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={140}
    >
      <View style={styles.header}>
        <View style={styles.roomInfo}>
          <View style={styles.roomIcon}>
            <Text style={styles.roomIconText}>{currentChatRoom.icon}</Text>
          </View>
          <View>
            <Text style={styles.roomName}>{currentChatRoom.name}</Text>
            <View style={styles.roomStats}>
              <Users size={12} color="#888" />
              <Text style={styles.roomStatsText}>
                {currentChatRoom.currentUsers} online
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="#00ffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {roomMessages.map((msg) => {
          const sender = users.find((u) => u.id === msg.userId);
          const isOwnMessage = msg.userId === 'user1';

          return (
            <View
              key={msg.id}
              style={[styles.messageRow, isOwnMessage && styles.messageRowOwn]}
            >
              {!isOwnMessage && (
                <Image source={{ uri: sender?.avatar }} style={styles.avatar} />
              )}
              <View
                style={[
                  styles.messageBubble,
                  isOwnMessage && styles.messageBubbleOwn,
                ]}
              >
                {!isOwnMessage && (
                  <Text style={styles.senderName}>{sender?.username}</Text>
                )}
                <Text
                  style={[
                    styles.messageText,
                    isOwnMessage && styles.messageTextOwn,
                  ]}
                >
                  {msg.content}
                </Text>
                <Text
                  style={[
                    styles.messageTime,
                    isOwnMessage && styles.messageTimeOwn,
                  ]}
                >
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Text>
              </View>
              {isOwnMessage && (
                <Image source={{ uri: sender?.avatar }} style={styles.avatar} />
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Gift size={24} color="#ff00ff" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#666"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.iconButton}>
          <Mic size={24} color="#00ffff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Send size={20} color={message.trim() ? '#0a0a1a' : '#666'} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a1a',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a1a',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a3a',
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a4a',
  },
  roomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roomIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0a0a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roomIconText: {
    fontSize: 20,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  roomStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  roomStatsText: {
    fontSize: 12,
    color: '#888',
  },
  moreButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  messageRow: {
    flexDirection: 'row',
    gap: 8,
    maxWidth: '80%',
  },
  messageRowOwn: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    backgroundColor: '#1a1a3a',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    maxWidth: '100%',
  },
  messageBubbleOwn: {
    backgroundColor: '#00ffff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
  },
  senderName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00ffff',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  messageTextOwn: {
    color: '#0a0a1a',
  },
  messageTime: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  messageTimeOwn: {
    color: '#0a4a4a',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a3a',
    borderTopWidth: 1,
    borderTopColor: '#2a2a4a',
    gap: 8,
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#fff',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#1a1a3a',
  },
});
