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
  { start: 0.0, end: 8.5, text: 'Main tera, main tera, main tera, main tera' },
  { start: 8.5, end: 13.6, text: 'Main gehra tamas tu sunehra savera' },
  { start: 13.6, end: 17.4, text: 'Main tera, ho main tera' },
  { start: 17.4, end: 21.8, text: 'Musafir main bhatka tu mera basera' },
  { start: 21.8, end: 25.0, text: 'Main tera, ho main tera' },
  { start: 25.0, end: 29.7, text: 'Tu jugnu chamakta main jungle ghanera' },
  { start: 29.7, end: 33.0, text: 'Main tera, ho main tera' },
  { start: 33.0, end: 43.0, text: 'O... Main tera, main tera, main tera, main tera...' },
  { start: 43.0, end: 69.0, text: '♪  •  •  •  ♪' },
];

export const mainTeraSong: SongItem = {
  id: 'main-tera',
  title: 'Main Tera (1 Min Mix)',
  source: '/music/MainTera.mp3',
  lyrics: mainTeraLyrics,
};
