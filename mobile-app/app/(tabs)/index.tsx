import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ChatbotDialog } from '@/components/chatbot-dialog';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <ScrollView style={styles.screen} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { paddingTop: insets.top + 14 }]}>
          <View style={styles.topBar}>
            <Text style={styles.pageTitle}>Home</Text>
            <Pressable style={styles.chatHeaderButton} onPress={() => setChatOpen(true)}>
              <MaterialIcons name="chat-bubble-outline" size={18} color="#efe6ff" />
              <Text style={styles.chatHeaderButtonText}>Chat</Text>
            </Pressable>
          </View>

          <View style={styles.greeting}>
            <Text style={styles.greetingSmall}>Good Morning,</Text>
            <Text style={styles.greetingName}>
              Sarah <Text style={styles.wave}>👋</Text>
            </Text>
            <Text style={styles.greetingSub}>Here are your upcoming appointments</Text>
          </View>
        </View>

        <View style={styles.appointmentCard}>
          <View style={styles.doctorRow}>
            <View style={styles.doctorIconWrap}>
              <MaterialIcons name="medical-services" size={21} color="#7a35d5" />
            </View>
            <View style={styles.doctorTextWrap}>
              <Text style={styles.doctorName}>Dr. Emily Chen</Text>
              <Text style={styles.doctorRole}>General Practitioner</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <MaterialIcons name="calendar-month" size={18} color="#7a35d5" />
            <Text style={styles.detailText}>March 9, 2026 - 10:30 AM</Text>
          </View>
          <View style={styles.detailRow}>
            <MaterialIcons name="location-on" size={18} color="#7a35d5" />
            <Text style={styles.detailText}>City Health Clinic, Room 204</Text>
          </View>

          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>View Details</Text>
          </Pressable>
        </View>

        <View style={styles.reminderCard}>
          <View style={styles.reminderLeft}>
            <View style={styles.reminderIconWrap}>
              <MaterialIcons name="schedule" size={24} color="#7a35d5" />
            </View>
            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>2 days left</Text>
              <Text style={styles.reminderText}>Until your next appointment</Text>
            </View>
          </View>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Add to Calendar</Text>
          </Pressable>
        </View>

        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickGrid}>
          <Pressable style={styles.quickItem} onPress={() => setChatOpen(true)}>
            <View style={styles.quickIconWrap}>
              <MaterialIcons name="chat-bubble-outline" size={22} color="#7a35d5" />
            </View>
            <Text style={styles.quickItemText}>Ask Chatbot</Text>
          </Pressable>
          <Pressable style={styles.quickItem} onPress={() => router.push('/(tabs)/medication')}>
            <View style={styles.quickIconWrap}>
              <MaterialIcons name="medication" size={22} color="#7a35d5" />
            </View>
            <Text style={styles.quickItemText}>Medications</Text>
          </Pressable>
          <Pressable style={styles.quickItem} onPress={() => router.push('/(tabs)/visits')}>
            <View style={styles.quickIconWrap}>
              <MaterialIcons name="description" size={22} color="#7a35d5" />
            </View>
            <Text style={styles.quickItemText}>Summaries</Text>
          </Pressable>
        </View>
      </ScrollView>

      <ChatbotDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f2f8',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  hero: {
    paddingHorizontal: 24,
    paddingBottom: 88,
    backgroundColor: '#7a35d5',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pageTitle: {
    color: '#f3ebff',
    fontSize: 34,
    fontWeight: '700',
  },
  chatHeaderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chatHeaderButtonText: {
    color: '#f3ebff',
    fontWeight: '600',
    fontSize: 16,
  },
  greeting: {
    marginTop: 24,
    gap: 4,
  },
  greetingSmall: {
    color: '#e9ddff',
    fontSize: 32,
    fontWeight: '500',
  },
  greetingName: {
    color: '#ffffff',
    fontSize: 50,
    fontWeight: '700',
    lineHeight: 56,
  },
  wave: {
    fontSize: 42,
  },
  greetingSub: {
    color: '#e3d2ff',
    fontSize: 31,
    fontWeight: '400',
    marginTop: 2,
  },
  appointmentCard: {
    marginHorizontal: 24,
    marginTop: -56,
    backgroundColor: '#ffffff',
    borderRadius: 22,
    padding: 22,
    shadowColor: '#29173e',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  doctorIconWrap: {
    height: 42,
    width: 42,
    borderRadius: 12,
    backgroundColor: '#f1ebfb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorTextWrap: {
    flex: 1,
  },
  doctorName: {
    color: '#1f1a29',
    fontSize: 17,
    fontWeight: '700',
  },
  doctorRole: {
    color: '#736a84',
    marginTop: 2,
    fontSize: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailText: {
    color: '#4c4658',
    fontSize: 15,
    flex: 1,
  },
  primaryButton: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#7a35d5',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  reminderCard: {
    marginHorizontal: 24,
    marginTop: 14,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    shadowColor: '#29173e',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  reminderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    marginRight: 10,
  },
  reminderContent: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
  },
  reminderIconWrap: {
    height: 46,
    width: 46,
    borderRadius: 14,
    backgroundColor: '#f1ebfb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reminderTitle: {
    color: '#1f1a29',
    fontSize: 17,
    fontWeight: '700',
  },
  reminderText: {
    color: '#776d8b',
    fontSize: 13,
    lineHeight: 16,
    flexShrink: 1,
  },
  secondaryButton: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f2edf9',
    flexShrink: 0,
    marginLeft: 6,
  },
  secondaryButtonText: {
    color: '#6f31c3',
    fontWeight: '700',
    fontSize: 13,
  },
  quickActionsTitle: {
    marginTop: 18,
    marginHorizontal: 24,
    color: '#201a2c',
    fontSize: 22,
    fontWeight: '700',
  },
  quickGrid: {
    marginTop: 10,
    marginHorizontal: 24,
    flexDirection: 'row',
    gap: 12,
  },
  quickItem: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 18,
    backgroundColor: '#ffffff',
    shadowColor: '#29173e',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  quickIconWrap: {
    height: 52,
    width: 52,
    borderRadius: 16,
    backgroundColor: '#f2edf9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickItemText: {
    color: '#1f1a29',
    fontSize: 15,
    fontWeight: '500',
  },
});
