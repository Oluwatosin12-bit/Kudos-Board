-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_boardId_fkey";

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
