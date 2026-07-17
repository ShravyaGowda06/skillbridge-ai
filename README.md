# SkillBridge AI

SkillBridge AI is an AI-powered career guidance and skill intelligence platform designed to help students identify suitable learning paths and career opportunities through personalized recommendations. By leveraging Google's Gemini AI, the platform provides customized roadmaps based on a user's interests, skills, and career aspirations, making quality career guidance more accessible.

## Problem Statement

Many students, particularly those from underserved communities, struggle to access personalized career guidance and structured learning resources. Traditional career counseling is often expensive, inaccessible, or generic, leaving students uncertain about which skills to develop and how to achieve their career goals.

SkillBridge AI addresses this challenge by providing AI-driven, personalized guidance that helps learners make informed decisions about their education and professional growth.

## Features

- AI-powered career mentor
- Personalized learning roadmaps
- Skill-based recommendations
- Career guidance tailored to user goals
- Responsive and intuitive user interface
- Fast and interactive experience powered by Next.js

## Technology Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Node.js
- Google Gemini API (Gemini 3.1 Flash Lite)
- Git
- GitHub
- Vercel

## Prerequisites

Before running the project, ensure you have the following installed:

- Node.js (v18 or later)
- npm
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/ShravyaGowda06/skillbridge-ai.git
```

Navigate to the project directory:

```bash
cd skillbridge-ai
```

Install the required dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.1-flash-lite
```

**Note:** Do not commit the `.env.local` file or expose your API keys publicly.

## Running the Application

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```
http://localhost:3000
```

## Project Structure

```
src/
public/
package.json
package-lock.json
next.config.ts
README.md
```

## Future Enhancements

- Skill assessment and aptitude analysis
- Resume analysis using AI
- Job and internship recommendation engine
- Learning progress tracking
- Integration with online learning platforms
- Multilingual support

## Repository

GitHub Repository:
https://github.com/ShravyaGowda06/skillbridge-ai

## License

This project was developed as part of a hackathon submission for educational and demonstration purposes.
