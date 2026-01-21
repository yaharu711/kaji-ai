CREATE TABLE "chore_beating_likes" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"user_id" text NOT NULL,
	"beating_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chore_beating_thank_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"user_id" text NOT NULL,
	"beating_id" integer NOT NULL,
	"main_message" text NOT NULL,
	"description_message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chore_beatings" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" text NOT NULL,
	"chore_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"like_count" integer DEFAULT 0 NOT NULL,
	"beated_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "chore_beating_likes" ADD CONSTRAINT "chore_beating_likes_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_beating_likes" ADD CONSTRAINT "chore_beating_likes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_beating_likes" ADD CONSTRAINT "chore_beating_likes_beating_id_chore_beatings_id_fk" FOREIGN KEY ("beating_id") REFERENCES "public"."chore_beatings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_beating_thank_messages" ADD CONSTRAINT "chore_beating_thank_messages_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_beating_thank_messages" ADD CONSTRAINT "chore_beating_thank_messages_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_beating_thank_messages" ADD CONSTRAINT "chore_beating_thank_messages_beating_id_chore_beatings_id_fk" FOREIGN KEY ("beating_id") REFERENCES "public"."chore_beatings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_beatings" ADD CONSTRAINT "chore_beatings_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_beatings" ADD CONSTRAINT "chore_beatings_chore_id_group_chores_id_fk" FOREIGN KEY ("chore_id") REFERENCES "public"."group_chores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chore_beatings" ADD CONSTRAINT "chore_beatings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "chore_beating_likes_beating_id_user_id_unique" ON "chore_beating_likes" USING btree ("beating_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "chore_beating_thank_messages_beating_id_user_id_unique" ON "chore_beating_thank_messages" USING btree ("beating_id","user_id");