-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" SERIAL NOT NULL,
    "artist" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "idAlbum" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_idAlbum_fkey" FOREIGN KEY ("idAlbum") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Song" ADD CONSTRAINT "Song_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
