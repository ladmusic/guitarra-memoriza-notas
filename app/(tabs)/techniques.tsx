import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import Metronome from '@/components/Metronome';
import { TECHNIQUES, Technique } from '@/constants/guitarTheory';
import { useProgress } from '@/contexts/ProgressContext';
import colors from '@/constants/colors';

export default function TechniquesScreen() {
  const [expandedTechnique, setExpandedTechnique] = useState<string | null>(null);
  const [showMetronome, setShowMetronome] = useState<boolean>(false);
  const { progress, completeTechnique } = useProgress();

  const toggleTechnique = (id: string) => {
    setExpandedTechnique(expandedTechnique === id ? null : id);
  };

  const handleCompleteTechnique = (id: string) => {
    completeTechnique(id);
  };

  const techniquesByCategory = TECHNIQUES.reduce((acc, technique) => {
    if (!acc[technique.category]) {
      acc[technique.category] = [];
    }
    acc[technique.category].push(technique);
    return acc;
  }, {} as Record<string, Technique[]>);

  const categoryNames = {
    articulation: 'Articulación',
    picking: 'Técnicas de Púa',
    tapping: 'Tapping',
    other: 'Otras',
  };

  const difficultyColors = {
    beginner: colors.dark.success,
    intermediate: colors.dark.warning,
    advanced: colors.dark.error,
  };

  const difficultyLabels = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  };

  return (
    <View style={styles.background}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Técnicas de Guitarra</Text>
          <Text style={styles.subtitle}>
            Aprende y domina las técnicas esenciales
          </Text>
        </View>

        {Object.entries(techniquesByCategory).map(([category, techniques]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>
              {categoryNames[category as keyof typeof categoryNames]}
            </Text>
            <View style={styles.techniqueList}>
              {techniques.map((technique) => {
                const isExpanded = expandedTechnique === technique.id;
                const isCompleted = progress.completedTechniques.includes(technique.id);

                return (
                  <View key={technique.id} style={styles.techniqueCard}>
                    <TouchableOpacity
                      style={styles.techniqueHeader}
                      onPress={() => toggleTechnique(technique.id)}
                    >
                      <View style={styles.techniqueHeaderLeft}>
                        <Text style={styles.techniqueName}>{technique.name}</Text>
                        <View
                          style={[
                            styles.difficultyBadge,
                            { backgroundColor: difficultyColors[technique.difficulty] },
                          ]}
                        >
                          <Text style={styles.difficultyText}>
                            {difficultyLabels[technique.difficulty]}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.techniqueHeaderRight}>
                        {isCompleted && (
                          <View style={styles.completedBadge}>
                            <Check size={16} color={colors.dark.text} />
                          </View>
                        )}
                        {isExpanded ? (
                          <ChevronUp size={24} color={colors.dark.textSecondary} />
                        ) : (
                          <ChevronDown size={24} color={colors.dark.textSecondary} />
                        )}
                      </View>
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={styles.techniqueContent}>
                        <Text style={styles.techniqueDescription}>
                          {technique.description}
                        </Text>

                        <View style={styles.instructionsSection}>
                          <Text style={styles.instructionsTitle}>📋 Instrucciones</Text>
                          {technique.instructions.map((instruction, index) => (
                            <Text key={index} style={styles.instructionItem}>
                              {index + 1}. {instruction}
                            </Text>
                          ))}
                        </View>

                        <View style={styles.tipsSection}>
                          <Text style={styles.tipsTitle}>💡 Consejos</Text>
                          {technique.tips.map((tip, index) => (
                            <Text key={index} style={styles.tipItem}>
                              • {tip}
                            </Text>
                          ))}
                        </View>

                        {!isCompleted && (
                          <TouchableOpacity
                            style={styles.completeButton}
                            onPress={() => handleCompleteTechnique(technique.id)}
                          >
                            <Check size={20} color={colors.dark.text} />
                            <Text style={styles.completeButtonText}>
                              Marcar como completada
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ))}

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
  techniqueList: {
    gap: 12,
  },
  techniqueCard: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.dark.cardBorder,
  },
  techniqueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  techniqueHeaderLeft: {
    flex: 1,
    gap: 8,
  },
  techniqueHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  techniqueName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  completedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.dark.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  techniqueContent: {
    padding: 16,
    paddingTop: 0,
    gap: 16,
  },
  techniqueDescription: {
    fontSize: 15,
    color: colors.dark.textSecondary,
    lineHeight: 22,
  },
  instructionsSection: {
    gap: 8,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  instructionItem: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    paddingLeft: 8,
  },
  tipsSection: {
    gap: 8,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
    marginBottom: 4,
  },
  tipItem: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    lineHeight: 20,
    paddingLeft: 8,
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.dark.success,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
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
