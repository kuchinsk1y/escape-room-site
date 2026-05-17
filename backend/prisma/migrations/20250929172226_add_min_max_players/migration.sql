/*
  Warnings:

  - You are about to drop the column `players` on the `Quest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Quest" DROP COLUMN "players",
ADD COLUMN     "maxPlayers" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "minPlayers" INTEGER NOT NULL DEFAULT 1;
