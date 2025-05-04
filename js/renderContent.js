import { pageData } from './sampleData.js';

const contentDiv = document.getElementById('content');

pageData.forEach(section => {
  const sectionDiv = document.createElement('section');

  const heading = document.createElement('h2');
  heading.textContent = section.heading;

  const para = document.createElement('p');
  para.textContent = section.content;

  sectionDiv.appendChild(heading);
  sectionDiv.appendChild(para);
  contentDiv.appendChild(sectionDiv);
});
