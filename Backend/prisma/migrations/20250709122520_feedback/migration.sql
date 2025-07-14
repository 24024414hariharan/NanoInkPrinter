-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "rating" TEXT NOT NULL,
    "comments" TEXT,
    "inkProperties" JSONB,
    "nozzle" JSONB,
    "desiredDroplet" JSONB,
    "waveform" JSONB,
    "droplet" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
