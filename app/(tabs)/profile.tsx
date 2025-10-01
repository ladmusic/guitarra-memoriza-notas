import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Award, Flame, Clock, Target, TrendingUp, Calendar } from 'lucide-react-native';
import { useProgress } from '@/contexts/ProgressContext';
import colors from '@/constants/colors';

export default function ProfileScreen() {
  const { progress, checkDailyChallenge, completeDailyChallenge } = useProgress();

  useEffect(() => {
    checkDailyChallenge();
  }, []);

  const xpPercentage = (progress.xp % 100) / 100;

  return (
    <View style={styles.background}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tu Progreso</Text>
          <Text style={styles.subtitle}>
            Sigue practicando y mejorando cada día
          </Text>
        </View>

        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelBadge}>
              <TrendingUp size={32} color={colors.dark.primary} />
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelLabel}>Nivel</Text>
              <Text style={styles.levelNumber}>{progress.level}</Text>
            </View>
          </View>
          <View style={styles.xpBar}>
            <View style={[styles.xpBarFill, { width: `${xpPercentage * 100}%` }]} />
          </View>
          <Text style={styles.xpText}>
            {progress.xp % 100} / 100 XP
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Flame size={24} color={colors.dark.primary} />
            <Text style={styles.statValue}>{progress.practiceStreak}</Text>
            <Text style={styles.statLabel}>Días seguidos</Text>
          </View>
          <View style={styles.statCard}>
            <Clock size={24} color={colors.dark.accent} />
            <Text style={styles.statValue}>
              {Math.floor(progress.totalPracticeTime / 60)}h
            </Text>
            <Text style={styles.statLabel}>Tiempo total</Text>
          </View>
          <View style={styles.statCard}>
            <Target size={24} color={colors.dark.success} />
            <Text style={styles.statValue}>{progress.completedScales.length}</Text>
            <Text style={styles.statLabel}>Escalas</Text>
          </View>
          <View style={styles.statCard}>
            <Award size={24} color={colors.dark.warning} />
            <Text style={styles.statValue}>{progress.achievements.length}</Text>
            <Text style={styles.statLabel}>Logros</Text>
          </View>
        </View>

        {progress.dailyChallenge && (
          <View style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <Calendar size={24} color={colors.dark.primary} />
              <Text style={styles.challengeTitle}>Reto Diario</Text>
            </View>
            <Text style={styles.challengeName}>{progress.dailyChallenge.title}</Text>
            <Text style={styles.challengeDescription}>
              {progress.dailyChallenge.description}
            </Text>
            {!progress.dailyChallenge.completed ? (
              <TouchableOpacity
                style={styles.challengeButton}
                onPress={completeDailyChallenge}
              >
                <Text style={styles.challengeButtonText}>Completar Reto (+100 XP)</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.challengeCompleted}>
                <Text style={styles.challengeCompletedText}>✓ Completado</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logros Desbloqueados</Text>
          {progress.achievements.length === 0 ? (
            <View style={styles.emptyState}>
              <Award size={48} color={colors.dark.textTertiary} />
              <Text style={styles.emptyStateText}>
                Aún no has desbloqueado ningún logro
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Sigue practicando para desbloquear logros
              </Text>
            </View>
          ) : (
            <View style={styles.achievementsList}>
              {progress.achievements.map((achievement) => (
                <View key={achievement.id} style={styles.achievementCard}>
                  <View style={styles.achievementIcon}>
                    <Text style={styles.achievementEmoji}>🏆</Text>
                  </View>
                  <View style={styles.achievementInfo}>
                    <Text style={styles.achievementTitle}>{achievement.title}</Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>
                    <Text style={styles.achievementDate}>
                      Desbloqueado: {new Date(achievement.unlockedAt).toLocaleDateString('es-ES')}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escalas Completadas</Text>
          {progress.completedScales.length === 0 ? (
            <View style={styles.emptyState}>
              <Target size={48} color={colors.dark.textTertiary} />
              <Text style={styles.emptyStateText}>
                Aún no has completado ninguna escala
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Ve a la pestaña Escalas para empezar
              </Text>
            </View>
          ) : (
            <View style={styles.completedList}>
              {progress.completedScales.map((scaleId) => (
                <View key={scaleId} style={styles.completedItem}>
                  <Text style={styles.completedItemText}>{scaleId}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Técnicas Completadas</Text>
          {progress.completedTechniques.length === 0 ? (
            <View style={styles.emptyState}>
              <Target size={48} color={colors.dark.textTertiary} />
              <Text style={styles.emptyStateText}>
                Aún no has completado ninguna técnica
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Ve a la pestaña Técnicas para empezar
              </Text>
            </View>
          ) : (
            <View style={styles.completedList}>
              {progress.completedTechniques.map((techniqueId) => (
                <View key={techniqueId} style={styles.completedItem}>
                  <Text style={styles.completedItemText}>{techniqueId}</Text>
                </View>
              ))}
            </View>
          )}
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
  levelCard: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  levelBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.dark.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelInfo: {
    gap: 4,
  },
  levelLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  levelNumber: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    color: colors.dark.primary,
  },
  xpBar: {
    height: 12,
    backgroundColor: colors.dark.backgroundTertiary,
    borderRadius: 6,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: colors.dark.primary,
  },
  xpText: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: colors.dark.text,
  },
  statLabel: {
    fontSize: 12,
    color: colors.dark.textSecondary,
    textAlign: 'center',
  },
  challengeCard: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.dark.primary,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  challengeName: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: colors.dark.primary,
  },
  challengeDescription: {
    fontSize: 15,
    color: colors.dark.textSecondary,
  },
  challengeButton: {
    backgroundColor: colors.dark.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  challengeButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  challengeCompleted: {
    backgroundColor: colors.dark.success,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  challengeCompletedText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  emptyState: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    gap: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.dark.textSecondary,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.dark.textTertiary,
    textAlign: 'center',
  },
  achievementsList: {
    gap: 12,
  },
  achievementCard: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 2,
    borderColor: colors.dark.cardBorder,
  },
  achievementIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.dark.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementEmoji: {
    fontSize: 28,
  },
  achievementInfo: {
    flex: 1,
    gap: 4,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.dark.text,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.dark.textSecondary,
  },
  achievementDate: {
    fontSize: 12,
    color: colors.dark.textTertiary,
    marginTop: 4,
  },
  completedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  completedItem: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.dark.success,
  },
  completedItemText: {
    fontSize: 14,
    color: colors.dark.text,
  },
});
