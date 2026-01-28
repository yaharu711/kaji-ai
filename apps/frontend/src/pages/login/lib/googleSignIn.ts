import { signIn } from "@hono/auth-js/react";

const GOOGLE_PROVIDER_ID = "google";

export const googleSignIn = (callbackUrl: string) => {
  return signIn(GOOGLE_PROVIDER_ID, { callbackUrl });
};

export default googleSignIn;
