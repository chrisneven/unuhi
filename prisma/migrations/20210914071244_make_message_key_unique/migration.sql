/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `messages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "messages.key_unique" ON "messages"("key");
