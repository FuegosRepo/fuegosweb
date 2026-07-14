import { FORM_DATA, type Lang } from '../data/formData';
import type { UIStrings } from '../data/formData';

interface SideRailProps {
  lang: Lang;
  step: number;
  T: UIStrings;
  onGoto: (index: number) => void;
}

export function SideRail({ lang, step, T, onGoto }: SideRailProps) {
  return (
    <aside className="rail">
      <p className="rail-kicker">{T.kicker}</p>
      <h1 className="rail-title">{T.title}</h1>
      <p className="rail-intro">{T.intro}</p>
      <ol className="rail-steps">
        {FORM_DATA.STEPS.map((s, idx) => (
          <li
            key={s.key}
            className={idx === step ? 'active' : idx < step ? 'done' : ''}
            onClick={() => onGoto(idx)}
          >
            <span className="num">{idx < step ? '✓' : idx + 1}</span>
            <span className="lbl">{s[lang]}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
