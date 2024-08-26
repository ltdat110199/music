/*
  Warnings:

  - You are about to drop the column `image` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Song` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Song` table. All the data in the column will be lost.
  - Added the required column `album_name` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumnail_url` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `song_name` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumnail_url` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Song` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Album" DROP COLUMN "image",
DROP COLUMN "title",
ADD COLUMN     "album_name" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "thumnail_url" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Song" DROP COLUMN "image",
DROP COLUMN "title",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "song_name" TEXT NOT NULL,
ADD COLUMN     "thumnail_url" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
