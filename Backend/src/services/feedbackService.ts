import { requiresUpdate, refineWaveform } from "../utils/refineUtils";
import { predictDroplet } from "../utils/dropletPredictor";
import { checkStability } from "../utils/stabilityChecker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const processFeedback = async (body: any, userId?: number) => {
  const {
    rating,
    comments,
    waveform,
    droplet,
    inkProperties,
    nozzle,
    desiredDroplet,
  } = body;

  if (!rating || typeof rating !== "string") {
    throw new Error("Feedback rating is required and must be a string.");
  }

  const saved = await prisma.feedback.create({
    data: {
      userId,
      rating,
      comments,
      waveform,
      droplet,
      inkProperties,
      nozzle,
      desiredDroplet,
    },
  });

  // if (!waveform || !droplet || !inkProperties || !requiresUpdate(rating)) {
  //   return {
  //     message: "Feedback recorded successfully.",
  //     data: {
  //       feedbackId: saved.id,
  //       userId,
  //       storedAt: saved.createdAt,
  //     },
  //   };
  // }

  const refinedWaveform = refineWaveform(waveform, rating);
  const updatedDroplet = predictDroplet(refinedWaveform, inkProperties);
  const isStable = checkStability(updatedDroplet, desiredDroplet, true);

  return {
    message: "Feedback recorded and updated recommendation generated.",
    data: {
      feedbackId: saved.id,
      userId,
      storedAt: saved.createdAt,
    },
    updatedRecommendation: {
      waveform: refinedWaveform,
      droplet: updatedDroplet,
      isStable,
    },
  };
};
