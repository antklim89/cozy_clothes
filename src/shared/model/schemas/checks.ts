import { z } from 'zod/v4-mini';

const latinCharsRegex = /^[a-zA-Z0-9 ]*$/;
const phoneRegex = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const latinsCharsCheck = z.regex(latinCharsRegex);
export const phoneCheck = z.regex(phoneRegex, 'Invalid phone number');
