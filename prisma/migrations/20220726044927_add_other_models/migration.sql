-- CreateTable
CREATE TABLE "Bill" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "image" STRING NOT NULL,
    "name" STRING NOT NULL,
    "dayOfMonth" INT4 NOT NULL,
    "description" STRING,
    "category" INT4 NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "credentialsId" UUID NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credentials" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" INT4 NOT NULL,
    "email" STRING,
    "username" STRING,
    "password" STRING,

    CONSTRAINT "Credentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "vendor" STRING NOT NULL,
    "product" STRING NOT NULL,
    "description" STRING,
    "category" INT4 NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "credentialsId" UUID NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditLine" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "company" STRING NOT NULL,
    "balance" DECIMAL(65,30) NOT NULL,
    "limit" DECIMAL(65,30) NOT NULL,
    "credentialsId" UUID NOT NULL,

    CONSTRAINT "CreditLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debt" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "company" STRING NOT NULL,
    "description" STRING,
    "principal" DECIMAL(65,30) NOT NULL,
    "credentialsId" UUID NOT NULL,

    CONSTRAINT "Debt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budget" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "month" INT4 NOT NULL,
    "rentLimit" DECIMAL(65,30) NOT NULL,
    "utilitiesLimit" DECIMAL(65,30) NOT NULL,
    "insuranceLimit" DECIMAL(65,30) NOT NULL,
    "foodLimit" DECIMAL(65,30) NOT NULL,
    "streamingLimit" DECIMAL(65,30) NOT NULL,
    "miscLimit" DECIMAL(65,30) NOT NULL,
    "petLimit" DECIMAL(65,30) NOT NULL,
    "debtLimit" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "Credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "Credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditLine" ADD CONSTRAINT "CreditLine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CreditLine" ADD CONSTRAINT "CreditLine_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "Credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_credentialsId_fkey" FOREIGN KEY ("credentialsId") REFERENCES "Credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
