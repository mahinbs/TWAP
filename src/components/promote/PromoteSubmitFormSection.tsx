import { useMemo, useState } from 'react';
import { formsApi } from '../../lib/forms';

type Plan = { name: string; price: string };

type FieldConfig = {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'email';
  options?: string[];
};

export type PromoteSubmitFormSectionProps = {
  source: string;
  accentColor: string;
  eyebrow: string;
  headingHtml: string;
  introText: string;
  plans: Plan[];
  defaultPlan?: string;
  leftColumnFields: FieldConfig[];
  rightColumnFields: FieldConfig[];
  textAreaLabel: string;
  textAreaPlaceholder: string;
  bottomLeftField: FieldConfig;
  bottomRightField: FieldConfig;
  submitButtonText: string;
  disclaimer: string;
  planPickerHeading: string;
  successTitle: string;
  successMessage: string;
  submittingText: string;
  errorMessage: string;
};

function fieldKey(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '_');
}

export default function PromoteSubmitFormSection({
  source,
  accentColor,
  eyebrow,
  headingHtml,
  introText,
  plans,
  defaultPlan,
  leftColumnFields,
  rightColumnFields,
  textAreaLabel,
  textAreaPlaceholder,
  bottomLeftField,
  bottomRightField,
  submitButtonText,
  disclaimer,
  planPickerHeading,
  successTitle,
  successMessage,
  submittingText,
  errorMessage,
}: PromoteSubmitFormSectionProps) {
  const initialPlan = useMemo(() => defaultPlan || plans[0]?.name || '', [defaultPlan, plans]);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan);
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const setVal = (key: string, v: string) => setValues(prev => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const extra: Record<string, string> = {};
      [...leftColumnFields, ...rightColumnFields, bottomLeftField, bottomRightField].forEach(f => {
        extra[f.label] = values[fieldKey(f.label)] ?? '';
      });
      extra[textAreaLabel] = values.message ?? '';

      await formsApi.submit({
        source,
        plan: selectedPlan,
        name: values.name || values[fieldKey(leftColumnFields[0]?.label ?? 'name')] || extra['Your Name'],
        email: values.email || Object.entries(values).find(([k]) => k.includes('email'))?.[1],
        message: values.message,
        payload: extra,
      });
      setStatus('success');
      setValues({});
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : errorMessage);
    }
  };

  const renderField = (field: FieldConfig, key: string) => {
    const commonClassName =
      'mt-1.5 w-full h-11 rounded-xl border border-[#d9d9d9] bg-white px-3.5 text-sm text-[#111] placeholder:text-[#9a9a9a] outline-none focus:ring-2';
    const ringStyle = { ['--tw-ring-color' as string]: `${accentColor}55` };
    const val = values[key] ?? '';

    if (field.options && field.options.length > 0) {
      return (
        <select
          className={commonClassName}
          style={ringStyle}
          value={val}
          required={field.required}
          onChange={e => setVal(key, e.target.value)}
        >
          <option value="" disabled>{field.placeholder}</option>
          {field.options.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type || 'text'}
        placeholder={field.placeholder}
        className={commonClassName}
        style={ringStyle}
        value={val}
        required={field.required}
        onChange={e => {
          setVal(key, e.target.value);
          if (field.type === 'email') setVal('email', e.target.value);
          if (field.label.toLowerCase().includes('name') && field.label.toLowerCase().includes('your')) setVal('name', e.target.value);
        }}
      />
    );
  };

  if (status === 'success') {
    return (
      <section id="promote-submit-form" className="bg-[#f2f2f1] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-[#e3e3e3] bg-[#f7f7f6] p-12">
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl text-white" style={{ backgroundColor: accentColor }}>✓</div>
          <h2 className="text-2xl font-black text-[#111] mb-2">{successTitle}</h2>
          <p className="text-[#666]">{successMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="promote-submit-form" className="bg-[#f2f2f1] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase" style={{ color: accentColor }}>{eyebrow}</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-[#111111]">
            <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#666666] text-sm sm:text-base leading-relaxed">{introText}</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-[#e3e3e3] bg-[#f7f7f6] p-5 sm:p-7">
          <h3 className="text-sm font-semibold text-[#111111] mb-3">{planPickerHeading}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
            {plans.map(plan => {
              const active = selectedPlan === plan.name;
              return (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  className="rounded-xl border px-3 py-2.5 text-center transition-colors"
                  style={{ borderColor: active ? accentColor : '#d8d8d8', backgroundColor: active ? `${accentColor}14` : '#fff' }}
                >
                  <p className="text-sm font-semibold text-[#111111]">{plan.name}</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: active ? accentColor : '#555' }}>{plan.price}</p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {leftColumnFields.map(field => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-[#111111]">{field.label}{field.required ? ' *' : ''}</label>
                {renderField(field, fieldKey(field.label))}
              </div>
            ))}
            {rightColumnFields.map(field => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-[#111111]">{field.label}{field.required ? ' *' : ''}</label>
                {renderField(field, fieldKey(field.label))}
              </div>
            ))}
          </div>

          <div className="mt-3.5">
            <label className="text-xs font-semibold text-[#111111]">{textAreaLabel} *</label>
            <textarea
              rows={4}
              required
              placeholder={textAreaPlaceholder}
              value={values.message ?? ''}
              onChange={e => setVal('message', e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#d9d9d9] bg-white px-3.5 py-3 text-sm text-[#111] placeholder:text-[#9a9a9a] outline-none focus:ring-2 resize-y"
              style={{ ['--tw-ring-color' as string]: `${accentColor}55` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3.5">
            <div>
              <label className="text-xs font-semibold text-[#111111]">{bottomLeftField.label}{bottomLeftField.required ? ' *' : ''}</label>
              {renderField(bottomLeftField, fieldKey(bottomLeftField.label))}
            </div>
            <div>
              <label className="text-xs font-semibold text-[#111111]">{bottomRightField.label}{bottomRightField.required ? ' *' : ''}</label>
              {renderField(bottomRightField, fieldKey(bottomRightField.label))}
            </div>
          </div>

          {errorMsg && <p className="mt-3 text-sm text-red-600 text-center">{errorMsg}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="mt-5 w-full rounded-xl py-3.5 text-white text-sm font-semibold transition-opacity hover:opacity-95 disabled:opacity-60"
            style={{ backgroundColor: accentColor }}
          >
            {status === 'loading' ? submittingText : submitButtonText}
          </button>

          <p className="mt-3 text-center text-[11px] text-[#777]">{disclaimer}</p>
        </form>
      </div>
    </section>
  );
}
