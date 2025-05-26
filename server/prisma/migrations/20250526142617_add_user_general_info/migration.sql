-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDay" TIMESTAMP(3),
ADD COLUMN     "code" TEXT,
ADD COLUMN     "dateOfIssue" TIMESTAMP(3),
ADD COLUMN     "identifyCard" TEXT,
ADD COLUMN     "placeOfIssue" TEXT,
ADD COLUMN     "placeOfOrigin" TEXT,
ADD COLUMN     "religion" TEXT;
