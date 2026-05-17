/*
  Warnings:

  - You are about to drop the column `price` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "public"."Quest" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 100;
