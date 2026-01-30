import { z } from 'zod/v4-mini';

const latinCharsRegex = /^[a-zA-Z0-9 ]*$/;

export const latinsCharsCheck = z.regex(latinCharsRegex);
