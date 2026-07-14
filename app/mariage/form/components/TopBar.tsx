import Link from 'next/link';
import type { Lang } from '../data/formData';

interface TopBarProps {
  lang: Lang;
  setLang: (l: Lang) => void;
  backLabel: string;
}

export function TopBar({ lang, setLang, backLabel }: TopBarProps) {
  return (
    <div className="topbar">
      <Link href="/mariage" className="back">
        <span className="arw">‹</span>
        <span>{backLabel}</span>
      </Link>
      <div className="langs">
        {(['fr', 'en', 'es'] as const).map((l) => (
          <button
            key={l}
            className={`lang ${lang === l ? 'active' : ''}`}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
