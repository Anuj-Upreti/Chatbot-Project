// js/chatbot.js

import { botData } from './botData.js';
import { getTodayDate, getRandomGreeting } from './utils.js';
import { displayUserMessage, displayBotMessage } from './functions.js'; 

function handleUserInput(userInput) {
  const cleanedInput = userInput.trim().toLowerCase();
  let response = "Sorry, I didn't understand that. Please select an option.";

  for (let i = 0; i < botData.length; i++) {
    for (let keyword of botData[i].keywords) {
      if (cleanedInput.includes(keyword)) {
        response = botData[i].answer;
        break;
      }
    }
    if (response !== "Sorry, I didn't understand that. Please select an option.") break;
  }

  displayUserMessage(userInput);
  if (typeof response === 'function') {
    response = response();
  }  
  displayBotMessage(response);
}

export { handleUserInput };
