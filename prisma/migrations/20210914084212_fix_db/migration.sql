-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "translation" TEXT NOT NULL,
    CONSTRAINT "translations_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "translations_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_translations" ("id", "language_id", "message_id", "translation") SELECT "id", "language_id", "message_id", "translation" FROM "translations";
DROP TABLE "translations";
ALTER TABLE "new_translations" RENAME TO "translations";
CREATE UNIQUE INDEX "translations_message_id_language_id_key" ON "translations"("message_id", "language_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
