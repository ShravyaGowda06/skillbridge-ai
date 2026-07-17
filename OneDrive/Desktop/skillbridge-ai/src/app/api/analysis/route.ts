import { NextResponse } from "next/server";
import { generateGeminiText, GeminiError, parseGeminiJson } from "@/lib/gemini";
import type { SkillAnalysis, StudentProfile } from "@/lib/types";

const systemInstruction = `You are SkillBridge AI, a careful career and learning analyst for underserved students pursuing sustainable and social-impact careers.
Return practical, low-cost, locally adaptable guidance.
Do not invent scholarships, jobs, organizations, deadlines, or personal facts.
If profile details are missing, say what information would improve the analysis.
Return valid JSON only.`;

const fallbackAnalysis: SkillAnalysis = {
  summary: "SkillBridge AI could not complete the live Gemini analysis. Review the saved profile and try again after checking the API key and network connection.",
  strengths: ["Profile information was received by the application."],
  skillGaps: [],
  recommendations: [
    {
      title: "Complete the student profile",
      priority: "High",
      timeframe: "Today",
      costFit: "Free",
      steps: ["Add career goals, current skills, budget, location, and constraints.", "Run the analysis again when Gemini is available."]
    }
  ],
  nextMilestones: ["Verify GEMINI_API_KEY is configured.", "Run analysis again."],
  mentorQuestions: ["What career goal should the mentor prioritize first?"]
};

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as { profile?: StudentProfile };
    const profile = body.profile || {};

    const prompt = `Analyze this student profile and produce a skill-gap analysis.

Student profile:
${JSON.stringify(profile, null, 2)}

Return this exact JSON shape:
{
  "summary": "2-3 sentence student-specific summary",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "skillGaps": [
    {
      "skill": "specific skill",
      "currentLevel": "beginner/intermediate/advanced/unknown",
      "targetLevel": "target level",
      "whyItMatters": "why this matters for the student's stated goals"
    }
  ],
  "recommendations": [
    {
      "title": "learning recommendation",
      "priority": "High",
      "timeframe": "realistic timeframe",
      "costFit": "free/low-cost/paid with caution",
      "steps": ["step 1", "step 2", "step 3"]
    }
  ],
  "nextMilestones": ["milestone 1", "milestone 2", "milestone 3"],
  "mentorQuestions": ["question 1", "question 2"]
}`;

    const text = await generateGeminiText({
      prompt,
      systemInstruction,
      responseMimeType: "application/json"
    });

    const analysis = parseGeminiJson<SkillAnalysis>(text);

    return NextResponse.json({
      ok: true,
      analysis
    });
  } catch (error) {
    const message = error instanceof GeminiError ? error.message : "AI analysis failed.";
    const status = error instanceof GeminiError ? error.status || 502 : 502;
    return NextResponse.json(
      {
        ok: false,
        error: message,
        fallback: fallbackAnalysis
      },
      { status }
    );
  }
}
