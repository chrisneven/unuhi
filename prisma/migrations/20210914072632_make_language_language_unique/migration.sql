/*
  Warnings:

  - A unique constraint covering the columns `[language]` on the table `languages` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "languages_language_key" ON "languages"("language");
