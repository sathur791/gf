export interface LyricLine {
  start: number;
  end: number;
  text: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist?: string;
  source: string;
  lyrics: LyricLine[];
}

export const mainTeraLyrics: LyricLine[] = [
  { start: 1.1, end: 8.4, text: 'Main tera, main tera, main tera, main tera' },
  { start: 8.4, end: 16.5, text: 'Main gehra tamas tu sunehra savera' },
  { start: 16.5, end: 24.6, text: 'Main tera, ho main tera' },
  { start: 24.6, end: 32.7, text: 'Musafir main bhatka tu mera basera' },
  { start: 32.7, end: 40.8, text: 'Main tera, ho main tera' },
  { start: 40.8, end: 48.9, text: 'Tu jugnu chamakta main jungle ghanera' },
  { start: 48.9, end: 57.1, text: 'Main tera, ho main tera' },
  { start: 57.1, end: 68.8, text: 'O... Main tera, main tera, main tera, main tera...' },
];

export const mainTeraSong: SongItem = {
  id: 'main-tera',
  title: 'Main Tera (1 Min Mix)',
  source: '/music/MainTera.mp3',
  lyrics: mainTeraLyrics,
};
