export type StudentProfile = {
  fullName?: string;
  location?: string;
  educationLevel?: string;
  language?: string;
  careerGoals?: string;
  budget?: string;
  interests?: string;
  constraints?: string;
  skills?: string;
};

export type SkillGap = {
  skill: string;
  currentLevel: string;
  targetLevel: string;
  whyItMatters: string;
};

export type LearningRecommendation = {
  title: string;
  priority: "High" | "Medium" | "Low";
  timeframe: string;
  costFit: string;
  steps: string[];
};

export type SkillAnalysis = {
  summary: string;
  strengths: string[];
  skillGaps: SkillGap[];
  recommendations: LearningRecommendation[];
  nextMilestones: string[];
  mentorQuestions: string[];
};

export type ChatMessage = {
  role: "mentor" | "student";
  text: string;
};
