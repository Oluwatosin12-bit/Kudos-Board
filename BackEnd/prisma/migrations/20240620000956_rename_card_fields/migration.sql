/*
  Warnings:

  - You are about to drop the column `caption` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `cardAuthor` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardDescription` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardImgUrl` to the `Cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardTitle` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "caption",
DROP COLUMN "imgUrl",
ADD COLUMN     "cardAuthor" TEXT NOT NULL,
ADD COLUMN     "cardDescription" TEXT NOT NULL,
ADD COLUMN     "cardImgUrl" TEXT NOT NULL,
ADD COLUMN     "cardTitle" TEXT NOT NULL;
