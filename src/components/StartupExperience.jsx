import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import GuestNameModal from './GuestNameModal';

const SPLASH_MS = 3000;

function StartupSplash() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="orica-splash-logo select-none">
          <span className="orica-splash-word">ORICA</span>
        </div>
        <div className="mt-5 text-white/70 text-xs sm:text-sm tracking-wide">
          Smarter decisions, simplified.
        </div>
      </div>
    </div>
  );
}

export default function StartupExperience({ children }) {
  const { token, guestName } = useAuth();
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setSplashDone(true), SPLASH_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!splashDone) {
    return <StartupSplash />;
  }

  return (
    <div className="orica-intro-animate">
      {!token && !guestName ? <GuestNameModal /> : null}
      {children}
    </div>
  );
}

