/*
  Warnings:

  - You are about to drop the column `Address` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `CEP` on the `orgs` table. All the data in the column will be lost.
  - Added the required column `address` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "Address",
DROP COLUMN "CEP",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL;
