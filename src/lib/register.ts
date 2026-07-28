/** Google Form URL for Summit registration. Set in `.env` as VITE_REGISTER_FORM_URL. */
export function getRegisterFormUrl(): string {
  const url = import.meta.env.VITE_REGISTER_FORM_URL as string | undefined
  return url?.trim() || '#'
}
