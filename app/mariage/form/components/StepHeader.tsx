import { FORM_DATA, type Lang } from '../data/formData';

interface StepHeaderProps {
  lang: Lang;
  step: number;
  totalSteps: number;
  stepOfLabel: string;
  illo: string;
  stepKey: string;
}

export function StepHeader({ lang, step, totalSteps, stepOfLabel, illo, stepKey }: StepHeaderProps) {
  const head = FORM_DATA.HEAD[stepKey as keyof typeof FORM_DATA.HEAD][lang];

  return (
    <div className="step-head">
      <div className="step-illo">
        <img src={`/images/mariage-form/${illo}`} alt="" />
      </div>
      <p className="step-count">{stepOfLabel}</p>
      <h2 className="step-title">{head.t}</h2>
      {head.s && <p className="step-sub">{head.s}</p>}
    </div>
  );
}
