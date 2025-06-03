// js/chatbot.js

import { getTodayDate, getRandomGreeting } from './utils.js';
import { displayUserMessage, displayBotMessage } from './functions.js'; 
import { detectIntent } from './intentMatcher.js';
import { handleCourseQuery, generateCourseResponse, getPrimaryCourseName, loadCourseData, isDataReady } from './courseLogic.js';
import { getCourseIdFromURL } from './urlDetector.js';

let currentCourseId = 0;
let currentCourseName = "this course";
let pendingIntent = null;

// ✅ Step 1: Global flag to track if this is the first user interaction
let isFirstInteraction = true;

// Load course data before setting course ID
loadCourseData().then(() => {
  currentCourseId = getCourseIdFromURL();
  currentCourseName = getPrimaryCourseName(currentCourseId);
});

function handleUserInput(userInput) {
  const cleanedInput = userInput.trim().toLowerCase().replace(/\s+/g, ' ');

  // Show message only for typed input (not from options)
  if (!window.__suppressUserDisplay) {
    displayUserMessage(userInput);
  }
  window.__suppressUserDisplay = false; // reset

  const intent = detectIntent(cleanedInput);
  const newCourseId = handleCourseQuery(cleanedInput);

  if (newCourseId && newCourseId !== currentCourseId) {
    currentCourseId = newCourseId;
    currentCourseName = getPrimaryCourseName(currentCourseId);
  }

  // ✅ Step 2: NEW - Show full course info (fee + eligibility + last date) when
  // no intent, course detected, and no pending intent
  // ✅ Show full course info (fee + eligibility + last date) when no intent/pendingIntent but course is detected
if (!intent && newCourseId && !pendingIntent) {
  if (isDataReady()) {
    const feeResponse = generateCourseResponse('course_fee', newCourseId);
    const eligibilityResponse = generateCourseResponse('eligibility', newCourseId);
    const lastDateResponse = "Last date for the admission process is 30 July 2025*.";

    const combined = `${feeResponse}\n\n${eligibilityResponse}\n\n${lastDateResponse}`;
    displayBotMessage(combined);
  } else {
    displayBotMessage("Please wait a moment while course data loads...");
  }
  return;
}

  // ✅ Existing logic: If previous intent is pending and now course is detected (but no new intent)
  if (pendingIntent && !intent && newCourseId) {
    const response = generateCourseResponse(pendingIntent, currentCourseId);
    pendingIntent = null;
    displayBotMessage(response);
    return;
  }

  // ✅ Override pending intent if user asks something else
  if (intent) {
    pendingIntent = null;
  }

  let response = "Hmm, seems like I can't read that. Try a different course.";

  if (intent) {
    if (intent === 'course_fee' || intent === 'eligibility') {
      if (currentCourseId === 0) {
        response = generateCourseResponse(intent, 0); // general fallback
        pendingIntent = intent; // store for next message
      } else {
        response = generateCourseResponse(intent, currentCourseId);
      }
    } else {
      switch (intent) {
        case 'ignou_what':
          response = `IGNOU is the largest open university in the world offering online and distance courses.`;
          break;
        
        case 'ignou_courses':
          response = `IGNOU offers 300+ UG, PG, Diploma, & Certificate level courses in Science, Arts, and Humanities.`;
          break;

        case 'ignou_contact':
          response = `Students can contact IGNOU via call at 📱29572513 and by post at IGNOU Maidan Garhi, New Delhi, India Pin Code: 110068`;
          break;

        case 'admission_fees':
          response = `${currentCourseName} admission fee is the first installment of course fee plus the university development fee of Rs. 200/-.`;
          break;

        case 'exam_fees':
          response = "To appear in the exam pay a fee of Rs. 200/- per theory subject and Rs. 300/- per practical subject.";
          break;
        
        case 'exam_date':
          response = "Term end examination will start from 12th June 2025 and will end on 19th July 2025.";
          break;
        
        case 'date_sheet':
          response = "To download the date sheet students can visit the IGNOU offcial website.";
          break; 

        case 'process':
          response = "To apply, register on the IGNOU Samarth portal to create an account. After that, complete the student login to fill the form and pay the application fee.";
          break;

        case 'application_fee':
          response = "IGNOU 2025 July application fee for most courses is Rs. 300/-. However FLIP Courses need Rs. 500/-.";
          break;
        
        case 'flip_courses':
          response = "Flip courses are PGDMCH, PGDGM, DNA, PGCMDM, CESEIVI, CESEIHI, CESEIID. They are mosyly medical coruses with fixed number of seats.";
          break;

        case 'start_dates':
          response = "Admission process will start from 15 July 2025.";
          break;

        case 'last_dates':
          response = "Last date for the admission process is 30 July 2025*.";
          break;

        case 'study_material':
          response = "You can find study materials and PDFs on the eGyankosh portal and study centers.";
          break;
        
        case 'hall_ticket':
          response = "You can download the hall ticket from IGNOU website."
          break;
          
        case 'result':
          response = "Result will be declared 30 days after IGNOU term end exams."
          break;

        case 'contact_class':
          response = "Check for the schedule of contact classes on the website of your Regional Center."
          break;

        case 'assignment':
          response = "Assignments for July 2025 will be submitted at the study cetners till 30 September 2025*"
          break;
      }
    }
  }

  // ✅ Step 3: Turn off the first interaction flag to avoid repeat special logic
  isFirstInteraction = false;

  displayBotMessage(response);
}

export { handleUserInput };
