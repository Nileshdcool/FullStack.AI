//Config constant

import { FontToRead } from "./enums";

export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
export const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:1337';

export const FORM_LIMIT = '56kb';
export const JSON_LIMIT = '1mb';
export const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200 MB limit


export const freeQuestiontoRead = 5;

export const questionAnswerPrimaryFont=FontToRead.Georgia;
export const questionAnswerSecondaryFont=FontToRead.Serif;
export const questionAnswerLowPrioriryFont=FontToRead.Georgia;