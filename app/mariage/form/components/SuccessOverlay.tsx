import type { UIStrings } from '../data/formData';

interface SuccessOverlayProps {
  show: boolean;
  T: UIStrings;
  onClose: () => void;
}

export function SuccessOverlay({ show, T, onClose }: SuccessOverlayProps) {
  return (
    <div className={`done-veil ${show ? 'show' : ''}`} onClick={onClose}>
      <div className="done-card" onClick={(e) => e.stopPropagation()}>
        <div className="ic">
          <img src="/images/mariage-form/il-champagne.png" alt="" />
        </div>
        <h3>{T.sentTitle}</h3>
        <p>{T.sentBody}</p>
        <button className="fbtn primary" style={{ margin: '0 auto' }} onClick={onClose}>
          <span>{T.sentClose}</span>
        </button>
      </div>
    </div>
  );
}
