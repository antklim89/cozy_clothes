'use server';

import { addFeedback, removeFeedback } from '../services/dal';

export const addFeedbackAction = addFeedback;
export const removeFeedbackAction = removeFeedback;
