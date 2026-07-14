import { FORM_DATA, type Lang, type FormDataState, type UIStrings } from '../../data/formData';

interface SummaryStepProps {
  lang: Lang;
  data: FormDataState;
  T: UIStrings;
  onGoto: (index: number) => void;
  getSelectedVenueLabel: () => string;
  getSelectedTypeLabel: () => string;
  getSelectedItemsLabels: (
    list: readonly any[],
    selectedIds: string[]
  ) => string[] | null;
  getSelectedViandesLabels: () => string[] | null;
}

export function SummaryStep({
  lang,
  data,
  T,
  onGoto,
  getSelectedVenueLabel,
  getSelectedTypeLabel,
  getSelectedItemsLabels,
  getSelectedViandesLabels,
}: SummaryStepProps) {
  return (
    <div>
      <p className="sum-note">{T.summaryNote}</p>
      <div className="sum-wrap">
        {/* Row 1: Contact info */}
        <div className="sum-group">
          <div className="sum-k">
            {FORM_DATA.FIELDS.name[lang]} / {FORM_DATA.FIELDS.email[lang]}
          </div>
          <div className="sum-v">
            {[data.name, data.email, data.phone].filter(Boolean).join(' · ')}
          </div>
          <button className="sum-edit" onClick={() => onGoto(0)}>
            {T.edit}
          </button>
        </div>

        {/* Row 2: Date */}
        <div className="sum-group">
          <div className="sum-k">{FORM_DATA.FIELDS.date[lang]}</div>
          <div className="sum-v">{data.date || <span className="none">{T.none}</span>}</div>
          <button className="sum-edit" onClick={() => onGoto(0)}>
            {T.edit}
          </button>
        </div>

        {/* Row 3: Event Type */}
        <div className="sum-group">
          <div className="sum-k">{FORM_DATA.STEPS[1][lang]}</div>
          <div className="sum-v">{getSelectedTypeLabel()}</div>
          <button className="sum-edit" onClick={() => onGoto(1)}>
            {T.edit}
          </button>
        </div>

        {/* Row 4: Event Details */}
        <div className="sum-group">
          <div className="sum-k">{FORM_DATA.STEPS[2][lang]}</div>
          <div className="sum-v">
            {[
              data.guests ? `${data.guests}` : '',
              getSelectedVenueLabel() !== T.none ? getSelectedVenueLabel() : '',
              data.address,
              data.apero ? data.apero : '',
              data.service ? data.service : '',
            ]
              .filter(Boolean)
              .join(' · ') || <span className="none">{T.none}</span>}
          </div>
          <button className="sum-edit" onClick={() => onGoto(2)}>
            {T.edit}
          </button>
        </div>

        {/* Row 5: Entrées */}
        <SummaryListRow
          label={FORM_DATA.STEPS[3][lang]}
          items={getSelectedItemsLabels(FORM_DATA.ENTREES, data.entrees)}
          none={T.none}
          edit={T.edit}
          onEdit={() => onGoto(3)}
        />

        {/* Row 6: Viandes */}
        <SummaryListRow
          label={FORM_DATA.STEPS[4][lang]}
          items={getSelectedViandesLabels()}
          none={T.none}
          edit={T.edit}
          onEdit={() => onGoto(4)}
        />

        {/* Row 7: Desserts */}
        <SummaryListRow
          label={FORM_DATA.STEPS[5][lang]}
          items={getSelectedItemsLabels(FORM_DATA.DESSERTS, data.desserts)}
          none={T.none}
          edit={T.edit}
          onEdit={() => onGoto(5)}
        />

        {/* Row 8: Services */}
        <SummaryListRow
          label={FORM_DATA.STEPS[6][lang]}
          items={getSelectedItemsLabels(FORM_DATA.SERVICES, data.services)}
          none={T.none}
          edit={T.edit}
          onEdit={() => onGoto(6)}
        />

        {/* Row 9: Message */}
        <div className="sum-group">
          <div className="sum-k">{FORM_DATA.STEPS[7][lang]}</div>
          <div className="sum-v">{data.message || <span className="none">{T.none}</span>}</div>
          <button className="sum-edit" onClick={() => onGoto(7)}>
            {T.edit}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Reusable summary row for list items (entrees, viandes, desserts, services) */
function SummaryListRow({
  label,
  items,
  none,
  edit,
  onEdit,
}: {
  label: string;
  items: string[] | null;
  none: string;
  edit: string;
  onEdit: () => void;
}) {
  return (
    <div className="sum-group">
      <div className="sum-k">{label}</div>
      <div className="sum-v">
        {items ? (
          <ul>
            {items.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        ) : (
          <span className="none">{none}</span>
        )}
      </div>
      <button className="sum-edit" onClick={onEdit}>
        {edit}
      </button>
    </div>
  );
}
