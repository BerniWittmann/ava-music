'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type SpotifyGenre = {
  id: string;
  name: string;
  selectedByDefault: boolean;
};

const SPOTIFY_GENRES: SpotifyGenre[] = [
  { id: '0JQ5DAqbMKFNQ0fGp4byGU', name: 'Afro', selectedByDefault: false },
  { id: '0JQ5DAqbMKFFtlLYUHv8bT', name: 'Alternative', selectedByDefault: true },
  { id: '0JQ5DAqbMKFLjmiZRss79w', name: 'Ambient', selectedByDefault: false },
  { id: '0JQ5DAqbMKFziKOShCi009', name: 'Anime', selectedByDefault: false },
  { id: '0JQ5DAqbMKFQiK2EHwyjcU', name: 'Blues', selectedByDefault: false },
  { id: '0JQ5DAudkNjCgYMM0TZXDw', name: 'Charts', selectedByDefault: false },
  { id: '0JQ5DAqbMKFFzDl7qN9Apr', name: 'Chillout', selectedByDefault: false },
  { id: '0JQ5DAqbMKFKLfwjuJMoNC', name: 'Country', selectedByDefault: true },
  { id: '0JQ5DAqbMKFHOzuVTgTizF', name: 'Dance/Electronic', selectedByDefault: true },
  { id: '0JQ5DAqbMKFIxnofjQmnmn', name: 'Disney', selectedByDefault: false },
  { id: '0JQ5DAtOnAEpjOgUKwXyxj', name: 'Entdecken', selectedByDefault: false },
  { id: '0JQ5DAqbMKFPw634sFwguI', name: 'EQUAL', selectedByDefault: false },
  { id: '0JQ5DAqbMKFAXlCG6QvYQ4', name: 'Fitness', selectedByDefault: true },
  { id: '0JQ5DAqbMKFy78wprEpAjl', name: 'Folk & Akustik', selectedByDefault: false },
  { id: '0JQ5DAqbMKFImHYGo3eTSg', name: 'Fresh Finds', selectedByDefault: false },
  { id: '0JQ5DAqbMKFFsW9N8maB6z', name: 'Funk', selectedByDefault: false },
  { id: '0JQ5DAt0tbjZptfcdMSKl3', name: 'Fur dich erstellt', selectedByDefault: false },
  { id: '0JQ5DAqbMKFSFGqsfu3hFj', name: 'Fussball', selectedByDefault: false },
  { id: '0JQ5DAqbMKFCfObibaOZbv', name: 'Gaming', selectedByDefault: false },
  { id: '0JQ5DAqbMKFGnsSfvg90Wo', name: 'GLOW', selectedByDefault: false },
  { id: '0JQ5DAqbMKFQ00XGBls6ym', name: 'Hip-Hop', selectedByDefault: true },
  { id: '0JQ5DAqbMKFIRybaNTYXXy', name: 'Im Auto', selectedByDefault: false },
  { id: '0JQ5DAqbMKFCWjUTdzaG0e', name: 'Indie', selectedByDefault: true },
  { id: '0JQ5DAqbMKFRieVZLLoo9m', name: 'Instrumental', selectedByDefault: false },
  { id: '0JQ5DAqbMKFIVNxQgRNSg0', name: 'Jahrzehnte', selectedByDefault: false },
  { id: '0JQ5DAqbMKFAJ5xb0fwo9m', name: 'Jazz', selectedByDefault: false },
  { id: '0JQ5DAqbMKFObNLOHydSW8', name: 'Karibik', selectedByDefault: false },
  { id: '0JQ5DAqbMKFFoimhOqWzLB', name: 'Kinder & Familie', selectedByDefault: false },
  { id: '0JQ5DAqbMKFPrEiAOxgac3', name: 'Klassik', selectedByDefault: false },
  { id: '0JQ5DAqbMKFRY5ok2pxXJ0', name: 'Kochen & Essen', selectedByDefault: false },
  { id: '0JQ5DAqbMKFCbimwdOYlsl', name: 'Konzentration', selectedByDefault: false },
  { id: '0JQ5DAqbMKFGvOw3O4nLAf', name: 'K-Pop', selectedByDefault: false },
  { id: '0JQ5DAqbMKFxXaXKP7zcDp', name: 'Latin', selectedByDefault: false },
  { id: '0JQ5DAqbMKFAUsdyVjCQuL', name: 'Liebe', selectedByDefault: false },
  { id: '0JQ5DAqbMKFDkd668ypn6O', name: 'Metal', selectedByDefault: true },
  { id: '0JQ5DAqbMKFI3pNLtYMD9S', name: 'Natur & weisses Rauschen', selectedByDefault: false },
  { id: '0JQ5DAqbMKFEOEBCABAxo9', name: 'Netflix', selectedByDefault: false },
  { id: '0JQ5DAqbMKFz6FAsUtgAab', name: 'Neuerscheinungen', selectedByDefault: false },
  { id: '0JQ5DAqbMKFA6SOHvT3gck', name: 'Party', selectedByDefault: true },
  { id: '0JQ5DAqbMKFEC4WFtoNRpw', name: 'Pop', selectedByDefault: true },
  { id: '0JQ5DAqbMKFAjfauKLOZiv', name: 'Punk', selectedByDefault: false },
  { id: '0JQ5DAqbMKFOOxftoKZxod', name: 'RADAR', selectedByDefault: false },
  { id: '0JQ5DAqbMKFJKoGyUMo2hE', name: 'Reggae', selectedByDefault: false },
  { id: '0JQ5DAqbMKFAQy4HL4XU2D', name: 'Reise', selectedByDefault: false },
  { id: '0JQ5DAqbMKFEZPnFQSFB1T', name: 'RnB', selectedByDefault: false },
  { id: '0JQ5DAqbMKFDXXwE9BDJAr', name: 'Rock', selectedByDefault: true },
  { id: '0JQ5DAqbMKFCuoRTxhYWow', name: 'Schlafen', selectedByDefault: false },
  { id: '0JQ5DAqbMKFylzQHdDVGXB', name: 'Schlager', selectedByDefault: true },
  { id: '0JQ5IMCbQBLkUxOEesHoGn', name: 'Skate Noise', selectedByDefault: true },
  { id: '0JQ5DAqbMKFSCjnQr8QZ3O', name: 'Songwriter*innen', selectedByDefault: false },
  { id: '0JQ5DAqbMKFIpEuaCnimBj', name: 'Soul', selectedByDefault: false },
  { id: '0JQ5DAqbMKFDBgllo2cUIN', name: 'Spotify Singles', selectedByDefault: false },
  { id: '0JQ5DAqbMKFzHmL4tf05da', name: 'Stimmung', selectedByDefault: false },
  { id: '0JQ5DAqbMKFQIL0AXnG5AK', name: 'Trending', selectedByDefault: false },
  { id: '0JQ5DAqbMKFRKBHIxJ5hMm', name: 'Trendsetter', selectedByDefault: false },
  { id: '0JQ5DAqbMKFOzQeOmemkuw', name: 'TV & Filme', selectedByDefault: false },
  { id: '0JQ5DAqbMKFLb2EqgLtpjC', name: 'Wellness', selectedByDefault: false },
  { id: '0JQ5DAqbMKFx0uLQR2okcc', name: 'Zu Hause', selectedByDefault: false },
];

function pickRandomGenre(genres: SpotifyGenre[]): SpotifyGenre {
  const index = Math.floor(Math.random() * genres.length);
  return genres[index];
}

export function GenrePicker() {
  const [lastGenre, setLastGenre] = useState<SpotifyGenre | null>(null);
  const [revealedGenre, setRevealedGenre] = useState<SpotifyGenre | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>(
    SPOTIFY_GENRES.filter((genre) => genre.selectedByDefault).map((genre) => genre.id)
  );

  const activeGenres = useMemo(
    () => SPOTIFY_GENRES.filter((genre) => selectedGenreIds.includes(genre.id)),
    [selectedGenreIds]
  );
  const hasActiveGenres = activeGenres.length > 0;

  const buttonText = useMemo(() => {
    if (!hasActiveGenres) {
      return 'Select at least one genre in settings';
    }

    if (!lastGenre) {
      return 'Pick random Spotify genre';
    }

    return `Try another genre`;
  }, [hasActiveGenres, lastGenre]);

  const toggleGenre = (genreId: string) => {
    setSelectedGenreIds((currentIds) =>
      currentIds.includes(genreId)
        ? currentIds.filter((id) => id !== genreId)
        : [...currentIds, genreId]
    );
  };

  const enableAllGenres = () => {
    setSelectedGenreIds(SPOTIFY_GENRES.map((genre) => genre.id));
  };

  const disableAllGenres = () => {
    setSelectedGenreIds([]);
  };

  const REVEAL_DURATION_MS = 1500;

  const onPick = () => {
    if (!hasActiveGenres || revealedGenre) {
      return;
    }

    const genre = pickRandomGenre(activeGenres);
    setLastGenre(genre);
    setRevealedGenre(genre);

    setTimeout(() => {
      setRevealedGenre(null);
      const spotifyUrl = `https://open.spotify.com/genre/${encodeURIComponent(genre.id)}`;
      window.open(spotifyUrl, '_blank', 'noopener,noreferrer');
    }, REVEAL_DURATION_MS);
  };

  return (
    <>
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
          className="mt-8 w-full rounded-xl border border-[var(--ava-ice)]/55 bg-gradient-to-r from-[var(--ava-ice)] to-[var(--ava-ice-bright)] px-5 py-4 text-lg font-bold uppercase tracking-wide text-[var(--ava-night)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ava-ice-bright)]"
          type="button"
          disabled={!hasActiveGenres}
        >
          {buttonText}
        </button>

        {lastGenre ? (
          <p className="mt-4 text-center text-sm font-semibold tracking-wide text-[var(--ava-ice-bright)]">
            Last pick: {lastGenre.name.toUpperCase()}
          </p>
        ) : null}
      </div>

      <div className="fixed bottom-4 right-4 z-20 sm:bottom-6 sm:right-6">
        <button
          onClick={() => setIsSettingsOpen((isOpen) => !isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ava-ice)]/40 bg-[color:rgb(8_15_26_/_92%)] text-[var(--ava-ice-bright)] shadow-[0_10px_30px_rgba(4,10,18,0.55)] transition hover:bg-[color:rgb(170_215_249_/_12%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ava-ice-bright)]"
          type="button"
          aria-expanded={isSettingsOpen}
          aria-controls="genre-settings"
          aria-label="Open genre settings"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 0 1-4 0v-.09a1.7 1.7 0 0 0-1-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.88 1.7 1.7 0 0 0-1.56-1H3a2 2 0 0 1 0-4h.09a1.7 1.7 0 0 0 1.56-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.7 1.7 0 0 0 1.88.34h.01a1.7 1.7 0 0 0 1-1.56V3a2 2 0 0 1 4 0v.09a1.7 1.7 0 0 0 1 1.56h.01a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.88v.01a1.7 1.7 0 0 0 1.56 1H21a2 2 0 0 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1Z" />
          </svg>
        </button>

        {revealedGenre ? (
        <div className="genre-reveal-overlay fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
          <div className="genre-reveal-text relative px-8 text-center">
            <p className="genre-reveal-label text-xs font-semibold uppercase tracking-[0.25em] text-[var(--ava-ice)]">
              Opening in Spotify
            </p>
            <p className="mt-3 text-5xl font-black uppercase tracking-tight text-[var(--ava-snow)] sm:text-6xl">
              {revealedGenre.name}
            </p>
          </div>
        </div>
      ) : null}

      {isSettingsOpen ? (
          <div
            id="genre-settings"
            className="absolute bottom-14 right-0 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-[var(--ava-ice)]/40 bg-[color:rgb(8_15_26_/_97%)] p-4 shadow-[0_12px_40px_rgba(4,10,18,0.8)]"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--ava-ice-bright)]">
              Genre settings ({activeGenres.length}/{SPOTIFY_GENRES.length})
            </p>
            <div className="mb-3 flex items-center justify-between gap-2">
              <button
                onClick={enableAllGenres}
                className="rounded-md border border-[var(--ava-ice)]/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ava-ice-bright)] hover:bg-[color:rgb(170_215_249_/_12%)]"
                type="button"
              >
                Select all
              </button>
              <button
                onClick={disableAllGenres}
                className="rounded-md border border-[var(--ava-ice)]/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-[var(--ava-ice-bright)] hover:bg-[color:rgb(170_215_249_/_12%)]"
                type="button"
              >
                Deselect all
              </button>
            </div>

            <div className="max-h-56 space-y-2 overflow-y-auto pr-1 text-sm">
              {SPOTIFY_GENRES.map((genre) => {
                const isChecked = selectedGenreIds.includes(genre.id);

                return (
                  <label
                    key={genre.id}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[color:rgb(170_215_249_/_9%)]"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleGenre(genre.id)}
                      className="h-4 w-4 accent-[var(--ava-ice-bright)]"
                    />
                    <span className="text-[color:rgb(219_234_247_/_93%)]">{genre.name}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
