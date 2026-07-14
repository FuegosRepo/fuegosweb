import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';
import { CheckIcon } from '../CheckIcon';

interface EntreesStepProps {
  lang: Lang;
  data: FormDataState;
  errors: Record<string, boolean>;
  T: UIStrings;
  toggleMultiSelect: (fieldKey: 'entrees' | 'viandes' | 'desserts' | 'services', id: string) => void;
}

export function EntreesStep({ lang, data, errors, T, toggleMultiSelect }: EntreesStepProps) {
  return (
    <div>
      <div className="selection-header">
        <p className="multi-hint">{T.entreesCount(data.entrees.length)}</p>
        {errors.entrees && (
          <p className="selection-error">{T.entreesExact}</p>
        )}
      </div>
      <div className="opts">
        {FORM_DATA.ENTREES.map((entree) => {
          const isSelected = data.entrees.includes(entree.id);
          return (
            <div
              key={entree.id}
              className={`opt ${isSelected ? 'sel' : ''}`}
              onClick={() => toggleMultiSelect('entrees', entree.id)}
            >
              <span className="box">
                <CheckIcon />
              </span>
              <div className="body">
                <div className="lead">{entree[lang]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
