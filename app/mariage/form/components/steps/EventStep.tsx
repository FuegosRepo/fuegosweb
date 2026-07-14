import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';

interface EventStepProps {
  lang: Lang;
  data: FormDataState;
  errors: Record<string, boolean>;
  T: UIStrings;
  updateField: <K extends keyof FormDataState>(key: K, value: FormDataState[K]) => void;
  clearError: (key: string) => void;
}

export function EventStep({ lang, data, errors, T, updateField, clearError }: EventStepProps) {
  return (
    <div className="grid2">
      <div className={`field ${errors.guests ? 'err' : ''}`}>
        <label>{FORM_DATA.FIELDS.guests[lang]}</label>
        <input
          type="number"
          min="10"
          inputMode="numeric"
          value={data.guests}
          onChange={(e) => {
            updateField('guests', e.target.value);
            clearError('guests');
          }}
          placeholder="100"
        />
        <span className="err-msg">{T.guestsMin}</span>
      </div>

      <div className="field">
        <label>{FORM_DATA.FIELDS.venue[lang]}</label>
        <select
          value={data.venue}
          onChange={(e) => updateField('venue', e.target.value)}
        >
          <option value="" disabled>
            {T.pickOne}
          </option>
          {FORM_DATA.VENUES.map((vObj) => (
            <option key={vObj.id} value={vObj.id}>
              {vObj[lang]}
            </option>
          ))}
        </select>
      </div>

      <div className="field full">
        <label>{FORM_DATA.FIELDS.address[lang]}</label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => updateField('address', e.target.value)}
          placeholder="Mougins, France"
        />
      </div>

      <div className="field">
        <label>{FORM_DATA.FIELDS.apero[lang]}</label>
        <input
          type="time"
          value={data.apero}
          onChange={(e) => updateField('apero', e.target.value)}
        />
      </div>

      <div className="field">
        <label>{FORM_DATA.FIELDS.service[lang]}</label>
        <input
          type="time"
          value={data.service}
          onChange={(e) => updateField('service', e.target.value)}
        />
      </div>
    </div>
  );
}
