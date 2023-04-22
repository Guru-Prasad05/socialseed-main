/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId]` on the table `Follower`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[followerId]` on the table `Follower`. If there are existing duplicate values, the migration will fail.

*/
-- DropIndex
DROP INDEX "userId_followerId";

-- CreateIndex
CREATE UNIQUE INDEX "Follower.userId_unique" ON "Follower"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Follower.followerId_unique" ON "Follower"("followerId");
