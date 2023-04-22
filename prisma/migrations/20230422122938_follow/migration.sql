/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userId,followerId]` on the table `Follower`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "userId_followerId" ON "Follower"("userId", "followerId");
