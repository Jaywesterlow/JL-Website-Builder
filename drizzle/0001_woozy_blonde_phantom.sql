ALTER TABLE `media` ADD `filename` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `media` ADD `mime_type` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `media` ADD `size` int NOT NULL;--> statement-breakpoint
ALTER TABLE `media` ADD `created_at` timestamp DEFAULT (now());