import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';
import { CheckIcon } from '../CheckIcon';

interface DessertsStepProps {
  lang: Lang;
  data: FormDataState;
  errors: Record<string, boolean>;
  T: UIStrings;
  updateField: <K extends keyof FormDataState>(key: K, value: FormDataState[K]) => void;
  clearError: (key: string) => void;
}

export function DessertsStep({ lang, data, errors, T, updateField, clearError }: DessertsStepProps) {
  return (
    <div>
      <div className="selection-header">
        <p className="multi-hint">{T.dessertsCount(data.desserts.length)}</p>
        {errors.desserts && (
          <p className="selection-error">{T.dessertsOne}</p>
        )}
      </div>
      <div className="opts">
        {FORM_DATA.DESSERTS.map((dessert) => {
          const isSelected = data.desserts.includes(dessert.id);
          return (
            <div
              key={dessert.id}
              className={`opt round ${isSelected ? 'sel' : ''}`}
              onClick={() => {
                updateField('desserts', [dessert.id]);
                clearError('desserts');
              }}
            >
              <span className="box">
                <CheckIcon />
              </span>
              <div className="body">
                <div className="lead">{dessert[lang]}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
