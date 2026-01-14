CREATE TABLE "group_chores" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"chore_name" text NOT NULL,
	"icon_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "master_chores" (
	"id" serial PRIMARY KEY NOT NULL,
	"chore_name" text NOT NULL,
	"icon_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
INSERT INTO "master_chores" ("chore_name", "icon_code") VALUES
	('食器洗い', 'dish-wash'),
	('掃除', 'cleaning'),
	('洗濯', 'laundry'),
	('料理', 'cooking'),
	('ゴミ出し', 'trash'),
	('買い物', 'shopping'),
	('お風呂掃除', 'bath-cleaning'),
	('トイレ掃除', 'toilet-cleaning');
--> statement-breakpoint
ALTER TABLE "group_chores" ADD CONSTRAINT "group_chores_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
