export const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const;
export type Note = typeof NOTES[number];

export const STANDARD_TUNING: Note[] = ['E', 'A', 'D', 'G', 'B', 'E'];

export const NUM_FRETS = 22;

export function getNoteAtFret(stringNote: Note, fret: number): Note {
  const startIndex = NOTES.indexOf(stringNote);
  const noteIndex = (startIndex + fret) % NOTES.length;
  return NOTES[noteIndex];
}

export interface Scale {
  id: string;
  name: string;
  intervals: number[];
  description: string;
  category: 'major' | 'minor' | 'pentatonic' | 'modes' | 'other';
}

export const SCALES: Scale[] = [
  {
    id: 'major',
    name: 'Mayor',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    description: 'Escala mayor - sonido alegre y brillante',
    category: 'major',
  },
  {
    id: 'minor',
    name: 'Menor Natural',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    description: 'Escala menor natural - sonido melancólico',
    category: 'minor',
  },
  {
    id: 'minor-harmonic',
    name: 'Menor Armónica',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    description: 'Escala menor armónica - sonido exótico',
    category: 'minor',
  },
  {
    id: 'minor-melodic',
    name: 'Menor Melódica',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    description: 'Escala menor melódica - versátil para jazz',
    category: 'minor',
  },
  {
    id: 'pentatonic-major',
    name: 'Pentatónica Mayor',
    intervals: [0, 2, 4, 7, 9],
    description: 'Pentatónica mayor - ideal para rock y blues',
    category: 'pentatonic',
  },
  {
    id: 'pentatonic-minor',
    name: 'Pentatónica Menor',
    intervals: [0, 3, 5, 7, 10],
    description: 'Pentatónica menor - la más usada en rock',
    category: 'pentatonic',
  },
  {
    id: 'blues',
    name: 'Blues',
    intervals: [0, 3, 5, 6, 7, 10],
    description: 'Escala de blues - con blue note característica',
    category: 'pentatonic',
  },
  {
    id: 'dorian',
    name: 'Dórico',
    intervals: [0, 2, 3, 5, 7, 9, 10],
    description: 'Modo dórico - sonido jazzy y funky',
    category: 'modes',
  },
  {
    id: 'phrygian',
    name: 'Frigio',
    intervals: [0, 1, 3, 5, 7, 8, 10],
    description: 'Modo frigio - sonido español y flamenco',
    category: 'modes',
  },
  {
    id: 'lydian',
    name: 'Lidio',
    intervals: [0, 2, 4, 6, 7, 9, 11],
    description: 'Modo lidio - sonido soñador y etéreo',
    category: 'modes',
  },
  {
    id: 'mixolydian',
    name: 'Mixolidio',
    intervals: [0, 2, 4, 5, 7, 9, 10],
    description: 'Modo mixolidio - perfecto para rock y blues',
    category: 'modes',
  },
  {
    id: 'locrian',
    name: 'Locrio',
    intervals: [0, 1, 3, 5, 6, 8, 10],
    description: 'Modo locrio - sonido tenso y dissonante',
    category: 'modes',
  },
];

export function getScaleNotes(rootNote: Note, scale: Scale): Note[] {
  const rootIndex = NOTES.indexOf(rootNote);
  return scale.intervals.map(interval => {
    const noteIndex = (rootIndex + interval) % NOTES.length;
    return NOTES[noteIndex];
  });
}

export function isNoteInScale(note: Note, scaleNotes: Note[]): boolean {
  return scaleNotes.includes(note);
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'articulation' | 'picking' | 'tapping' | 'other';
  instructions: string[];
  tips: string[];
}

export const TECHNIQUES: Technique[] = [
  {
    id: 'bending',
    name: 'Bending',
    description: 'Técnica para elevar el tono de una nota empujando la cuerda hacia arriba o abajo',
    difficulty: 'intermediate',
    category: 'articulation',
    instructions: [
      'Coloca el dedo en el traste deseado',
      'Empuja la cuerda hacia arriba (cuerdas agudas) o abajo (cuerdas graves)',
      'Mantén la presión constante para sostener el bend',
      'Practica bends de 1/2 tono, 1 tono y 1 tono y medio',
    ],
    tips: [
      'Usa varios dedos para más fuerza',
      'Escucha el tono objetivo antes de hacer el bend',
      'Practica con un afinador para precisión',
    ],
  },
  {
    id: 'slide',
    name: 'Slide',
    description: 'Deslizar el dedo de un traste a otro manteniendo la presión',
    difficulty: 'beginner',
    category: 'articulation',
    instructions: [
      'Toca la nota inicial con presión firme',
      'Desliza el dedo hacia el traste objetivo sin levantar',
      'Mantén la presión constante durante el deslizamiento',
      'Puedes hacer slides ascendentes o descendentes',
    ],
    tips: [
      'No presiones demasiado fuerte',
      'Mantén el ritmo constante',
      'Practica slides de diferentes distancias',
    ],
  },
  {
    id: 'hammer-on',
    name: 'Hammer-on',
    description: 'Tocar una nota más aguda sin usar la púa, solo con la fuerza del dedo',
    difficulty: 'beginner',
    category: 'articulation',
    instructions: [
      'Toca la nota inicial con la púa',
      'Golpea firmemente el traste superior con otro dedo',
      'No uses la púa para la segunda nota',
      'El golpe debe ser rápido y preciso',
    ],
    tips: [
      'Usa la fuerza de la muñeca, no solo el dedo',
      'Practica lentamente primero',
      'Combina con pull-offs para legato',
    ],
  },
  {
    id: 'pull-off',
    name: 'Pull-off',
    description: 'Tocar una nota más grave "tirando" del dedo hacia abajo',
    difficulty: 'beginner',
    category: 'articulation',
    instructions: [
      'Coloca dos dedos en dos trastes diferentes',
      'Toca la nota más aguda con la púa',
      'Tira del dedo superior hacia abajo para sonar la nota inferior',
      'El movimiento debe ser rápido y hacia abajo',
    ],
    tips: [
      'No levantes el dedo directamente hacia arriba',
      'Mantén el dedo inferior presionado',
      'Practica la fuerza del pull-off',
    ],
  },
  {
    id: 'legato',
    name: 'Legato',
    description: 'Combinación fluida de hammer-ons y pull-offs para tocar sin púa',
    difficulty: 'intermediate',
    category: 'articulation',
    instructions: [
      'Combina hammer-ons y pull-offs en secuencia',
      'Usa solo una pulsación de púa por cuerda',
      'Mantén el flujo constante entre notas',
      'Practica patrones ascendentes y descendentes',
    ],
    tips: [
      'Desarrolla fuerza en todos los dedos',
      'Practica con metrónomo',
      'Empieza lento y aumenta velocidad gradualmente',
    ],
  },
  {
    id: 'tapping',
    name: 'Tapping',
    description: 'Técnica de golpear el diapasón con los dedos de la mano derecha',
    difficulty: 'advanced',
    category: 'tapping',
    instructions: [
      'Usa el dedo índice de la mano derecha para golpear el traste',
      'Combina con hammer-ons y pull-offs de la mano izquierda',
      'Mantén el ritmo constante entre ambas manos',
      'Practica patrones de 3 notas (tap-hammer-pull)',
    ],
    tips: [
      'Silencia las cuerdas que no usas',
      'Golpea con la yema del dedo, no la uña',
      'Practica cada mano por separado primero',
    ],
  },
  {
    id: 'vibrato',
    name: 'Vibrato',
    description: 'Oscilación rápida del tono para añadir expresión a las notas',
    difficulty: 'intermediate',
    category: 'articulation',
    instructions: [
      'Toca y sostén una nota',
      'Mueve el dedo hacia arriba y abajo rápidamente',
      'Mantén el movimiento controlado y rítmico',
      'Varía la velocidad y amplitud según el estilo',
    ],
    tips: [
      'Usa el movimiento de la muñeca, no solo el dedo',
      'Practica vibrato lento y rápido',
      'Escucha a guitarristas como B.B. King y Clapton',
    ],
  },
  {
    id: 'alternate-picking',
    name: 'Alternate Picking',
    description: 'Técnica de alternar púa hacia abajo y hacia arriba',
    difficulty: 'intermediate',
    category: 'picking',
    instructions: [
      'Alterna consistentemente: abajo-arriba-abajo-arriba',
      'Mantén el movimiento pequeño y controlado',
      'Usa principalmente el movimiento de muñeca',
      'Practica con metrónomo aumentando velocidad',
    ],
    tips: [
      'Empieza muy lento (60 BPM)',
      'Mantén la púa en ángulo ligero',
      'Practica escalas con alternate picking',
      'No tenses la mano',
    ],
  },
];
