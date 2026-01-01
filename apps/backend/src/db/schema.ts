export { todos } from "./schemas/todos";
export { groups } from "./schemas/groups";
export { userGroupBelongings } from "./schemas/userGroupBelongings";
export { users, accounts, sessions, verificationTokens, authenticators } from "./schemas/authjs";

export type { TodoRecord, NewTodoRecord } from "./schemas/todos";
export type { GroupRecord, NewGroupRecord } from "./schemas/groups";
export type {
  UserGroupBelongingRecord,
  NewUserGroupBelongingRecord,
} from "./schemas/userGroupBelongings";
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
