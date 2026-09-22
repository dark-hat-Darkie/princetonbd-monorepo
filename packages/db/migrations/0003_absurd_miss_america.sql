ALTER TABLE "users" ADD COLUMN "counselor_name" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "counselor_role" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "counselor_email" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "counselor_phone" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "counselor_next_check_in" timestamp with time zone;