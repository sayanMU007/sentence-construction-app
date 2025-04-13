Sentence Construction Tool
This interactive React application helps users practice language skills by completing sentences with the correct words. The tool presents incomplete sentences with blank spaces, and users must select from a set of word options to fill in those blanks correctly.
Features

Interactive sentence completion exercises
30-second timer for each question
Ability to select and unselect words
Auto-navigation to the next question when the timer ends
Final feedback screen showing results and correct answers
Responsive design that works on various screen sizes

Demo
Live Demo - Replace with your deployment URL once published
Technologies Used

React with TypeScript
Vite as build tool
Zustand for state management
Tailwind CSS for styling
JSON Server for local API development

Getting Started
Prerequisites

Node.js (v14 or higher)
npm (v6 or higher)

Installation

Clone the repository
bashgit clone https://github.com/your-username/sentence-construction-tool.git
cd sentence-construction-tool

Install dependencies
bashnpm install

Start the JSON Server (in one terminal)
bashnpm run server

Start the development server (in another terminal)
bashnpm run dev

Open your browser and navigate to the URL shown in your terminal (typically http://localhost:5173)

Project Structure
sentence-construction-app/
├── public/
├── src/
│   ├── components/
│   │   ├── QuestionScreen.tsx
│   │   ├── Timer.tsx
│   │   ├── WordOptions.tsx
│   │   ├── SentenceDisplay.tsx
│   │   ├── NavigationButtons.tsx
│   │   └── FeedbackScreen.tsx
│   ├── hooks/
│   │   ├── useTimer.ts
│   │   └── useQuestions.ts
│   ├── store/
│   │   └── questionStore.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── api.ts
│   │   └── helpers.ts
│   ├── App.tsx
│   └── main.tsx
├── db.json
├── package.json
├── tailwind.config.js
└── README.md
How to Play

Each screen presents an incomplete sentence with one or more blank spaces
Select words from the options below to fill in the blanks
You can unselect a word by clicking on the filled blank
Once all blanks are filled, the "Next" button will be enabled
You have 30 seconds to complete each sentence
At the end, you'll see your score and correct answers for any mistakes

Deployment
Vercel (Recommended)

Push your code to GitHub
Create an account on Vercel (if you don't have one)
Import your GitHub repository
Configure build settings:

Framework Preset: Vite
Build Command: npm run build
Output Directory: dist


Deploy

Netlify Alternative

Create an account on Netlify
Import your GitHub repository
Configure build settings:

Build Command: npm run build
Publish Directory: dist


Deploy

Customization
Adding More Questions
Edit the db.json file to add more questions following the existing format:
json{
  "id": 11,
  "sentence": "Your sentence with _____ spaces.",
  "blanks": [
    { "id": 1, "wordId": null }
  ],
  "options": [
    { "id": 1, "text": "option1" },
    { "id": 2, "text": "option2" },
    { "id": 3, "text": "option3" },
    { "id": 4, "text": "option4" }
  ],
  "correctAnswers": [1]
}
Modifying Timer Duration
To change the timer duration, update the TIMER_DURATION constant in the QuestionScreen.tsx file.
License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

CA MONK for the assignment specification
React
Vite
Tailwind CSS
Zustand

Contact
Your Name - your-email@example.com
Project Link: https://github.com/your-username/sentence-construction-toolRetryClaude does not have the ability to run the code it generates yet. Claude does not have internet access. Links provided may not be accurate or up to date.Claude can make mistakes. Please double-check responses. 3.7 SonnetChat controls 3.7 SonnetOur most intelligent model yet Learn moreArtifacts
