import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000", // Make sure this matches your dev server port
});

export const { signIn, signUp, signOut, useSession } = authClient;
