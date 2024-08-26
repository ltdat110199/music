/*
  Warnings:

  - You are about to drop the column `releaseDate` on the `Song` table. All the data in the column will be lost.
  - Added the required column `path` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "releaseDate",
ADD COLUMN     "path" TEXT NOT NULL;
