import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatbotDialog } from '@/components/chatbot-dialog';

const sections = [
  { label: 'Personal Information', detail: 'Name, DOB, Address', icon: 'person-outline' as const },
  { label: 'Emergency Contact', detail: 'John Miller - Spouse', icon: 'phone' as const },
  { label: 'Medical Conditions', detail: 'Type 2 Diabetes, Hypertension', icon: 'favorite-border' as const },
  { label: 'Medication List', detail: '4 active medications', icon: 'medication' as const },
  { label: 'Notification Settings', detail: 'Reminders enabled', icon: 'notifications-none' as const },
  { label: 'Rewards & Points', detail: '75 points earned', icon: 'card-giftcard' as const },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <View style={styles.screen}>
        <View style={[styles.topHeader, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.topTitle}>Profile</Text>
          <Pressable style={styles.chatButton} onPress={() => setChatOpen(true)}>
            <MaterialIcons name="chat-bubble-outline" size={16} color="#efe6ff" />
            <Text style={styles.chatButtonText}>Chat</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.container, { paddingTop: insets.top + 92, paddingBottom: 120 }]}
          showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>
            <Text style={styles.name}>Sarah Johnson</Text>
            <Text style={styles.patientId}>Patient ID: #PH-29481</Text>
            <Pressable style={styles.editButton}>
              <MaterialIcons name="edit" size={15} color="#6f31c3" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </Pressable>
          </View>

          {sections.map((section) => (
            <View key={section.label} style={styles.sectionCard}>
              <View style={styles.sectionIcon}>
                <MaterialIcons name={section.icon} size={20} color="#7a35d5" />
              </View>
              <View style={styles.sectionTextWrap}>
                <Text style={styles.sectionTitle}>{section.label}</Text>
                <Text style={styles.sectionDetail}>{section.detail}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#757080" />
            </View>
          ))}
        </ScrollView>
      </View>

      <ChatbotDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f2f8',
  },
  topHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 12,
    backgroundColor: '#7a35d5',
    shadowColor: '#2d1b4b',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
  },
  topTitle: {
    color: '#f3ebff',
    fontSize: 34,
    fontWeight: '700',
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 14,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  chatButtonText: {
    color: '#f3ebff',
    fontSize: 16,
    fontWeight: '600',
  },
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    gap: 12,
  },
  hero: {
    marginHorizontal: -16,
    marginTop: -28,
    marginBottom: 8,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 28,
    paddingTop: 22,
    paddingBottom: 20,
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ece5f7',
  },
  avatar: {
    width: 98,
    height: 98,
    borderRadius: 49,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a35d5',
    marginBottom: 8,
    shadowColor: '#54258f',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatarText: {
    color: '#fff',
    fontSize: 45,
    fontWeight: '700',
  },
  name: {
    color: '#1f1a29',
    fontSize: 23,
    fontWeight: '700',
  },
  patientId: {
    color: '#5f596e',
    fontSize: 18,
    marginTop: 2,
  },
  editButton: {
    marginTop: 12,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#e7dcf5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editButtonText: {
    color: '#6f31c3',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionCard: {
    borderRadius: 18,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#29173e',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  sectionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#f1ebfb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTextWrap: {
    flex: 1,
  },
  sectionTitle: {
    color: '#1f1a29',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionDetail: {
    color: '#666073',
    fontSize: 14,
    marginTop: 2,
  },
});
