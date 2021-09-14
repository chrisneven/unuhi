-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_translations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message_id" INTEGER NOT NULL,
    "language_id" INTEGER NOT NULL,
    "translation" TEXT NOT NULL,
    CONSTRAINT "translations_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "translations_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "languages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_translations" ("id", "language_id", "message_id", "translation") SELECT "id", "language_id", "message_id", "translation" FROM "translations";
DROP TABLE "translations";
ALTER TABLE "new_translations" RENAME TO "translations";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineIndex
DROP INDEX "accounts.compound_id_unique";
CREATE UNIQUE INDEX "accounts_compound_id_key" ON "accounts"("compound_id");

-- RedefineIndex
DROP INDEX "messages.key_unique";
CREATE UNIQUE INDEX "messages_key_key" ON "messages"("key");

-- RedefineIndex
DROP INDEX "sessions.access_token_unique";
CREATE UNIQUE INDEX "sessions_access_token_key" ON "sessions"("access_token");

-- RedefineIndex
DROP INDEX "sessions.session_token_unique";
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- RedefineIndex
DROP INDEX "users.email_unique";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- RedefineIndex
DROP INDEX "verification_requests.token_unique";
CREATE UNIQUE INDEX "verification_requests_token_key" ON "verification_requests"("token");
