// js/chatbot.js

import { displayUserMessage, displayBotMessage } from './functions.js'; 
import { detectIntent } from './intentMatcher.js';
import { handleCourseQuery, generateCourseResponse } from './courseLogic.js';

let currentCourseId = 1; // Default to MA Political Science

function handleUserInput(userInput) {
  const cleanedInput = userInput.trim().toLowerCase();
  let response = "Sorry, I didn’t understand that. Please select an option or check available courses.";

  // Check for course name and update fee_id if found
  const newCourseId = handleCourseQuery(cleanedInput);
  if (newCourseId) {
    currentCourseId = newCourseId;
  }

  const intent = detectIntent(cleanedInput);

  if (intent) {
    if (['course_fees', 'eligibility'].includes(intent)) {
      response = generateCourseResponse(intent, currentCourseId);
    } else {
      switch (intent) {
        case 'admission_fees':
          response = "MA Political Science admission fee is Rs. 3,850/- plus the university development fee of Rs. 200/-.";
          break;

        case 'exam_fees':
          response = "To appear in the exam pay a fee of Rs. 200/- per theory subject and Rs. 300/- per practical subject.";
          break;

        case 'process':
          response = "To apply, register on the IGNOU Samarth portal to create an account. Then complete the student login to fill the form and pay the application fee.";
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

  displayUserMessage(userInput);
  displayBotMessage(response);
}

export { handleUserInput };
