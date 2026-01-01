ALTER TABLE "user_group_beloging" RENAME TO "user_group_belongings";--> statement-breakpoint
ALTER TABLE "user_group_belongings" DROP CONSTRAINT "user_group_beloging_group_id_groups_id_fk";
--> statement-breakpoint
ALTER TABLE "user_group_belongings" DROP CONSTRAINT "user_group_beloging_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_group_belongings" DROP CONSTRAINT "user_group_beloging_user_id_group_id_pk";--> statement-breakpoint
ALTER TABLE "user_group_belongings" ADD CONSTRAINT "user_group_belongings_user_id_group_id_pk" PRIMARY KEY("user_id","group_id");--> statement-breakpoint
ALTER TABLE "user_group_belongings" ADD CONSTRAINT "user_group_belongings_group_id_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_group_belongings" ADD CONSTRAINT "user_group_belongings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;