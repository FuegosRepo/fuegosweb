import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';

interface TypeStepProps {
  lang: Lang;
  data: FormDataState;
  errors: Record<string, boolean>;
  T: UIStrings;
  updateField: <K extends keyof FormDataState>(key: K, value: FormDataState[K]) => void;
  clearError: (key: string) => void;
}

export function TypeStep({ lang, data, errors, T, updateField, clearError }: TypeStepProps) {
  return (
    <div>
      <p className="multi-hint">{T.pickOne}</p>
      <div className="opts">
        {FORM_DATA.TYPES.map((tObj) => {
          const isSelected = data.type === tObj.id;
          return (
            <div
              key={tObj.id}
              className={`opt round ${isSelected ? 'sel' : ''}`}
              onClick={() => {
                updateField('type', tObj.id);
                clearError('type');
              }}
            >
              <div className="body">
                <div className="ttl">{tObj[lang].t}</div>
                <div className="dsc">{tObj[lang].d}</div>
              </div>
            </div>
          );
        })}
      </div>
      {errors.type && (
        <p style={{ color: 'var(--error)', marginTop: '12px', fontSize: '12px', fontFamily: 'var(--font-sans)', letterSpacing: '0.04em' }}>
          {T.required}
        </p>
      )}
    </div>
  );
}
