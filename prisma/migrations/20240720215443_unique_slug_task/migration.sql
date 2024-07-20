/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "tasks_slug_key" ON "tasks"("slug");
