import {
  BarChart3,
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  HandHeart,
  Leaf,
  MessageSquareText,
  Route,
  Sparkles,
  UsersRound
} from "lucide-react";

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Student Profile" },
  { href: "/analysis", label: "AI Analysis" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/mentor", label: "AI Mentor" }
];

export const impactPillars = [
  {
    icon: GraduationCap,
    title: "Inclusive skilling",
    copy: "Connect students to practical learning paths shaped by their context, not just their test scores."
  },
  {
    icon: Leaf,
    title: "Sustainable careers",
    copy: "Prioritize green jobs, local resilience roles, and responsible technology career pathways."
  },
  {
    icon: HandHeart,
    title: "Support that travels",
    copy: "Turn mentorship, scholarship, and opportunity discovery into one continuous student journey."
  }
];

export const dashboardStats = [
  { label: "Profile readiness", value: "68%", tone: "green" },
  { label: "Skills mapped", value: "12", tone: "blue" },
  { label: "Opportunities saved", value: "4", tone: "gold" },
  { label: "AI status", value: "Live", tone: "neutral" }
];

export const roadmapItems = [
  {
    title: "Foundation skills",
    status: "In progress",
    copy: "Communication, digital literacy, and project documentation."
  },
  {
    title: "Career track",
    status: "AI-ready",
    copy: "Run Gemini analysis to refine recommendations around the student's career goals."
  },
  {
    title: "Mentor review",
    status: "Ready",
    copy: "Share your profile with a verified mentor or program coordinator."
  }
];

export const opportunityCards = [
  {
    icon: BriefcaseBusiness,
    title: "Green internship board",
    copy: "Use AI guidance to prepare for internships, fellowships, and apprenticeships."
  },
  {
    icon: UsersRound,
    title: "Local mentor network",
    copy: "Mentor conversations adapt to student preferences, constraints, and readiness."
  },
  {
    icon: Route,
    title: "Learning pathway",
    copy: "Learning roadmaps are generated from the saved student profile."
  }
];

export const analysisSteps = [
  {
    icon: BrainCircuit,
    title: "Profile understanding",
    copy: "Gemini summarizes strengths, constraints, interests, and goals."
  },
  {
    icon: BarChart3,
    title: "Gap mapping",
    copy: "Skill gaps are compared against selected career pathways."
  },
  {
    icon: Sparkles,
    title: "Action plan",
    copy: "Recommendations focus on low-cost, realistic next steps."
  }
];

export const mentorPrompts = [
  "How do I choose between data analytics and sustainability roles?",
  "What should I learn first if I only have a phone?",
  "Can you help me prepare for a community impact internship?"
];

export const mentorMessages = [
  {
    role: "mentor",
    text: "Hi, I am your SkillBridge AI mentor. Save your profile first, then ask me about skills, careers, learning plans, or interview preparation."
  },
  {
    role: "student",
    text: "I want career advice that considers my time, budget, and local opportunities."
  },
  {
    role: "mentor",
    text: "Great. I will use your saved goals, skills, interests, budget, and constraints to suggest practical next steps."
  }
] as const;

export const aiBoundaries = [
  "Gemini responses are generated through server-side API routes.",
  "Student context is sent only from the browser to the backend route you call.",
  "The app uses fallback messages when the AI service is unavailable."
];

export const heroSignals = [
  "Student-first career guidance",
  "Sustainability and social impact",
  "Gemini-powered recommendations"
];

export const pageIcons = {
  analysis: BrainCircuit,
  mentor: MessageSquareText
};
