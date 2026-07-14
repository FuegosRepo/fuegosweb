import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';
import { CheckIcon } from '../CheckIcon';

interface ServicesStepProps {
  lang: Lang;
  data: FormDataState;
  T: UIStrings;
  toggleMultiSelect: (fieldKey: 'entrees' | 'viandes' | 'desserts' | 'services', id: string) => void;
}

export function ServicesStep({ lang, data, T, toggleMultiSelect }: ServicesStepProps) {
  return (
    <div>
      <p className="multi-hint">{T.multiHint}</p>
      <div className="opts">
        {FORM_DATA.SERVICES.map((srv) => {
          const isSelected = data.services.includes(srv.id);
          return (
            <div
              key={srv.id}
              className={`opt ${isSelected ? 'sel' : ''}`}
              onClick={() => toggleMultiSelect('services', srv.id)}
            >
              <span className="box">
                <CheckIcon />
              </span>
              <div className="body">
                <div className="lead">{srv[lang]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
