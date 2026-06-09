import { supabase } from './supabase';

export interface FormSubmissionInput {
  source: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  plan?: string;
  payload?: Record<string, unknown>;
}

export const formsApi = {
  submit: async (input: FormSubmissionInput): Promise<void> => {
    const { error } = await supabase.from('form_submissions').insert({
      source: input.source,
      name: input.name || null,
      email: input.email || null,
      phone: input.phone || null,
      company: input.company || null,
      message: input.message || null,
      plan: input.plan || null,
      payload: input.payload ?? {},
      status: 'new',
    });
    if (error) throw new Error(error.message);
  },
};
