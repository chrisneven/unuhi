/*
  Warnings:

  - Made the column `flag` on table `languages` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_languages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "flag" TEXT NOT NULL
);
INSERT INTO "new_languages" ("flag", "id", "language", "name") SELECT "flag", "id", "language", "name" FROM "languages";
DROP TABLE "languages";
ALTER TABLE "new_languages" RENAME TO "languages";
CREATE UNIQUE INDEX "languages_language_key" ON "languages"("language");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
