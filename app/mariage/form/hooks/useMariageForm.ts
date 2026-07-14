import { useState, useEffect } from 'react';
import {
  FORM_DATA,
  INITIAL_FORM_STATE,
  LOCAL_STORAGE_KEY,
  type Lang,
  type FormDataState,
} from '../data/formData';

export function useMariageForm() {
  const [lang, setLang] = useState<Lang>('fr');
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<FormDataState>({ ...INITIAL_FORM_STATE });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const totalSteps = FORM_DATA.STEPS.length;
  const activeStepMeta = FORM_DATA.STEPS[step];
  const T = () => FORM_DATA.UI[lang];

  // Restore state on mount
  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.lang) setLang(parsed.lang);
        if (typeof parsed.step === 'number') setStep(parsed.step);
        if (parsed.data) setData((prev) => ({ ...prev, ...parsed.data }));
      }
    } catch (e) {
      console.error("Error restoring form state:", e);
    }
  }, []);

  // Persist state on change
  useEffect(() => {
    if (!isMounted) return;
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ lang, step, data })
      );
    } catch (e) {
      console.error("Error saving form state:", e);
    }
  }, [lang, step, data, isMounted]);

  const validate = (): boolean => {
    const key = activeStepMeta.key;
    const newErrors: Record<string, boolean> = {};
    let isValid = true;

    if (key === 'contact') {
      if (!data.name.trim()) {
        newErrors.name = true;
        isValid = false;
      }
      if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        newErrors.email = true;
        isValid = false;
      }
      if (!data.date) {
        newErrors.date = true;
        isValid = false;
      }
    } else if (key === 'type') {
      if (!data.type) {
        newErrors.type = true;
        isValid = false;
      }
    } else if (key === 'event') {
      const guestNum = parseInt(data.guests, 10);
      if (!data.guests || isNaN(guestNum) || guestNum < 10) {
        newErrors.guests = true;
        isValid = false;
      }
    } else if (key === 'entrees') {
      if (data.entrees.length !== 2) {
        newErrors.entrees = true;
        isValid = false;
      }
    } else if (key === 'viandes') {
      if (data.viandes.length < 2 || data.viandes.length > 3) {
        newErrors.viandes = true;
        isValid = false;
      }
    } else if (key === 'desserts') {
      if (data.desserts.length !== 1) {
        newErrors.desserts = true;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-mariage-emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, lang }),
      });

      const result = await response.json();
      if (result.success) {
        setShowSuccess(true);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setData({ ...INITIAL_FORM_STATE });
        setStep(0);
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (e) {
      console.error(e);
      alert(
        lang === 'es' ? 'Ocurrió un error al enviar la solicitud.' :
        lang === 'en' ? 'An error occurred while sending the request.' :
        'Une erreur s\u2019est produite lors de l\u2019envoi de la demande.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step === totalSteps - 1) {
      handleSubmit();
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleGoto = (index: number) => {
    if (index < step) {
      setStep(index);
    } else if (index > step) {
      let tempStep = step;
      let checkValid = true;
      while (tempStep < index) {
        if (tempStep === step && !validate()) {
          checkValid = false;
          break;
        }
        tempStep++;
      }
      if (checkValid) setStep(index);
    }
  };

  const toggleMultiSelect = (fieldKey: 'entrees' | 'viandes' | 'desserts' | 'services', id: string) => {
    setData((prev) => {
      const currentList = prev[fieldKey];
      const index = currentList.indexOf(id);
      const newList = [...currentList];
      if (index >= 0) {
        newList.splice(index, 1);
      } else {
        if (fieldKey === 'entrees' && currentList.length >= 2) {
          return prev;
        }
        if (fieldKey === 'viandes' && currentList.length >= 3) {
          return prev;
        }
        newList.push(id);
      }
      return { ...prev, [fieldKey]: newList };
    });
  };

  const updateField = <K extends keyof FormDataState>(key: K, value: FormDataState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const clearError = (key: string) => {
    setErrors((prev) => ({ ...prev, [key]: false }));
  };

  // Summary helpers
  const getSelectedVenueLabel = () => {
    const venue = FORM_DATA.VENUES.find((v) => v.id === data.venue);
    return venue ? venue[lang] : data.venue || T().none;
  };

  const getSelectedTypeLabel = () => {
    const tObj = FORM_DATA.TYPES.find((t) => t.id === data.type);
    return tObj ? tObj[lang].t : T().none;
  };

  const getSelectedItemsLabels = (
    list: readonly any[],
    selectedIds: string[]
  ) => {
    if (!selectedIds.length) return null;
    return selectedIds.map((id) => {
      const item = list.find((x) => x.id === id);
      return item ? item[lang] : id;
    });
  };

  const getSelectedViandesLabels = () => {
    if (!data.viandes.length) return null;
    return data.viandes.map((id) => {
      const item = FORM_DATA.VIANDES.find((x) => x.id === id);
      return item ? `${item[lang]} — ${item.o[lang]}` : id;
    });
  };

  return {
    // State
    lang,
    setLang,
    step,
    data,
    errors,
    isSubmitting,
    showSuccess,
    setShowSuccess,
    isMounted,
    totalSteps,
    activeStepMeta,
    T,

    // Actions
    handleNext,
    handlePrev,
    handleGoto,
    toggleMultiSelect,
    updateField,
    clearError,

    // Summary helpers
    getSelectedVenueLabel,
    getSelectedTypeLabel,
    getSelectedItemsLabels,
    getSelectedViandesLabels,
  };
}
