'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

type SpotifyGenre = {
  id: string;
  name: string;
};

const SPOTIFY_GENRES: SpotifyGenre[] = [
  { id: '0JQ5DAqbMKFNQ0fGp4byGU', name: 'Afro' },
  { id: '0JQ5DAqbMKFFtlLYUHv8bT', name: 'Alternative' },
  { id: '0JQ5DAqbMKFLjmiZRss79w', name: 'Ambient' },
  { id: '0JQ5DAqbMKFziKOShCi009', name: 'Anime' },
  { id: '0JQ5DAqbMKFQiK2EHwyjcU', name: 'Blues' },
  { id: '0JQ5DAudkNjCgYMM0TZXDw', name: 'Charts' },
  { id: '0JQ5DAqbMKFFzDl7qN9Apr', name: 'Chillout' },
  { id: '0JQ5DAqbMKFKLfwjuJMoNC', name: 'Country' },
  { id: '0JQ5DAqbMKFHOzuVTgTizF', name: 'Dance/Electronic' },
  { id: '0JQ5DAqbMKFIxnofjQmnmn', name: 'Disney' },
  { id: '0JQ5DAtOnAEpjOgUKwXyxj', name: 'Entdecken' },
  { id: '0JQ5DAqbMKFPw634sFwguI', name: 'EQUAL' },
  { id: '0JQ5DAqbMKFAXlCG6QvYQ4', name: 'Fitness' },
  { id: '0JQ5DAqbMKFy78wprEpAjl', name: 'Folk & Akustik' },
  { id: '0JQ5DAqbMKFImHYGo3eTSg', name: 'Fresh Finds' },
  { id: '0JQ5DAqbMKFFsW9N8maB6z', name: 'Funk' },
  { id: '0JQ5DAt0tbjZptfcdMSKl3', name: 'Fur dich erstellt' },
  { id: '0JQ5DAqbMKFSFGqsfu3hFj', name: 'Fussball' },
  { id: '0JQ5DAqbMKFCfObibaOZbv', name: 'Gaming' },
  { id: '0JQ5DAqbMKFGnsSfvg90Wo', name: 'GLOW' },
  { id: '0JQ5DAqbMKFQ00XGBls6ym', name: 'Hip-Hop' },
  { id: '0JQ5DAqbMKFIRybaNTYXXy', name: 'Im Auto' },
  { id: '0JQ5DAqbMKFCWjUTdzaG0e', name: 'Indie' },
  { id: '0JQ5DAqbMKFRieVZLLoo9m', name: 'Instrumental' },
  { id: '0JQ5DAqbMKFIVNxQgRNSg0', name: 'Jahrzehnte' },
  { id: '0JQ5DAqbMKFAJ5xb0fwo9m', name: 'Jazz' },
  { id: '0JQ5DAqbMKFObNLOHydSW8', name: 'Karibik' },
  { id: '0JQ5DAqbMKFFoimhOqWzLB', name: 'Kinder & Familie' },
  { id: '0JQ5DAqbMKFPrEiAOxgac3', name: 'Klassik' },
  { id: '0JQ5DAqbMKFRY5ok2pxXJ0', name: 'Kochen & Essen' },
  { id: '0JQ5DAqbMKFCbimwdOYlsl', name: 'Konzentration' },
  { id: '0JQ5DAqbMKFGvOw3O4nLAf', name: 'K-Pop' },
  { id: '0JQ5DAqbMKFxXaXKP7zcDp', name: 'Latin' },
  { id: '0JQ5DAqbMKFAUsdyVjCQuL', name: 'Liebe' },
  { id: '0JQ5DAqbMKFDkd668ypn6O', name: 'Metal' },
  { id: '0JQ5DAqbMKFI3pNLtYMD9S', name: 'Natur & weisses Rauschen' },
  { id: '0JQ5DAqbMKFEOEBCABAxo9', name: 'Netflix' },
  { id: '0JQ5DAqbMKFz6FAsUtgAab', name: 'Neuerscheinungen' },
  { id: '0JQ5DAqbMKFA6SOHvT3gck', name: 'Party' },
  { id: '0JQ5DAqbMKFEC4WFtoNRpw', name: 'Pop' },
  { id: '0JQ5DAqbMKFAjfauKLOZiv', name: 'Punk' },
  { id: '0JQ5DAqbMKFOOxftoKZxod', name: 'RADAR' },
  { id: '0JQ5DAqbMKFJKoGyUMo2hE', name: 'Reggae' },
  { id: '0JQ5DAqbMKFAQy4HL4XU2D', name: 'Reise' },
  { id: '0JQ5DAqbMKFEZPnFQSFB1T', name: 'RnB' },
  { id: '0JQ5DAqbMKFDXXwE9BDJAr', name: 'Rock' },
  { id: '0JQ5DAqbMKFCuoRTxhYWow', name: 'Schlafen' },
  { id: '0JQ5IMCbQBLkUxOEesHoGn', name: 'Skate Noise' },
  { id: '0JQ5DAqbMKFSCjnQr8QZ3O', name: 'Songwriter*innen' },
  { id: '0JQ5DAqbMKFIpEuaCnimBj', name: 'Soul' },
  { id: '0JQ5DAqbMKFDBgllo2cUIN', name: 'Spotify Singles' },
  { id: '0JQ5DAqbMKFzHmL4tf05da', name: 'Stimmung' },
  { id: '0JQ5DAqbMKFQIL0AXnG5AK', name: 'Trending' },
  { id: '0JQ5DAqbMKFRKBHIxJ5hMm', name: 'Trendsetter' },
  { id: '0JQ5DAqbMKFOzQeOmemkuw', name: 'TV & Filme' },
  { id: '0JQ5DAqbMKFLb2EqgLtpjC', name: 'Wellness' },
  { id: '0JQ5DAqbMKFx0uLQR2okcc', name: 'Zu Hause' },
];

function pickRandomGenre(): SpotifyGenre {
  const index = Math.floor(Math.random() * SPOTIFY_GENRES.length);
  return SPOTIFY_GENRES[index];
}

export function GenrePicker() {
  const [lastGenre, setLastGenre] = useState<SpotifyGenre | null>(null);

  const buttonText = useMemo(() => {
    if (!lastGenre) {
      return 'Pick random Spotify genre';
    }

    return `Try another genre`;
  }, [lastGenre]);

  const onPick = () => {
    const genre = pickRandomGenre();
    setLastGenre(genre);

    const spotifyUrl = `https://open.spotify.com/genre/${encodeURIComponent(genre.id)}`;
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
          Last pick: {lastGenre.name.toUpperCase()}
        </p>
      ) : null}
    </div>
  );
}
