/*
  Warnings:

  - You are about to drop the column `downloadUrl` on the `GenerationJob` table. All the data in the column will be lost.
  - You are about to drop the column `errorMessage` on the `GenerationJob` table. All the data in the column will be lost.
  - Added the required column `payload` to the `GenerationJob` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GenerationJob" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "tenderTitle" TEXT NOT NULL,
    "authority" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "payloadJson" JSONB NOT NULL
);
INSERT INTO "new_GenerationJob" ("authority", "createdAt", "id", "payloadJson", "progress", "status", "tenderTitle", "title", "updatedAt") SELECT "authority", "createdAt", "id", "payloadJson", "progress", "status", "tenderTitle", "title", "updatedAt" FROM "GenerationJob";
DROP TABLE "GenerationJob";
ALTER TABLE "new_GenerationJob" RENAME TO "GenerationJob";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
