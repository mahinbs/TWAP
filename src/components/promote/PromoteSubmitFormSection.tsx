import { useMemo, useState } from 'react';

type Plan = {
  name: string;
  price: string;
};

type FieldConfig = {
  label: string;
  placeholder: string;
  required?: boolean;
  type?: 'text' | 'email';
  options?: string[];
};

export type PromoteSubmitFormSectionProps = {
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
};

export default function PromoteSubmitFormSection({
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
}: PromoteSubmitFormSectionProps) {
  const initialPlan = useMemo(() => {
    if (defaultPlan) return defaultPlan;
    return plans[0]?.name || '';
  }, [defaultPlan, plans]);

  const [selectedPlan, setSelectedPlan] = useState(initialPlan);

  const renderField = (field: FieldConfig) => {
    const commonClassName =
      'mt-1.5 w-full h-11 rounded-xl border border-[#d9d9d9] bg-white px-3.5 text-sm text-[#111] placeholder:text-[#9a9a9a] outline-none focus:ring-2';
    const ringStyle = { ['--tw-ring-color' as string]: `${accentColor}55` };

    if (field.options && field.options.length > 0) {
      return (
        <select className={commonClassName} style={ringStyle} defaultValue="">
          <option value="" disabled>
            {field.placeholder}
          </option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
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
      />
    );
  };

  return (
    <section id="promote-submit-form" className="bg-[#f2f2f1] py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase" style={{ color: accentColor }}>
            {eyebrow}
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-black leading-tight text-[#111111]">
            <span dangerouslySetInnerHTML={{ __html: headingHtml }} />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#666666] text-sm sm:text-base leading-relaxed">{introText}</p>
        </div>

        <div className="rounded-3xl border border-[#e3e3e3] bg-[#f7f7f6] p-5 sm:p-7">
          <h3 className="text-sm font-semibold text-[#111111] mb-3">Choose Your Plan</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
            {plans.map((plan) => {
              const active = selectedPlan === plan.name;
              return (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  className="rounded-xl border px-3 py-2.5 text-center transition-colors"
                  style={{
                    borderColor: active ? accentColor : '#d8d8d8',
                    backgroundColor: active ? `${accentColor}14` : '#fff',
                  }}
                >
                  <p className="text-sm font-semibold text-[#111111]">{plan.name}</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: active ? accentColor : '#555' }}>
                    {plan.price}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {leftColumnFields.map((field) => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-[#111111]">
                  {field.label}
                  {field.required ? ' *' : ''}
                </label>
                {renderField(field)}
              </div>
            ))}
            {rightColumnFields.map((field) => (
              <div key={field.label}>
                <label className="text-xs font-semibold text-[#111111]">
                  {field.label}
                  {field.required ? ' *' : ''}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>

          <div className="mt-3.5">
            <label className="text-xs font-semibold text-[#111111]">{textAreaLabel} *</label>
            <textarea
              rows={4}
              placeholder={textAreaPlaceholder}
              className="mt-1.5 w-full rounded-xl border border-[#d9d9d9] bg-white px-3.5 py-3 text-sm text-[#111] placeholder:text-[#9a9a9a] outline-none focus:ring-2 resize-y"
              style={{ ['--tw-ring-color' as string]: `${accentColor}55` }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-3.5">
            <div>
              <label className="text-xs font-semibold text-[#111111]">
                {bottomLeftField.label}
                {bottomLeftField.required ? ' *' : ''}
              </label>
              {renderField(bottomLeftField)}
            </div>
            <div>
              <label className="text-xs font-semibold text-[#111111]">
                {bottomRightField.label}
                {bottomRightField.required ? ' *' : ''}
              </label>
              {renderField(bottomRightField)}
            </div>
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-xl py-3.5 text-white text-sm font-semibold transition-opacity hover:opacity-95"
            style={{ backgroundColor: accentColor }}
          >
            {submitButtonText}
          </button>

          <p className="mt-3 text-center text-[11px] text-[#777]">{disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
