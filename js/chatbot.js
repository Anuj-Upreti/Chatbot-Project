// js/chatbot.js

import { botData } from './botData.js';
import { getTodayDate, getRandomGreeting } from './utils.js';
import { displayUserMessage, displayBotMessage } from './functions.js'; 
import { detectIntent } from './intentMatcher.js';
import { handleCourseQuery, generateCourseResponse, getPrimaryCourseName } from './courseLogic.js';

let currentCourseId = '001';  // Default to MA Political Science
let currentCourseName = 'MA Political Science'; // Used in static replies

function handleUserInput(userInput) {
  const cleanedInput = userInput.trim().toLowerCase();
  displayUserMessage(userInput);

  // Check if user mentioned a different course
  const newCourseId = handleCourseQuery(cleanedInput);
  if (newCourseId && newCourseId !== currentCourseId) {
    currentCourseId = newCourseId;
    currentCourseName = getPrimaryCourseName(currentCourseId);
  }

  const intent = detectIntent(cleanedInput);
  let response = "Sorry, I didn’t understand that. Please select an option or check available courses.";

  if (intent) {
    if (intent === 'course_fees' || intent === 'eligibility') {
      response = generateCourseResponse(intent, currentCourseId);
    } else {
      switch (intent) {
        case 'admission_fees':
          response = `${currentCourseName} admission fee is Rs. 3,850/- plus the university development fee of Rs. 200/-.`;
          break;

        case 'exam_fees':
          response = "To appear in the exam pay a fee of Rs. 200/- per theory subject and Rs. 300/- per practical subject.";
          break;        

        case 'process':
          response = "To apply, register on the IGNOU Samarth portal to create an account. After that, complete the student login to fill the form and pay the application fee.";
          break;

        case 'start_dates':
          response = "Admission process will start from 15 July 2025.";
          break;

        case 'last_dates':
          response = "Last date for the admission process is 30 July 2025.";
          break;

        case 'study_material':
          response = "You can find study materials and PDFs on the eGyankosh portal.";
          break;
      }
    }
  }

  displayBotMessage(response);
}

export { handleUserInput };
