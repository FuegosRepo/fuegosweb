"use client";

import './mariage-form.css';
import { useMariageForm } from './hooks/useMariageForm';

// Layout components
import { TopBar } from './components/TopBar';
import { SideRail } from './components/SideRail';
import { StepHeader } from './components/StepHeader';
import { NavBar } from './components/NavBar';
import { SuccessOverlay } from './components/SuccessOverlay';

// Step components
import { ContactStep } from './components/steps/ContactStep';
import { TypeStep } from './components/steps/TypeStep';
import { EventStep } from './components/steps/EventStep';
import { EntreesStep } from './components/steps/EntreesStep';
import { ViandesStep } from './components/steps/ViandesStep';
import { DessertsStep } from './components/steps/DessertsStep';
import { ServicesStep } from './components/steps/ServicesStep';
import { MessageStep } from './components/steps/MessageStep';
import { SummaryStep } from './components/steps/SummaryStep';

export default function MariageFormPage() {
  const form = useMariageForm();

  if (!form.isMounted) {
    return (
      <div className="mariage-form-override min-h-screen flex items-center justify-center bg-[#FEFBE8]">
        <div className="text-center font-sans tracking-widest text-[#1C3FBF] uppercase text-sm animate-pulse">
          Chargement...
        </div>
      </div>
    );
  }

  const T = form.T();
  const stepKey = form.activeStepMeta.key;

  const renderStep = () => {
    const shared = { lang: form.lang, data: form.data, errors: form.errors, T, updateField: form.updateField, clearError: form.clearError };

    switch (stepKey) {
      case 'contact':  return <ContactStep {...shared} />;
      case 'type':     return <TypeStep {...shared} />;
      case 'event':    return <EventStep {...shared} />;
      case 'entrees':  return <EntreesStep lang={form.lang} data={form.data} errors={form.errors} T={T} toggleMultiSelect={form.toggleMultiSelect} />;
      case 'viandes':  return <ViandesStep lang={form.lang} data={form.data} errors={form.errors} T={T} toggleMultiSelect={form.toggleMultiSelect} />;
      case 'desserts': return <DessertsStep {...shared} />;
      case 'services': return <ServicesStep lang={form.lang} data={form.data} T={T} toggleMultiSelect={form.toggleMultiSelect} />;
      case 'message':  return <MessageStep lang={form.lang} data={form.data} T={T} updateField={form.updateField} />;
      case 'summary':  return (
        <SummaryStep
          lang={form.lang}
          data={form.data}
          T={T}
          onGoto={form.handleGoto}
          getSelectedVenueLabel={form.getSelectedVenueLabel}
          getSelectedTypeLabel={form.getSelectedTypeLabel}
          getSelectedItemsLabels={form.getSelectedItemsLabels}
          getSelectedViandesLabels={form.getSelectedViandesLabels}
        />
      );
      default: return null;
    }
  };

  return (
    <div className="mariage-form-override">
      <TopBar lang={form.lang} setLang={form.setLang} backLabel={T.backToSite} />

      <div className="shell">
        <SideRail lang={form.lang} step={form.step} T={T} onGoto={form.handleGoto} />

        <main className="panel">
          <div className="progress">
            <div
              className="fill"
              style={{ width: `${((form.step + 1) / form.totalSteps) * 100}%` }}
            ></div>
          </div>

          <div className="stepwrap">
            <div className="step">
              <StepHeader
                lang={form.lang}
                step={form.step}
                totalSteps={form.totalSteps}
                stepOfLabel={T.stepOf(form.step + 1, form.totalSteps)}
                illo={form.activeStepMeta.illo}
                stepKey={stepKey}
              />
              {renderStep()}
            </div>
          </div>

          <NavBar
            step={form.step}
            totalSteps={form.totalSteps}
            isSubmitting={form.isSubmitting}
            T={T}
            onPrev={form.handlePrev}
            onNext={form.handleNext}
          />
        </main>
      </div>

      <SuccessOverlay show={form.showSuccess} T={T} onClose={() => form.setShowSuccess(false)} />
    </div>
  );
}
