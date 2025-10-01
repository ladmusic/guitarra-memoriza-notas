import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { STANDARD_TUNING, getNoteAtFret, NUM_FRETS, Note } from '@/constants/guitarTheory';
import colors from '@/constants/colors';

interface FretboardProps {
  highlightedNotes?: Note[];
  showAllNotes?: boolean;
  hideNotes?: boolean;
  onNotePress?: (note: Note, string: number, fret: number) => void;
}

const FRET_WIDTH = 70;
const STRING_HEIGHT = 45;
const FRETBOARD_INLAYS = [3, 5, 7, 9, 12, 15, 17, 19, 21];
const DOUBLE_INLAYS = [12];

export default function Fretboard({ 
  highlightedNotes = [], 
  showAllNotes = false,
  hideNotes = false,
  onNotePress 
}: FretboardProps) {

  
  const renderFretMarkers = () => {
    return (
      <View style={styles.fretMarkersContainer}>
        {Array.from({ length: NUM_FRETS + 1 }).map((_, fret) => {
          const isInlay = FRETBOARD_INLAYS.includes(fret);
          const isDouble = DOUBLE_INLAYS.includes(fret);
          
          return (
            <View key={fret} style={[styles.fretMarker, { width: FRET_WIDTH }]}>
              {fret === 0 ? (
                <Text style={styles.fretNumber}>Open</Text>
              ) : (
                <>
                  {isInlay && (
                    <View style={styles.inlayContainer}>
                      {isDouble ? (
                        <>
                          <View style={styles.inlayDot} />
                          <View style={styles.inlayDot} />
                        </>
                      ) : (
                        <View style={styles.inlayDot} />
                      )}
                    </View>
                  )}
                  <Text style={styles.fretNumber}>{fret}</Text>
                </>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderString = (stringIndex: number) => {
    const stringNote = STANDARD_TUNING[stringIndex];
    
    return (
      <View key={stringIndex} style={styles.stringContainer}>
        <View style={styles.stringLabelContainer}>
          <Text style={styles.stringLabel}>{stringNote}</Text>
        </View>
        
        <View style={styles.stringLine}>
          <View style={[styles.string, { height: 6 - stringIndex * 0.5 }]} />
        </View>
        
        {Array.from({ length: NUM_FRETS + 1 }).map((_, fret) => {
          const note = getNoteAtFret(stringNote, fret);
          const isHighlighted = highlightedNotes.length > 0 && highlightedNotes.includes(note);
          const shouldShow = showAllNotes || isHighlighted;
          
          return (
            <View 
              key={fret} 
              style={[styles.fretSpace, { width: FRET_WIDTH }]}
            >
              {fret > 0 && <View style={styles.fretLine} />}
              
              {!hideNotes && shouldShow && (
                <View 
                  style={[
                    styles.noteCircle,
                    isHighlighted && styles.noteCircleHighlighted
                  ]}
                >
                  <Text style={[
                    styles.noteText,
                    isHighlighted && styles.noteTextHighlighted
                  ]}>
                    {note}
                  </Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.fretboard}>
          {renderFretMarkers()}
          
          <View style={styles.stringsContainer}>
            {STANDARD_TUNING.map((_, index) => renderString(index))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dark.backgroundSecondary,
    borderRadius: 12,
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  fretboard: {
    backgroundColor: colors.dark.fretboard.wood,
    paddingVertical: 8,
  },
  fretMarkersContainer: {
    flexDirection: 'row',
    paddingLeft: 60,
    marginBottom: 8,
  },
  fretMarker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  fretNumber: {
    color: colors.dark.textTertiary,
    fontSize: 12,
    fontWeight: '600' as const,
  },
  inlayContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  inlayDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.dark.fretboard.inlay,
    opacity: 0.3,
  },
  stringsContainer: {
    position: 'relative' as const,
  },
  stringContainer: {
    flexDirection: 'row',
    height: STRING_HEIGHT,
    alignItems: 'center',
    position: 'relative' as const,
  },
  stringLabelContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark.backgroundTertiary,
    height: '100%',
    borderRightWidth: 2,
    borderRightColor: colors.dark.cardBorder,
  },
  stringLabel: {
    color: colors.dark.text,
    fontSize: 16,
    fontWeight: 'bold' as const,
  },
  stringLine: {
    position: 'absolute' as const,
    left: 60,
    right: 0,
    height: '100%',
    justifyContent: 'center',
  },
  string: {
    backgroundColor: colors.dark.fretboard.string,
    width: '100%',
    opacity: 0.6,
  },
  fretSpace: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
  },
  fretLine: {
    position: 'absolute' as const,
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: colors.dark.fretboard.fret,
  },
  noteCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.dark.backgroundTertiary,
    borderWidth: 2,
    borderColor: colors.dark.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  noteCircleHighlighted: {
    backgroundColor: colors.dark.primary,
    borderColor: colors.dark.primaryLight,
    shadowColor: colors.dark.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
  },
  noteText: {
    color: colors.dark.textSecondary,
    fontSize: 12,
    fontWeight: 'bold' as const,
  },
  noteTextHighlighted: {
    color: colors.dark.text,
  },
});
