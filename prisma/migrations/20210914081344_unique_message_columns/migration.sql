/*
  Warnings:

  - A unique constraint covering the columns `[message_id,language_id]` on the table `translations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "translations_message_id_language_id_key" ON "translations"("message_id", "language_id");
