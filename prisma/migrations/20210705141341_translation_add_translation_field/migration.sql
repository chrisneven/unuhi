/*
  Warnings:

  - Added the required column `translation` to the `translations` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "translation" TEXT NOT NULL,
    FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("language_id") REFERENCES "languages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_translations" ("id", "language_id", "message_id") SELECT "id", "language_id", "message_id" FROM "translations";
DROP TABLE "translations";
ALTER TABLE "new_translations" RENAME TO "translations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
