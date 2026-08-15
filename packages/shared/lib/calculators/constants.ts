/** Default deep link when the client has not supplied a feature-specific App URL yet. */
export const DEFAULT_APP_EXPERIENCE_URL =
  process.env.NEXT_PUBLIC_APP_EXPERIENCE_URL?.trim() ||
  "https://app.numforlife.com/h5/";
