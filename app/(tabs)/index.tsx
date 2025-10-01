import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';

import { Eye, EyeOff } from 'lucide-react-native';
import Fretboard from '@/components/Fretboard';

import colors from '@/constants/colors';

export default function FretboardScreen() {
  const [showAllNotes, setShowAllNotes] = useState<boolean>(true);
  const [hideNotes, setHideNotes] = useState<boolean>(false);

  return (
    <View style={styles.background}>
      <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Diapasón Interactivo</Text>
            <Text style={styles.subtitle}>
              Explora todas las notas del diapasón de la guitarra
            </Text>
          </View>

          <View style={styles.controls}>
            <View style={styles.controlRow}>
              <View style={styles.controlLabel}>
                <Eye size={20} color={colors.dark.textSecondary} />
                <Text style={styles.controlText}>Mostrar todas las notas</Text>
              </View>
              <Switch
                value={showAllNotes}
                onValueChange={setShowAllNotes}
                trackColor={{ 
                  false: colors.dark.backgroundTertiary, 
                  true: colors.dark.primary 
                }}
                thumbColor={colors.dark.text}
              />
            </View>

            <View style={styles.controlRow}>
              <View style={styles.controlLabel}>
                <EyeOff size={20} color={colors.dark.textSecondary} />
                <Text style={styles.controlText}>Modo práctica (ocultar notas)</Text>
              </View>
              <Switch
                value={hideNotes}
                onValueChange={setHideNotes}
                trackColor={{ 
                  false: colors.dark.backgroundTertiary, 
                  true: colors.dark.primary 
                }}
                thumbColor={colors.dark.text}
              />
            </View>
          </View>

          <View style={styles.fretboardContainer}>
            <Fretboard 
              showAllNotes={showAllNotes}
              hideNotes={hideNotes}
            />
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>💡 Consejos</Text>
            <Text style={styles.infoText}>
              • Activa &quot;Mostrar todas las notas&quot; para ver el diapasón completo{'\n'}
              • Usa el &quot;Modo práctica&quot; para entrenar tu memoria{'\n'}
              • Ve a la pestaña &quot;Escalas&quot; para resaltar patrones específicos{'\n'}
              • Practica identificando las notas en diferentes posiciones
            </Text>
          </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.dark.background,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 20,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.dark.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.dark.textSecondary,
  },
  controls: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  controlText: {
    fontSize: 16,
    color: colors.dark.text,
  },
  fretboardContainer: {
    marginVertical: 8,
  },
  infoCard: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.dark.primary,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: colors.dark.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 22,
  },
});
