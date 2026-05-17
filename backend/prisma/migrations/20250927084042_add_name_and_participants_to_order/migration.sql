/*
  Warnings:

  - Added the required column `name` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participants` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "participants" INTEGER NOT NULL;
