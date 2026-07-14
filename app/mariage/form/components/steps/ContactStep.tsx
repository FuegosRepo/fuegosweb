import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';

interface ContactStepProps {
  lang: Lang;
  data: FormDataState;
  errors: Record<string, boolean>;
  T: UIStrings;
  updateField: <K extends keyof FormDataState>(key: K, value: FormDataState[K]) => void;
  clearError: (key: string) => void;
}

export function ContactStep({ lang, data, errors, T, updateField, clearError }: ContactStepProps) {
  return (
    <div className="grid2">
      <div className={`field full ${errors.name ? 'err' : ''}`}>
        <label>{FORM_DATA.FIELDS.name[lang]}</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => {
            updateField('name', e.target.value);
            clearError('name');
          }}
          placeholder="Jean Dupont"
        />
        <span className="err-msg">{T.required}</span>
      </div>

      <div className={`field ${errors.email ? 'err' : ''}`}>
        <label>{FORM_DATA.FIELDS.email[lang]}</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => {
            updateField('email', e.target.value);
            clearError('email');
          }}
          placeholder="jean.dupont@example.com"
        />
        <span className="err-msg">{T.required}</span>
      </div>

      <div className="field">
        <label>
          {FORM_DATA.FIELDS.phone[lang]}{' '}
          <span className="opt-label">({T.optional})</span>
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div className={`field full ${errors.date ? 'err' : ''}`}>
        <label>{FORM_DATA.FIELDS.date[lang]}</label>
        <input
          type="date"
          value={data.date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => {
            updateField('date', e.target.value);
            clearError('date');
          }}
        />
        <span className="err-msg">{T.required}</span>
      </div>
    </div>
  );
}
