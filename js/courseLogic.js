// js/courseLogic.js

import courseNames from '../json/course_name.json' assert { type: 'json' };
import eligibilityData from '../json/eligibility.json' assert { type: 'json' };
import feeData from '../json/fee_data.json' assert { type: 'json' };

function handleCourseQuery(userInput) {
  const cleanedInput = userInput.toLowerCase();

  for (const course of courseNames) {
    for (let i = 1; i <= 5; i++) {
      const nameVariant = course[`name_${i}`]?.toLowerCase();
      if (nameVariant && cleanedInput.includes(nameVariant)) {
        return course.fee_id;
      }
    }

    const primaryName = course['primary name'].toLowerCase();
    if (cleanedInput.includes(primaryName)) {
      return course.fee_id;
    }
  }

  return null;
}

function generateCourseResponse(intent, fee_id) {
  if (intent === 'course_fees') {
    const feeObj = feeData.find(item => item.fee_id === fee_id);
    return feeObj ? `The fee for this course is ${feeObj.fee}.` : "Fee information is not available.";
  }

  if (intent === 'eligibility') {
    const eligibilityObj = eligibilityData.find(item => item.fee_id === fee_id);
    return eligibilityObj ? `Eligibility: ${eligibilityObj.eligibility}` : "Eligibility details are not available.";
  }

  return "No information available.";
}

export { handleCourseQuery, generateCourseResponse };
