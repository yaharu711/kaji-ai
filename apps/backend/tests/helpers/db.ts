import { getDb } from "../../src/db/client";
import * as schema from "../../src/db/schema";
import { and, asc, eq } from "drizzle-orm";

const db = getDb();

type CreateUserParams = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

type CreateGroupParams = {
  id: string;
  name?: string;
  ownerId: string;
  image?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateBelongingParams = {
  groupId: string;
  userId: string;
  createdAt?: Date;
  acceptedAt?: Date | null;
};

type CreateMasterChoreParams = {
  choreName: string;
  iconCode: string;
};

type CreateGroupChoreParams = {
  id?: number;
  groupId: string;
  choreName: string;
  iconCode: string;
  createdAt?: Date;
  deletedAt?: Date | null;
};

type CreateChoreBeatingParams = {
  id?: number;
  groupId: string;
  choreId: number;
  userId: string;
  likeCount?: number;
  beatedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
};

type CreateChoreBeatingThankMessageParams = {
  id?: number;
  groupId: string;
  userId: string;
  beatingId: number;
  mainMessage: string;
  descriptionMessage?: string | null;
  createdAt?: Date;
};

export const createUser = async ({
  id,
  name = null,
  email = null,
  image = null,
}: CreateUserParams) => {
  await db.insert(schema.users).values({ id, name, email, image });
};

export const createUsers = async (users: CreateUserParams[]) => {
  if (users.length === 0) return;
  const values = users.map(({ id, name = null, email = null, image = null }) => ({
    id,
    name,
    email,
    image,
  }));
  await db.insert(schema.users).values(values);
};

export const createGroup = async ({
  id,
  name = "Group",
  ownerId,
  image = null,
  createdAt = new Date(),
  updatedAt = createdAt,
}: CreateGroupParams) => {
  await db.insert(schema.groups).values({
    id,
    name,
    ownerId,
    image,
    createdAt,
    updatedAt,
  });
};

export const createGroups = async (groups: CreateGroupParams[]) => {
  if (groups.length === 0) return;
  const values = groups.map(
    ({
      id,
      name = "Group",
      ownerId,
      image = null,
      createdAt = new Date(),
      updatedAt = createdAt,
    }) => ({
      id,
      name,
      ownerId,
      image,
      createdAt,
      updatedAt,
    }),
  );
  await db.insert(schema.groups).values(values);
};

export const createBelonging = async ({
  groupId,
  userId,
  createdAt = new Date(),
  acceptedAt = null,
}: CreateBelongingParams) => {
  await db.insert(schema.userGroupBelongings).values({
    groupId,
    userId,
    createdAt,
    acceptedAt,
  });
};

export const createBelongings = async (belongings: CreateBelongingParams[]) => {
  if (belongings.length === 0) return;
  const values = belongings.map(
    ({ groupId, userId, createdAt = new Date(), acceptedAt = null }) => ({
      groupId,
      userId,
      createdAt,
      acceptedAt,
    }),
  );
  await db.insert(schema.userGroupBelongings).values(values);
};

export const createMasterChore = async ({ choreName, iconCode }: CreateMasterChoreParams) => {
  await db.insert(schema.masterChores).values({
    choreName,
    iconCode,
  });
};

export const createMasterChores = async (chores: CreateMasterChoreParams[]) => {
  if (chores.length === 0) return;
  const values = chores.map(({ choreName, iconCode }) => ({
    choreName,
    iconCode,
  }));
  await db.insert(schema.masterChores).values(values);
};

export const createGroupChore = async ({
  id,
  groupId,
  choreName,
  iconCode,
  createdAt = new Date(),
  deletedAt = null,
}: CreateGroupChoreParams) => {
  const values: typeof schema.groupChores.$inferInsert = {
    groupId,
    choreName,
    iconCode,
    createdAt,
    deletedAt,
  };
  if (id !== undefined) {
    values.id = id;
  }

  await db.insert(schema.groupChores).values(values);
};

export const createChoreBeating = async ({
  id,
  groupId,
  choreId,
  userId,
  likeCount = 0,
  beatedAt,
  createdAt = new Date(),
  updatedAt = createdAt,
}: CreateChoreBeatingParams): Promise<number> => {
  const values: typeof schema.choreBeatings.$inferInsert = {
    groupId,
    choreId,
    userId,
    likeCount,
    beatedAt,
    createdAt,
    updatedAt,
  };

  if (id !== undefined) {
    values.id = id;
  }

  const rows = await db.insert(schema.choreBeatings).values(values).returning({
    id: schema.choreBeatings.id,
  });
  return rows[0].id;
};

export const createChoreBeatingThankMessage = async ({
  id,
  groupId,
  userId,
  beatingId,
  mainMessage,
  descriptionMessage = null,
  createdAt = new Date(),
}: CreateChoreBeatingThankMessageParams) => {
  const values: typeof schema.choreBeatingThankMessages.$inferInsert = {
    groupId,
    userId,
    beatingId,
    mainMessage,
    descriptionMessage,
    createdAt,
  };

  if (id !== undefined) {
    values.id = id;
  }

  await db.insert(schema.choreBeatingThankMessages).values(values);
};

export const findBelongingsByGroupId = async (groupId: string, userId?: string) => {
  const conditions = [eq(schema.userGroupBelongings.groupId, groupId)];
  if (userId) {
    conditions.push(eq(schema.userGroupBelongings.userId, userId));
  }
  return db
    .select()
    .from(schema.userGroupBelongings)
    .where(and(...conditions))
    .orderBy(asc(schema.userGroupBelongings.createdAt), asc(schema.userGroupBelongings.userId));
};
