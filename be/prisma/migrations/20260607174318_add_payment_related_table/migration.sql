/*
  Warnings:

  - You are about to drop the column `paymentGateway` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentAuditEvent" AS ENUM ('ORDER_CREATED', 'PAYMENT_ATTEMPTED', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'WEBHOOK_RECEIVED', 'REFUND_INITIATED', 'REFUND_COMPLETED');

-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'CREATED';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "paymentGateway",
DROP COLUMN "paymentMethod",
DROP COLUMN "transactionId";

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "razorpayOrderId" TEXT NOT NULL,
    "razorpayPaymentId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "status" "PaymentStatus" NOT NULL,
    "paymentMethod" "PaymentMethod",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_audits" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "eventType" "PaymentAuditEvent" NOT NULL,
    "oldStatus" "PaymentStatus",
    "newStatus" "PaymentStatus",
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "requestPayload" JSONB,
    "responsePayload" JSONB,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_audits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpayOrderId_key" ON "payments"("razorpayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_razorpayPaymentId_key" ON "payments"("razorpayPaymentId");

-- CreateIndex
CREATE INDEX "payments_userId_idx" ON "payments"("userId");

-- CreateIndex
CREATE INDEX "payments_orderId_idx" ON "payments"("orderId");

-- CreateIndex
CREATE INDEX "payments_status_idx" ON "payments"("status");

-- CreateIndex
CREATE INDEX "payment_audits_paymentId_idx" ON "payment_audits"("paymentId");

-- CreateIndex
CREATE INDEX "payment_audits_eventType_idx" ON "payment_audits"("eventType");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_audits" ADD CONSTRAINT "payment_audits_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
