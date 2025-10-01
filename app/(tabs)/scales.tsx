import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Check } from 'lucide-react-native';
import Fretboard from '@/components/Fretboard';
import Metronome from '@/components/Metronome';
import { SCALES, NOTES, getScaleNotes, Note, Scale } from '@/constants/guitarTheory';
import { useProgress } from '@/contexts/ProgressContext';
import colors from '@/constants/colors';

export default function ScalesScreen() {
  const [selectedRoot, setSelectedRoot] = useState<Note>('C');
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0]);
  const [showMetronome, setShowMetronome] = useState<boolean>(false);
  const { progress, completeScale } = useProgress();

  const scaleNotes = getScaleNotes(selectedRoot, selectedScale);
  const isCompleted = progress.completedScales.includes(selectedScale.id);

  const handleCompleteScale = () => {
    completeScale(selectedScale.id);
  };

  const scalesByCategory = SCALES.reduce((acc, scale) => {
    if (!acc[scale.category]) {
      acc[scale.category] = [];
    }
    acc[scale.category].push(scale);
    return acc;
  }, {} as Record<string, Scale[]>);

  const categoryNames = {
    major: 'Escalas Mayores',
    minor: 'Escalas Menores',
    pentatonic: 'Pentatónicas',
    modes: 'Modos',
    other: 'Otras',
  };

  return (
    <View style={styles.background}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Biblioteca de Escalas</Text>
          <Text style={styles.subtitle}>
            Selecciona una tonalidad y escala para visualizar
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tonalidad</Text>
          <View style={styles.noteGrid}>
            {NOTES.map((note) => (
              <TouchableOpacity
                key={note}
                style={[
                  styles.noteButton,
                  selectedRoot === note && styles.noteButtonActive,
                ]}
                onPress={() => setSelectedRoot(note)}
              >
                <Text
                  style={[
                    styles.noteButtonText,
                    selectedRoot === note && styles.noteButtonTextActive,
                  ]}
                >
                  {note}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {Object.entries(scalesByCategory).map(([category, scales]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {categoryNames[category as keyof typeof categoryNames]}
            </Text>
            <View style={styles.scaleList}>
              {scales.map((scale) => {
                const completed = progress.completedScales.includes(scale.id);
                return (
                  <TouchableOpacity
                    key={scale.id}
                    style={[
                      styles.scaleCard,
                      selectedScale.id === scale.id && styles.scaleCardActive,
                    ]}
                    onPress={() => setSelectedScale(scale)}
                  >
                    <View style={styles.scaleCardHeader}>
                      <Text
                        style={[
                          styles.scaleCardTitle,
                          selectedScale.id === scale.id && styles.scaleCardTitleActive,
                        ]}
                      >
                        {scale.name}
                      </Text>
                      {completed && (
                        <View style={styles.completedBadge}>
                          <Check size={16} color={colors.dark.text} />
                        </View>
                      )}
                    </View>
                    <Text style={styles.scaleCardDescription}>
                      {scale.description}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.selectedScaleInfo}>
          <View style={styles.selectedScaleHeader}>
            <Text style={styles.selectedScaleTitle}>
              {selectedRoot} {selectedScale.name}
            </Text>
            {!isCompleted && (
              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleCompleteScale}
              >
                <Check size={20} color={colors.dark.text} />
                <Text style={styles.completeButtonText}>Marcar como completada</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.selectedScaleNotes}>
            Notas: {scaleNotes.join(' - ')}
          </Text>
        </View>

        <View style={styles.fretboardContainer}>
          <Fretboard highlightedNotes={scaleNotes} />
        </View>

        <TouchableOpacity
          style={styles.metronomeToggle}
          onPress={() => setShowMetronome(!showMetronome)}
        >
          <Text style={styles.metronomeToggleText}>
            {showMetronome ? 'Ocultar Metrónomo' : 'Mostrar Metrónomo'}
          </Text>
        </TouchableOpacity>

        {showMetronome && (
          <View style={styles.metronomeContainer}>
            <Metronome />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.dark.background,
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
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  noteGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  noteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: colors.dark.backgroundSecondary,
    borderWidth: 2,
    borderColor: colors.dark.cardBorder,
    minWidth: 50,
    alignItems: 'center',
  },
  noteButtonActive: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
  noteButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.textSecondary,
  },
  noteButtonTextActive: {
    color: colors.dark.text,
  },
  scaleList: {
    gap: 8,
  },
  scaleCard: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.dark.cardBorder,
  },
  scaleCardActive: {
    borderColor: colors.dark.primary,
    backgroundColor: colors.dark.backgroundTertiary,
  },
  scaleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  scaleCardTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  scaleCardTitleActive: {
    color: colors.dark.primary,
  },
  scaleCardDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.dark.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedScaleInfo: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.dark.primary,
    gap: 8,
  },
  selectedScaleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedScaleTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: colors.dark.primary,
  },
  selectedScaleNotes: {
    fontSize: 16,
    color: colors.dark.text,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.dark.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  fretboardContainer: {
    marginVertical: 8,
  },
  metronomeToggle: {
    backgroundColor: colors.dark.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metronomeToggleText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  metronomeContainer: {
    marginBottom: 20,
  },
});
