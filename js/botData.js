// js/botData.js
import { getRandomGreeting, getTodayDate } from './utils.js';

export const botData = [
  {
    keywords: ["fees", "fee", "cost"],
    answer: () => `${getRandomGreeting()} You can check the course fees in the Admission section or Prospectus.`
  },
  {
    keywords: ["assignment dates", "assignment submission", "submit assignment"],
    answer: () => `${getRandomGreeting()} Last date to submit the assignment is 28 April for June 2025.`
  },
  {
    keywords: ["exams", "exam dates", "exam schedule"],
    answer: () => `${getRandomGreeting()} Exams will start from 2 June 2025.`
  },
  {
    keywords: ["admission july session", "admission", "apply july"],
    answer: () => `${getRandomGreeting()} Admissions for July session open on 10 July 2025.`
  },
  {
    keywords: ["today", "date", "today's date"],
    answer: () => `${getRandomGreeting()} Today's date is ${getTodayDate()}.`
  }
];
