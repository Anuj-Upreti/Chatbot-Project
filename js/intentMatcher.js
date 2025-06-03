// ✅ INTENT MATCHING START
// File: js/intentMatcher.js

export const intents = [
    {
      tags: ['course_fees'],
      keywords: ['fees', 'fee', 'cost', 'charges', 'course', 'annum', 'year', 'structure'],
      responseTag: 'course_fees'
    },
    {
        tags: ['admission_fees'],
        keywords: ['fees', 'fee', 'cost', 'charges', 'admission'],
        responseTag: 'admission_fees'
    },
    {
        tags: ['exam_fees'],
        keywords: ['fees', 'fee', 'cost', 'charges', 'exam', 'term', 'end', 'examination', 'TEE', 'tee'],
        responseTag: 'exam_fees'
    },
    {
      tags: ['process'],
      keywords: ['process', 'where', 'apply', 'procedure', 'how', 'to', 'steps', 'admission', 'register'],
      responseTag: 'process'
    },
    {
        tags: ['start_dates'],
        keywords: ['date', 'when', 'will', 'start', 'open', 'admission', 'registration'],
        responseTag: 'start_dates'
    },
    {
        tags: ['last_dates'],
        keywords: ['when', 'is', 'final', 'end', 'ends', 'to', 'date', 'last', 'deadline', 'admission'],
        responseTag: 'last_dates'
    },
    {
        tags: ['eligibility'],
        keywords: ['who', 'can', 'apply', 'eligible', 'admission', 'eligibility'],
        responseTag: 'eligibility'
    },
    {
      tags: ['study_material'],
      keywords: ['study material', 'learning material', 'notes', 'pdf', 'learning pdf', 'books'],
      responseTag: 'study_material'
    },

    {
      tags: ['hall_ticket'],
      keywords: ['admit card', 'admit cards', 'hall ticket', 'hall tickets', 'exam ticket'],
      responseTag: 'hall_ticket'
    },

    {
      tags: ['result'],
      keywords: ['exam result', '2025 result', 'ignou result', 'term end result', 'TEE result'],
      responseTag: 'result'
    }
  ];
  
  export function detectIntent(userInput) {
    const input = userInput.toLowerCase();
    const scores = intents.map(intent => {
      let score = 0;
      for (const word of intent.keywords) {
        if (input.includes(word)) score++;
      }
      return { tag: intent.responseTag, score };
    });
  
    scores.sort((a, b) => b.score - a.score);
    return scores[0].score > 0 ? scores[0].tag : null;
  }
  