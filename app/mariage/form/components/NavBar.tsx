import type { UIStrings } from '../data/formData';

interface NavBarProps {
  step: number;
  totalSteps: number;
  isSubmitting: boolean;
  T: UIStrings;
  onPrev: () => void;
  onNext: () => void;
}

export function NavBar({ step, totalSteps, isSubmitting, T, onPrev, onNext }: NavBarProps) {
  return (
    <div className="navbar">
      <button
        className="fbtn ghost"
        onClick={onPrev}
        style={{ visibility: step === 0 ? 'hidden' : 'visible' }}
      >
        <span className="arw">‹</span>
        <span>{T.prev}</span>
      </button>
      <button
        className="fbtn primary"
        onClick={onNext}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span>...</span>
        ) : (
          <>
            <span>{step === totalSteps - 1 ? T.send : T.next}</span>
            {step !== totalSteps - 1 && <span className="arw">›</span>}
          </>
        )}
      </button>
    </div>
  );
}
