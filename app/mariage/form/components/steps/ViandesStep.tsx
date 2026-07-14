import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';
import { CheckIcon } from '../CheckIcon';

interface ViandesStepProps {
  lang: Lang;
  data: FormDataState;
  errors: Record<string, boolean>;
  T: UIStrings;
  toggleMultiSelect: (fieldKey: 'entrees' | 'viandes' | 'desserts' | 'services', id: string) => void;
}

export function ViandesStep({ lang, data, errors, T, toggleMultiSelect }: ViandesStepProps) {
  return (
    <div>
      <div className="selection-header">
        <p className="multi-hint">{T.viandesCount(data.viandes.length)}</p>
        {errors.viandes && (
          <p className="selection-error">{T.viandesRange}</p>
        )}
      </div>
      <div className="opts">
        {FORM_DATA.VIANDES.map((viande) => {
          const isSelected = data.viandes.includes(viande.id);
          return (
            <div
              key={viande.id}
              className={`opt ${isSelected ? 'sel' : ''}`}
              onClick={() => toggleMultiSelect('viandes', viande.id)}
            >
              <span className="box">
                <CheckIcon />
              </span>
              <div className="body">
                <div className="ttl">
                  {viande[lang]} <span className="org">— {viande.o[lang]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="veggie-note">{T.veggieNote}</div>
    </div>
  );
}
