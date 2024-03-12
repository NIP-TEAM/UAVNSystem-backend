/*
  Warnings:

  - Added the required column `email` to the `UserInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserInfo_name_key";

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "lastLogin" SET DATA TYPE TEXT;

-- CreateIndex
CREATE INDEX "UserInfo_email_idx" ON "UserInfo"("email");
