import { signIn } from "@hono/auth-js/react";

const GOOGLE_PROVIDER_ID = "google";

const resolveCallbackUrl = () => {
  try {
    return new URL("/", window.location.origin).toString();
  } catch {
    return "/";
  }
};

export const googleSignIn = () => {
  return signIn(GOOGLE_PROVIDER_ID, {
    callbackUrl: resolveCallbackUrl(),
  });
};

export default googleSignIn;
