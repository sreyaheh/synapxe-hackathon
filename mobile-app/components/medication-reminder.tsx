import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type Reminder = {
  id: number;
  name: string;
  dosage: string;
  time: string;
};

const scheduled: Reminder[] = [
  { id: 1, name: 'Metformin', dosage: '500mg', time: '8:00 AM' },
  { id: 2, name: 'Lisinopril', dosage: '10mg', time: '8:00 AM' },
  { id: 3, name: 'Vitamin D', dosage: '1000 IU', time: '12:00 PM' },
  { id: 4, name: 'Aspirin', dosage: '81mg', time: '8:00 PM' },
];

export function MedicationReminderOverlay() {
  const [active, setActive] = useState<Reminder | null>(null);
  const [answered, setAnswered] = useState<'yes' | 'no' | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(scheduled[0]);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const onAnswer = (value: 'yes' | 'no') => {
    setAnswered(value);
    setTimeout(() => {
      setActive(null);
      setAnswered(null);
    }, 1200);
  };

  if (!active) return null;

  return (
    <Modal transparent visible animationType="fade">
      <View style={styles.overlay}>
        <ThemedView style={styles.card}>
          <ThemedText type="title">Medication Reminder</ThemedText>
          <ThemedText>
            It&apos;s time to take {active.name} ({active.dosage}) at {active.time}.
          </ThemedText>
          {answered ? (
            <ThemedText type="defaultSemiBold">
              {answered === 'yes' ? 'Great job staying on track.' : 'No problem, we will remind you again later.'}
            </ThemedText>
          ) : (
            <View style={styles.buttonRow}>
              <Pressable style={[styles.button, styles.buttonYes]} onPress={() => onAnswer('yes')}>
                <ThemedText style={styles.buttonText}>Yes</ThemedText>
              </Pressable>
              <Pressable style={[styles.button, styles.buttonNo]} onPress={() => onAnswer('no')}>
                <ThemedText style={styles.buttonText}>No</ThemedText>
              </Pressable>
            </View>
          )}
        </ThemedView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.35)',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonYes: {
    backgroundColor: '#0a7ea4',
  },
  buttonNo: {
    backgroundColor: '#767676',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
