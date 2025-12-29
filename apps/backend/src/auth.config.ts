import type { AuthConfig } from "@auth/core";
import Google from "@auth/core/providers/google";
import type { JWT } from "@auth/core/jwt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { getDb } from "./db/client";
import { accounts, authenticators, sessions, users, verificationTokens } from "./db/schema";
import env from "./util/env";
import type { AppSessionUser } from "./types/auth";

const db = getDb();
const frontendOrigin = env("FRONTEND_ORIGIN");

type TokenWithUserId = JWT & { userId?: string };

export const authConfig: AuthConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
  secret: env("AUTH_SECRET"),
  basePath: "/api/auth",
  providers: [
    Google({
      clientId: env("GOOGLE_CLIENT_ID"),
      clientSecret: env("GOOGLE_CLIENT_SECRET"),
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 3,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.id) {
        (token as TokenWithUserId).userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const userId = (token as TokenWithUserId).userId;
      if (session.user && userId) {
        // Auth.js の SessionUser には id フィールドが含まれていないため、
        // JWT に詰めた userId を session.user に注入してフロント側(useSessionなど)で参照できるようにする。
        (session.user as AppSessionUser).id = userId;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      try {
        const targetOrigin = new URL(url).origin;
        // デフォルトの設定だと、バックエンドのオリジンと同じでないと、フロントエンドで指定されたコールバックURLにリダイレクトできないため
        if (targetOrigin === baseUrl || targetOrigin === frontendOrigin) {
          return url;
        }
      } catch {
        // 無効な URL は baseUrl にフォールバック
      }

      return baseUrl;
    },
  },
};

export default authConfig;
