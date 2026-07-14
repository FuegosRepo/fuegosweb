import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';

interface MessageStepProps {
  lang: Lang;
  data: FormDataState;
  T: UIStrings;
  updateField: <K extends keyof FormDataState>(key: K, value: FormDataState[K]) => void;
}

export function MessageStep({ lang, data, T, updateField }: MessageStepProps) {
  return (
    <div className="grid2">
      <div className="field full">
        <label>
          Message <span className="opt-label">({T.optional})</span>
        </label>
        <textarea
          value={data.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder={FORM_DATA.messagePlaceholder[lang]}
        ></textarea>
      </div>
    </div>
  );
}
