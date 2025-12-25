export { todos } from "./schemas/todos";
export { users, accounts, sessions, verificationTokens, authenticators } from "./schemas/authjs";

export type { TodoRecord, NewTodoRecord } from "./schemas/todos";
export type {
  UserRecord,
  NewUserRecord,
  AccountRecord,
  NewAccountRecord,
  SessionRecord,
  NewSessionRecord,
  VerificationTokenRecord,
  NewVerificationTokenRecord,
  AuthenticatorRecord,
  NewAuthenticatorRecord,
} from "./schemas/authjs";
