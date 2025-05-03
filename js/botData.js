// js/botData.js

export const botData = [
  { keywords: ["fees", "fee", "cost"], 
    answer: "You can check the course fees in the Admission section or Prospectus." 
  },
  { keywords: ["assignment dates", "assignment submission", "submit assignment"], 
    answer: "Last date to submit the assignment is 28 April for June 2025." 
  },
  { keywords: ["exams", "exam dates", "exam schedule"], 
    answer: "Exams will start from 2 June 2025." 
  },
  { keywords: ["admission july session", "admission", "apply july"], 
    answer: "Admissions for July session open on 10 July 2025." 
  },
  { keywords: ["today", "date", "today's date"], 
    answer: () => `Today's date is ${getTodayDate()}.` 
  }
];
