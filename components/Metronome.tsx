import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { Play, Pause, Plus, Minus } from 'lucide-react-native';
import colors from '@/constants/colors';

interface MetronomeProps {
  initialBpm?: number;
  onBpmChange?: (bpm: number) => void;
}

export default function Metronome({ initialBpm = 120, onBpmChange }: MetronomeProps) {
  const [bpm, setBpm] = useState<number>(initialBpm);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const loadSound = async () => {
    if (Platform.OS === 'web') {
      return;
    }
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
      });
    } catch (error) {
      console.log('Error loading metronome sound:', error);
    }
  };

  const playClick = async () => {
    if (Platform.OS === 'web') {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = currentBeat === 0 ? 1000 : 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } else {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=' },
          { shouldPlay: true, volume: 0.5 }
        );
        setTimeout(() => {
          sound.unloadAsync();
        }, 100);
      } catch (error) {
        console.log('Error playing click:', error);
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPlaying(false);
      setCurrentBeat(0);
    } else {
      setIsPlaying(true);
      playClick();
      const interval = 60000 / bpm;
      intervalRef.current = setInterval(() => {
        setCurrentBeat(prev => {
          const next = (prev + 1) % 4;
          playClick();
          return next;
        });
      }, interval);
    }
  };

  useEffect(() => {
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      const interval = 60000 / bpm;
      intervalRef.current = setInterval(() => {
        setCurrentBeat(prev => {
          const next = (prev + 1) % 4;
          playClick();
          return next;
        });
      }, interval);
    }
  }, [bpm, isPlaying]);

  const changeBpm = (delta: number) => {
    const newBpm = Math.max(40, Math.min(240, bpm + delta));
    setBpm(newBpm);
    onBpmChange?.(newBpm);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bpmDisplay}>
        <TouchableOpacity 
          style={styles.bpmButton}
          onPress={() => changeBpm(-5)}
        >
          <Minus size={24} color={colors.dark.text} />
        </TouchableOpacity>
        
        <View style={styles.bpmValue}>
          <Text style={styles.bpmNumber}>{bpm}</Text>
          <Text style={styles.bpmLabel}>BPM</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.bpmButton}
          onPress={() => changeBpm(5)}
        >
          <Plus size={24} color={colors.dark.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.beatIndicator}>
        {[0, 1, 2, 3].map((beat) => (
          <View
            key={beat}
            style={[
              styles.beatDot,
              currentBeat === beat && isPlaying && styles.beatDotActive,
              beat === 0 && styles.beatDotFirst,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity 
        style={[styles.playButton, isPlaying && styles.playButtonActive]}
        onPress={togglePlay}
      >
        {isPlaying ? (
          <Pause size={32} color={colors.dark.text} fill={colors.dark.text} />
        ) : (
          <Play size={32} color={colors.dark.text} fill={colors.dark.text} />
        )}
      </TouchableOpacity>

      <View style={styles.presets}>
        {[60, 80, 100, 120, 140, 160].map((preset) => (
          <TouchableOpacity
            key={preset}
            style={[styles.presetButton, bpm === preset && styles.presetButtonActive]}
            onPress={() => {
              setBpm(preset);
              onBpmChange?.(preset);
            }}
          >
            <Text style={[styles.presetText, bpm === preset && styles.presetTextActive]}>
              {preset}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 20,
  },
  bpmDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  bpmButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.dark.backgroundTertiary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.dark.cardBorder,
  },
  bpmValue: {
    alignItems: 'center',
    minWidth: 100,
  },
  bpmNumber: {
    fontSize: 48,
    fontWeight: 'bold' as const,
    color: colors.dark.primary,
  },
  bpmLabel: {
    fontSize: 14,
    color: colors.dark.textSecondary,
    marginTop: -8,
  },
  beatIndicator: {
    flexDirection: 'row',
    gap: 12,
  },
  beatDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.dark.backgroundTertiary,
    borderWidth: 2,
    borderColor: colors.dark.cardBorder,
  },
  beatDotFirst: {
    borderColor: colors.dark.primary,
  },
  beatDotActive: {
    backgroundColor: colors.dark.primary,
    shadowColor: colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.dark.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  playButtonActive: {
    backgroundColor: colors.dark.error,
    shadowColor: colors.dark.error,
  },
  presets: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  presetButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.dark.backgroundTertiary,
    borderWidth: 1,
    borderColor: colors.dark.cardBorder,
  },
  presetButtonActive: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primary,
  },
  presetText: {
    color: colors.dark.textSecondary,
    fontSize: 14,
    fontWeight: '600' as const,
  },
  presetTextActive: {
    color: colors.dark.text,
  },
});
