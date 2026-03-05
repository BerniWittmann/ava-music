'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

const SPOTIFY_GENRES = [
  'afrobeat',
  'ambient',
  'blues',
  'chill',
  'classical',
  'country',
  'dance',
  'disco',
  'drum-and-bass',
  'dubstep',
  'edm',
  'electro',
  'folk',
  'funk',
  'garage',
  'gospel',
  'grime',
  'grunge',
  'hard-rock',
  'hip-hop',
  'house',
  'indie',
  'jazz',
  'k-pop',
  'latin',
  'lo-fi',
  'metal',
  'phonk',
  'pop',
  'punk',
  'r-n-b',
  'rap',
  'reggae',
  'rock',
  'salsa',
  'singer-songwriter',
  'soul',
  'techno',
  'trance',
  'trip-hop',
];

function pickRandomGenre() {
  const index = Math.floor(Math.random() * SPOTIFY_GENRES.length);
  return SPOTIFY_GENRES[index];
}

function formatGenre(genre: string) {
  return genre.replaceAll('-', ' ').toUpperCase();
}

export function GenrePicker() {
  const [lastGenre, setLastGenre] = useState<string | null>(null);

  const buttonText = useMemo(() => {
    if (!lastGenre) {
      return 'Pick random Spotify genre';
    }

    return `Try another genre (last: ${formatGenre(lastGenre)})`;
  }, [lastGenre]);

  const onPick = () => {
    const genre = pickRandomGenre();
    setLastGenre(genre);

    const spotifyUrl = `https://open.spotify.com/genre/${encodeURIComponent(genre)}`;
    window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full max-w-xl rounded-3xl border border-[var(--ava-ice)]/40 bg-[color:rgb(8_15_26_/_80%)] p-7 shadow-[0_20px_80px_rgba(7,13,21,0.7)] backdrop-blur-md sm:p-8">
      <div className="mb-5 flex justify-center">
        <Image
          src="/ava-logo.png"
          alt="Ava Avalanches logo"
          width={280}
          height={185}
          className="h-auto w-[220px] sm:w-[280px]"
          priority
        />
      </div>

      <h1 className="text-center text-3xl font-black tracking-tight text-[var(--ava-snow)]">
        Avalanches Genre Picker
      </h1>
      <p className="mt-3 text-center text-[color:rgb(210_228_244_/_88%)]">
        Hit the button, get a random genre, and jump straight into Spotify.
      </p>

      <button
        onClick={onPick}
        className="mt-8 w-full rounded-xl border border-[var(--ava-ice)]/55 bg-gradient-to-r from-[var(--ava-ice)] to-[var(--ava-ice-bright)] px-5 py-4 text-lg font-bold uppercase tracking-wide text-[var(--ava-night)] transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ava-ice-bright)]"
        type="button"
      >
        {buttonText}
      </button>

      {lastGenre ? (
        <p className="mt-4 text-center text-sm font-semibold tracking-wide text-[var(--ava-ice-bright)]">
          Last pick: {formatGenre(lastGenre)}
        </p>
      ) : null}
    </div>
  );
}
