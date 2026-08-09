import { AlertTriangle } from 'lucide-react';
import { isFirebaseConfigured } from '@/lib/firebase';

/**
 * A prominent, dismissible-free banner shown only when Firebase web config is
 * absent. Keeps the app from looking silently broken during setup / preview.
 */
export function ConfigBanner() {
  if (isFirebaseConfigured) return null;
  return (
    <div className="relative z-50 bg-warning/10 text-warning">
      <div className="container-page flex items-center gap-2.5 py-2 text-xs sm:text-sm">
        <AlertTriangle className="h-4 w-4 shrink-0" />
        <span>
          Firebase is not configured. Copy <code className="font-mono">.env.example</code> to{' '}
          <code className="font-mono">.env</code> and add your Firebase web config to load live data.
        </span>
      </div>
    </div>
  );
}
