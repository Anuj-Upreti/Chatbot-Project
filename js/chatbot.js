// js/chatbot.js

import { botData } from './botData.js';
import { getTodayDate, getRandomGreeting } from './utils.js';
import { displayUserMessage, displayBotMessage } from './functions.js'; 
import { detectIntent } from './intentMatcher.js';

function handleUserInput(userInput) {
  const cleanedInput = userInput.trim().toLowerCase();
  let response = "Sorry, I didn’t understand that. Please select an option or check available courses.";

  const intent = detectIntent(cleanedInput);
  if (intent) {
    switch (intent) {
      case 'course_fees':
        response = "MA Political Science coruse fee is Rs. 7,700/-. You can pay the fee per semester with an amount of Rs. 3,850/-";
        break;

      case 'admission_fees':
        response = "MA Political Science admission fee is Rs. 3,850/- plus the university development fee of Rs. 200/-.";
        break;    

      case 'exam_fees':
        response = "To appear in the exam pay a fee of Rs. 200/- per theory subject and Rs. 300/- per practical subject.";
        break;        

      case 'process':
        response = "To apply, register on the IGNOU samarth portal to create an account. After that complete the student login to fill the form and pay the application fee.";
        break;
      
      case 'start_dates':
        response = "Admission process will start from 15 July 2025.";
        break;

      case 'last_dates':
        response = "Last date for the admission process is 30 July 2025.";
        break;
    
      case 'eligibility':
        response = "Students who have completed their bachelor's degree can apply for MA Political Science.";
        break;      

      case 'study_material':
        response = "You can find study materials and PDFs on the eGyankosh portal.";
        break;
    }
  }

  displayUserMessage(userInput);
  displayBotMessage(response);
}

export { handleUserInput };
